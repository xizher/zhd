import { ImageryLayer, ImageryProvider, UrlTemplateImageryProvider } from 'cesium'
import { baseUtils } from '../../../../js-utils'
import { WebMap } from '../../web-map/web-map'
import { WebMapPlugin } from '../../web-map/web-map-plugin'

export interface IBasemapOptions {
  key: string
  visible: boolean
}

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

  /** 高德地图地址集合 */
  private _gaodeUrls = {
    '影像底图': 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    '影像注记': 'https://wprd02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8&ltype=11',
  }

  /** 配置项 */
  private _options: IBasemapOptions = {
    key: '彩色地图',
    visible: true
  }

  /** 底图项池 */
  private _basemapItemPool : Map<string, ImageryLayer[]> = new Map()

  /** 当前选中的底图项Key值 */
  private _selectedKey : string

  /** 底图图层 */
  private _layerGroup: ImageryLayer[] = []

  /** 底图可见性 */
  private _visible: boolean

  //#endregion

  //#region getter

  get basemapList () : string[] {
    return [...this._basemapItemPool.keys()]
  }

  get selectedKey () : string {
    return this._selectedKey
  }

  get visible () : boolean {
    return this._visible
  }

  //#endregion

  //#region 构造函数

  /**
   * 构建底图控制插件
   * @param options 配置项
   */
  constructor (options: IBasemapOptions) {
    super('basemap')
    baseUtils.$extend(true, this._options, options)
    this._selectedKey = this._options.key
    this._visible = this._options.visible
  }

  //#endregion

  //#region 私有方法

  /** 初始化 */
  private _init () {
    this
      ._createTianDiTuItems()
      .selectBasemap(this._selectedKey)
      .setVisible(this._visible)
  }

  /** 创建天地图底图项集合 */
  private _createTianDiTuItems () {
    // Object.entries(this._tianDiTuUrls).forEach(([key, url]) => {
    //   const imageryProvider = new UrlTemplateImageryProvider({ url })
    //   this._basemapItemPool.set(key, imageryProvider)
    // })
    // return this
    const createTianDiTuItem = (name: string) => {
      this.createCustomBasemap(`天地图${name}`, new UrlTemplateImageryProvider({
        url: this._tianDiTuUrls[`${name}底图`]
      }))
      this.createCustomBasemap(`天地图${name}含注记`, [
        new UrlTemplateImageryProvider({ url: this._tianDiTuUrls[`${name}注记`] }),
        new UrlTemplateImageryProvider({ url: this._tianDiTuUrls[`${name}底图`] }),
      ])
      return createTianDiTuItem
    }
    createTianDiTuItem('影像')('矢量')('地形')
    return this
  }

  //#endregion

  //#region 公有方法

  /** 安装插件 */
  installPlugin (webMap: WebMap) : this {
    super.installPlugin(webMap)
    this._init()
    return this
  }

  createCustomBasemap (key: string, imageryProviders: ImageryProvider | ImageryProvider[]) : this {
    const _imageryProviders = Array.isArray(imageryProviders) ? imageryProviders : [imageryProviders]
    this._basemapItemPool.set(key, _imageryProviders.map(item => new ImageryLayer(item), { $type: 'basemap-layer' }))
    return this
  }

  //#endregion

  //#region 公有方法

  selectBasemap (key: string) : this {
    this._layerGroup.forEach(item => this.viewer.imageryLayers.remove(item))
    const layers = this._basemapItemPool.get(key)
    if (layers) {
      this._layerGroup = layers
      this._layerGroup.forEach(item => this.viewer.imageryLayers.add(item, 0))
      this.fire('change:key', { key })
    }
    return this
  }

  setVisible (visible: boolean) : this {
    this._layerGroup.forEach(item => item.show = visible)
    this.fire('change:visible', { visible })
    return this
  }

  //#endregion

}

export default Basemap
