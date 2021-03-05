import { Collection } from 'ol'
import BaseLayer from 'ol/layer/Base'
import LayerGroup from 'ol/layer/Group'
import { baseUtils } from '../../../../js-utils/index'
import { createCollection } from '../../utilities/base.utilities'
import { createLayerGroup, createOSMLayer, createXYZLayer } from '../../utilities/layer.utilities'
import { WebMap } from '../../web-map/web-map'
import { WebMapPlugin } from '../../web-map/web-map-plugin'

export interface IBasemapOptions {
  key: string
  visible: boolean
}

/** 底图类 */
export class Basemap extends WebMapPlugin<{
  'change:key': { key: string }
  'change:visible': { visible: boolean }
}> {

  //#region 私有对象

  /** 天地图秘钥 */
  private _tianDiTuKey = 'd524142425d379adcf285daba823e28a'

  /** 天地图地址集合 */ // TODO 仅球面墨卡托投影3857，未兼容4326投影
  private _tianDiTuUrls = {
    '影像底图': `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this._tianDiTuKey}`,
    '影像注记': `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this._tianDiTuKey}`,
    '矢量底图': `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this._tianDiTuKey}`,
    '矢量注记': `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this._tianDiTuKey}`,
    '地形底图': `http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this._tianDiTuKey}`,
    '地形注记': `http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this._tianDiTuKey}`,
  }

  /** GEOQ地图地址集合 */
  private _geoqUrls = {
    '彩色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
    '灰色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
    '蓝黑色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
    '暖色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
  }

  /** 配置项 */
  private _options: IBasemapOptions = {
    key: '彩色地图',
    visible: true
  }

  /** 底图项池 */
  private _basemapItemPool : Map<string, Collection<BaseLayer>> = new Map()

  /** 当前选中的底图项Key值 */
  private _selectedKey : string

  /** 底图图层容器组 */
  private _layerGroup: LayerGroup

  /** 底图可见性 */
  private _visible: boolean

  //#endregion

  //#region getter

  get selectedKey () : string {
    return this._selectedKey
  }

  get visible () : boolean {
    return this._visible
  }

  get basemapItemList () : string[] {
    return Object.keys(this._basemapItemPool)
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造底图插件对象
   * @param options 配置项
   */
  constructor (options: IBasemapOptions = {
    key: '彩色地图',
    visible: true
  }) {
    super('basemap')
    baseUtils.$extend(true, this._options, options)
    this._selectedKey = this._options.key
    this._visible = this._options.visible
  }

  //#endregion

  //#region 私有方法

  /** 初始化 */
  private _init () : Basemap {
    this._layerGroup = createLayerGroup({ visible: this._visible })
    this.map.getLayers().insertAt(0, this._layerGroup)
    return this
      ._createTianDiTu()
      ._createGeoQDiTu()
      .createCustomBasemap('osm', createOSMLayer())
      .selectBasemap(this._selectedKey)
  }

  /** 创建天地图底图项 */
  private _createTianDiTu () : Basemap {
    const createTianDiTuItem = (name: string) => {
      this.createCustomBasemap(`天地图${name}`, createXYZLayer(this._tianDiTuUrls[`${name}底图`]))
      this.createCustomBasemap(`天地图${name}含注记`, [
        createXYZLayer(this._tianDiTuUrls[`${name}底图`]),
        createXYZLayer(this._tianDiTuUrls[`${name}注记`]),
      ])
      return createTianDiTuItem
    }
    createTianDiTuItem('影像')('矢量')('地形')
    return this
  }

  /** 创建GeoQ底图项 */
  private _createGeoQDiTu () : Basemap {
    Object.entries(this._geoqUrls).forEach(
      ([key, url]) => this._basemapItemPool.set(key.toLowerCase(), createCollection([createXYZLayer(url)]))
    )
    return this
  }

  //#endregion

  //#region 公有方法

  /**
   * 安装插件
   * @param webMap WebMap对象
   */
  installPlugin (webMap: WebMap) : Basemap {
    super.installPlugin(webMap)
    this._init()
    return this
  }

  /**
   * 选择底图项
   * @param key 底图项Key
   */
  selectBasemap (key: string) : Basemap {
    if (this._basemapItemPool.has(key)) {
      this._layerGroup.setLayers(this._basemapItemPool.get(key))
      this._selectedKey = key
      this.fire('change:key', { key })
    }
    return this
  }

  /**
   * 创建自定义底图项
   * @param key 底图项Key
   * @param layers 图层
   */
  createCustomBasemap (key: string, layers: BaseLayer | BaseLayer[]) : Basemap {
    const _layers = Array.isArray(layers) ? layers : [layers]
    this._basemapItemPool.set(key.toLowerCase(), createCollection(_layers))
    return this
  }

  /**
   * 创建并选择自定义底图项
   * @param key 底图项Key
   * @param layers 图层
   */
  createCustomBasemapAndSelect (key:string, layers:BaseLayer | BaseLayer[]) : Basemap {
    return this
      .createCustomBasemap(key, layers)
      .selectBasemap(key)
  }

  //#endregion

}
