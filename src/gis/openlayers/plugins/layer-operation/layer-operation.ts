import Layer from 'ol/layer/Layer'
import VectorSource from 'ol/source/Vector'
import { OgcServerString } from '../../../../global/types.global'
import { baseUtils } from '../../../../js-utils'
import { createLayerGroup, createTileLayer, createVectorLayer } from '../../utilities/layer.utilities'
import { WebMap } from '../../web-map/web-map'
import { WebMapPlugin } from '../../web-map/web-map-plugin'
import GeoJSON from 'ol/format/GeoJSON'
import {bbox as bboxStrategy} from 'ol/loadingstrategy'
import LayerGroup from 'ol/layer/Group'
import { extend, Extent } from 'ol/extent'
import VectorLayer from 'ol/layer/Vector'
import TileWMS from 'ol/source/TileWMS'
import { IObject, IWMSCapabilitiesResult } from '../../../../global/interfaces.global'
import TileLayer from 'ol/layer/Tile'
import axiosHelper from '../../../../axios-helper/axios-helper'
import WMSCapabilities from 'ol/format/WMSCapabilities'
import { transformExtent } from 'ol/proj'

export interface ILayerItemOptions {
  name?: string
  type?: OgcServerString
  url?: string
  params?: IObject
}

export interface ILayerOperationOptions {
  layerItems?: ILayerItemOptions[]
}

export interface ILayerItem {
  id: string
  name: string
  target: Layer
  visible: boolean
  opacity: number
  level: number
  type: OgcServerString
}

/** 插件：图层控制类 */
export class LayerOperation extends WebMapPlugin<{
  'change:visible': {
    layerName: string
    layer: Layer
    visible: boolean
  },
  'change:opacity': {
    layerName: string
    layer: Layer
    opacity: number
  },
  'change:level': {
    layerName: string
    layer: Layer
    level: number
  }
}> {

  //#region 私有属性

  /** 配置项 */
  private _options: ILayerOperationOptions = {}

  /** 图层池 */
  private _layerPool: Map<string, [Layer, ILayerItemOptions]> = new Map()

  /** 图层组 */
  private _layerGroup: LayerGroup

  //#endregion

  //#region 构造函数

  //#region getter

  get layerPool () : Map<string, ILayerItem> {
    const pool : Map<string, ILayerItem> = new Map()
    this._layerPool.forEach(([layer, options]) => {
      pool.set(options.name, {
        id: baseUtils.createGuid(),
        name: options.name,
        target: layer,
        visible: layer.getVisible(),
        opacity: layer.getOpacity(),
        level: this._getLayerLevel(layer),
        type: options.type,
      })
    })
    return pool
  }

  //#endregion

  /** 构造图层控制对象 */
  constructor (options: ILayerOperationOptions) {
    super('layerOperation')
    baseUtils.$extend(true, this._options, options)
  }

  //#endregion

  //#region 私有方法

  /** 初始化 */
  private _init () {
    this._layerGroup = createLayerGroup()
    this.map.addLayer(this._layerGroup)
    this._options.layerItems?.forEach(layerItem => {
      this._initLayer(layerItem)
    })
  }

  /**
   * 创建图层
   * @param layerItemOptions 配置项
   */
  private _initLayer (layerItemOptions: ILayerItemOptions) {
    const type = layerItemOptions.type
    switch (type) {
      case 'wfs':
        this._initWfsLayer(layerItemOptions)
        break
      case 'wms':
        this._initWmsLayer(layerItemOptions)
        break
      default:
        break
    }
  }

  /** 初始化WFS图层 */
  private _initWfsLayer (layerItemOptions: ILayerItemOptions) {
    const layer = createVectorLayer()
    const source = new VectorSource({
      format: new GeoJSON(),
      url: extent => {
        return `${layerItemOptions.url}&bbox=${extent.join(',')},EPSG:3857`
      },
      strategy: bboxStrategy
    })
    layer.setSource(source)
    this._layerGroup.getLayers().push(layer)
    this._layerPool.set(layerItemOptions.name, [layer, layerItemOptions])
  }

  /** 初始化WMS图层 */
  private _initWmsLayer (layerItemOptions: ILayerItemOptions) {
    const source = new TileWMS({
      url: layerItemOptions.url,
      params: { ...layerItemOptions.params }
    })
    const layer = createTileLayer({ source })
    this._layerGroup.getLayers().push(layer)
    this._layerPool.set(layerItemOptions.name, [layer, layerItemOptions])
    const [url] = (layer.getSource() as TileWMS).getUrls()
    axiosHelper() // getExtent is undefined, need to set
      .setUrl(url)
      .setParams({ 'REQUEST': 'GetCapabilities' })
      .setParams({ 'outputFormat': 'application/json' })
      .mountGet()
      .then((res: string) => {
        const wmsCapabilities = new WMSCapabilities().read(res) as IWMSCapabilitiesResult
        let extent = wmsCapabilities.Capability.Layer.Layer.find(item => item.Name === layerItemOptions.params['LAYERS'].split(':')[1])?.EX_GeographicBoundingBox // TODO maybe wrong
        extent = transformExtent(extent, 'EPSG:4326', this.view.getProjection())
        layer.setExtent(extent)
      })
  }

  /** 获取指定图层范围 */
  private _getLayerExtent (layer: Layer) : Extent | null {
    if (layer instanceof VectorLayer) {
      return layer.getSource().getExtent()
    }
    if (layer instanceof TileLayer) {
      return layer.getExtent()
    }
  }

  /**
   * 获取图层层级
   * @param layer 图层对象
   */
  private _getLayerLevel (layer: Layer) : number {
    const layerArr = this._layerGroup.getLayersArray()
    for (let i = 0; i < layerArr.length; i++) {
      if (layerArr[i] === layer) {
        return i
      }
    }
    return -1
  }

  //#endregion

  //#region 公有方法

  /** 安装插件 */
  installPlugin (webMap: WebMap) : this {
    super.installPlugin(webMap)
    this._init()
    return this
  }

  /** 获取所有图层的综合范围 */
  getFullExtent () : Extent | null {
    const layers = [...this._layerPool.values()]
    let extent : Extent | null = null
    layers.forEach(([lyr]) => {
      const newExtent = this._getLayerExtent(lyr)
      if (extent) {
        extent = extend(extent, newExtent)
      } else {
        extent = newExtent
      }
    })
    return extent
  }

  /** 通过图层名获取图层对象 */
  getLayerByName (name: string) : Layer {
    const [layer] = this._layerPool.get(name)
    return layer
  }

  /**
   * 设置图层可见性
   * @param name 图层名
   * @param visible 图层可见性，默认true
   */
  setLayerVisible (name: string, visible = true) : this {
    const layer = this.getLayerByName(name)
    layer.setVisible(visible)
    this.fire('change:visible', {
      layerName: name, visible, layer
    })
    return this
  }

  /**
   * 设置图层透明度
   * @param name 图层名
   * @param opacity 不可透明度
   */
  setLayerOpacity (name: string, opacity: number) : this {
    const layer = this.getLayerByName(name)
    layer.setOpacity(opacity)
    this.fire('change:opacity', {
      layerName: name, opacity, layer
    })
    return this
  }

  setLayerLevel (name: string, level: number) : this {
    const layer = this.getLayerByName(name)
    this._layerGroup.getLayers().remove(layer)
    this._layerGroup.getLayers().insertAt(level, layer)
    this.fire('change:level', {
      layerName: name, layer, level
    })
    return this
  }

  //#endregion

}
