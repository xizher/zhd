import { Observer } from '../../../observer'
import Basemap from '../plugins/basemap/basemap'
import Map3dTile from '../plugins/map-3d-tile/map-3d-tile'
import { MapCamera } from '../plugins/map-camera/map-camera'
import { MapEntities } from '../plugins/map-entities/map-entities'
import MapTools from '../plugins/map-tools/map-tools'
import { ICamera, IEntities, IViewer, WebMap } from './web-map'

export interface IPlugins {
  basemap?: Basemap
  map3dTile?: Map3dTile
  mapEntities?: MapEntities
  mapCamera?: MapCamera
  mapTools?: MapTools
}

/** WebMap插件类 */
export class WebMapPlugin<T> extends Observer<T> {

  //#region 私有属性

  /** 视图对象 */
  private _viewer: IViewer

  /** 实体对象 */
  private _entities: IEntities

  private _camera: ICamera

  /** 插件名 */
  private _pluginName: string

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

  get pluginName () : string {
    return this._pluginName
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造WebMap插件
   * @param pluginName 插件名
   */
  constructor (pluginName: string) {
    super()
    this._pluginName = pluginName
  }

  //#endregion

  //#region 公有方法

  /**
   * 安装WebMap插件
   * @param webMap WebMap对象
   */
  installPlugin (webMap: WebMap) : this {
    this._viewer = webMap.viewer
    this._entities = webMap.entities
    this._camera = webMap.camera
    return this
  }

  //#endregion

}

export default WebMapPlugin
