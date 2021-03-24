import {
  Supermap,
  $Supermap
} from '../init-modules/init-modules'
import { baseUtils } from '../../../js-utils'
import Basemap from '../plugins/basemap/basemap'
import WebMapPlugin, { IPlugins } from './web-map-plugin'
import Map3dTile from '../plugins/map-3d-tile/map-3d-tile'
import { MapCamera } from '../plugins/map-camera/map-camera'
import { MapEntities } from '../plugins/map-entities/map-entities'
import MapTools from '../plugins/map-tools/map-tools'

export interface IViewer extends $Supermap.__Viewer {
  $owner: WebMap
}

export interface IEntities extends $Supermap.__EntityCollection {
  $owner: WebMap
}

export interface ICamera extends $Supermap.__Camera {
  $owner: WebMap
}

/** WebGIS应用程式类 */
export class WebMap implements IPlugins {

  //#region 插件

  public basemap?: Basemap
  public map3dTile?: Map3dTile
  public mapCamera?: MapCamera
  public mapEntities?: MapEntities
  public mapTools?: MapTools

  //#endregion

  //#region 私有属性

  /** 容器Id */
  private _container: string

  /** 视图对象 */
  private _viewer: IViewer

  /** 实体对象 */
  private _entities: IEntities

  /** 相机对象 */
  private _camera: ICamera

  /** 配置项 */
  private _options: $Supermap.__Viewer.__ConstructorOptions = {
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
    mapProjection: new Supermap.GeographicProjection()
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

  get camera () : ICamera {
    return this._camera
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造WebGIS应用城市类
   * @param container 容器Id
   */
  constructor (container: string, options: $Supermap.__Viewer.__ConstructorOptions = {}) {
    this._container = container
    baseUtils.$extend(true, this._options, options)
    this._init()
  }

  //#endregion

  //#region 私有方法

  /** 初始化 */
  _init () : void {
    const div = document.createElement('div')
    div.setAttribute('id', this._options.creditContainer as string)
    div.style.display = 'none'
    document.body.append(div)
    this._viewer = Object.assign(new Supermap.Viewer(this._container, this._options), { $owner: this })
    this._viewer.imageryLayers.removeAll()
    this._viewer.scene.globe.baseColor = new Supermap.Color(0, 0, 0, 0)

    this._entities = Object.assign(this._viewer.entities, { $owner: this })
    this._camera = Object.assign(this._viewer.camera, { $owner: this })
  }

  //#endregion

  //#region 公有方法

  /**
   * 挂载插件
   * @param plugin WebMap插件对象
   */
  use <T> (plugin: WebMapPlugin<T>) : this {
    this[plugin.pluginName] = plugin.installPlugin(this)
    return this
  }

  //#endregion

}

export default WebMap
