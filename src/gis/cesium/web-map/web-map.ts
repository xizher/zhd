import {
  Viewer,
  Color,
  EntityCollection,
} from 'cesium'
import { baseUtils } from '../../../js-utils'
import Basemap from '../plugins/basemap/basemap'
import WebMapPlugin, { IPlugins } from './web-map-plugin'

export interface IViewer extends Viewer {
  $owner: WebMap
}

export interface IEntities extends EntityCollection {
  $owner: WebMap
}

/** WebGIS应用程式类 */
export class WebMap implements IPlugins {

  //#region 插件

  public basemap?: Basemap

  //#endregion

  //#region 私有属性

  /** 容器Id */
  private _container: string

  /** 视图对象 */
  private _viewer: IViewer

  /** 实体对象 */
  private _entities: IEntities

  /** 配置项 */
  private _options: Viewer.ConstructorOptions = {
    animation: false,
    infoBox: false,
    timeline: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    vrButton: false,
    homeButton: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    geocoder: false,
    sceneModePicker: false,
    selectionIndicator: false,
    creditContainer: 'credit-container',
    // imageryProvider: new UrlTemplateImageryProvider({
    //   url : 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}'
    // })
  }

  //#endregion

  //#region getter

  get viewer () : IViewer {
    return this._viewer
  }

  get entities () : IEntities {
    return this._entities
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造WebGIS应用城市类
   * @param container 容器Id
   */
  constructor (container: string, options: Viewer.ConstructorOptions = {}) {
    this._container = container
    baseUtils.$extend(true, this._options, options)
    this._init()
  }

  //#endregion

  //#region 私有方法

  /** 初始化 */
  private _init () : void {
    const div = document.createElement('div')
    div.setAttribute('id', this._options.creditContainer as string)
    div.style.display = 'none'
    document.body.append(div)
    this._viewer = Object.assign(new Viewer(this._container, this._options), { $owner: this })
    this._viewer.imageryLayers.removeAll()
    this._viewer.scene.globe.baseColor = new Color(0, 0, 0, 0)

    this._entities = Object.assign(this._viewer.entities, { $owner: this })
  }

  //#endregion

  //#region 公有方法

  /**
   * 挂载插件
   * @param plugin WebMap插件对象
   */
  public use <T> (plugin: WebMapPlugin<T>) : this {
    this[plugin.pluginName] = plugin.installPlugin(this)
    return this
  }

  //#endregion

}

export default WebMap
