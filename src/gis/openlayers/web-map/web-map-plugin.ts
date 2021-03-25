import { Observer } from '../../../observer/observer'
import { IMap, IView, WebMap } from './web-map'

/** WebMap插件类 */
export class WebMapPlugin<T> extends Observer<T> {

  //#region 私有方法

  /** 地图对象 */
  private _map : IMap

  /** 视图对象 */
  private _view : IView

  /** 插件名 */
  private _pluginName: string

  //#endregion

  //#region getter

  get map () : IMap {
    return this._map
  }

  get view () : IView {
    return this._view
  }

  get pluginName () : string {
    return this._pluginName
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造WebMap插件对象
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
  public installPlugin (webMap: WebMap) : this {
    this._map = webMap.map
    this._view = webMap.view
    return this
  }

  //#endregion

}

export default WebMapPlugin
