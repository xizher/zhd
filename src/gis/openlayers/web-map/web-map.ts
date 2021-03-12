import OLMap from 'ol/Map'
import { MapOptions } from 'ol/PluggableMap'
import View, { ViewOptions } from 'ol/View'
import { baseUtils } from '../../../js-utils/utilities/base-utils'
import { Observer } from '../../../observer/observer'
import { Basemap } from '../plugins/basemap/basemap'
import { LayerOperation } from '../plugins/layer-operation/layer-operation'
import { MapCursor } from '../plugins/map-cursor/map-cursor'
import { MapElementDisplay } from '../plugins/map-element-display/map-element-display'
import { MapTools } from '../plugins/map-tools/map-tools'
import { IPlugins, WebMapPlugin } from './web-map-plugin'

/** 地图接口 */
export interface IMap extends OLMap {
  $owner: WebMap
}

/** 视图接口 */
export interface IView extends View {
  $owner: WebMap
}

/** WebMap配置项接口 */
export interface IWebMapOptions {
  mapOptions?: MapOptions
  viewOptions?: ViewOptions
}

/** WebMap类 */
export class WebMap extends Observer<{
  'loaded': void
}> implements IPlugins {

  //#region 公有属性（插件对象）

  public basemap?: Basemap
  public mapCursor?: MapCursor
  public mapTools?: MapTools
  public mapElementDisplay?: MapElementDisplay
  public layerOperation?: LayerOperation

  //#endregion

  //#region 私有变量

  /** 目标容器ID */
  private _targetDiv : string

  /** 地图对象 */
  private _map : IMap

  /** 视图对象 */
  private _view: IView

  /** 配置项 */
  private _options: IWebMapOptions = {
    viewOptions: {
      center: [0, 0],
      zoom: 1,
      projection: 'EPSG:3857', // EPSG:3857 or EPSG:4326
    },
    mapOptions: {
      controls: [],
    },
  }

  //#endregion

  //#region getter

  get targetDiv () : string {
    return this._targetDiv
  }

  get map () : IMap {
    return this._map
  }

  get view () : IView {
    return this._view
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造WebMap对象
   * @param targetDiv 地图容器ID
   * @param options 配置项
   */
  constructor (targetDiv: string, options: IWebMapOptions = {}) {
    super()
    this._targetDiv = targetDiv
    baseUtils.$extend(true, this._options, options)
    this._init()
  }

  //#endregion

  //#region 私有方法

  /** 初始化 */
  private _init () {
    const { mapOptions, viewOptions } = this._options
    const view = new View(viewOptions)
    const map = new OLMap({ view, ...mapOptions })
    this._view = Object.assign(view, { $owner: this })
    this._map = Object.assign(map, { $owner: this })
  }

  //#endregion

  //#region 公有方法

  /**
   * 挂载插件
   * @param plugin WebMap插件对象
   */
  public use <T> (plugin: WebMapPlugin<T>) : WebMap {
    this[plugin.pluginName] = plugin.installPlugin(this)
    return this
  }

  /**
   * 挂载WebMap
   */
  public mount () : WebMap {
    this._map.setTarget(this._targetDiv)
    this.basemap && this.basemap.reSortLayer()
    this.mapElementDisplay && this.mapElementDisplay.reSortLayer()
    return this
  }

  //#endregion

}
