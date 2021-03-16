import { Observer } from '../../../observer'
import { IViewer, WebMap } from './web-map'

export interface IPlugins {
  // TODO
  t: void
}

/** WebMap插件类 */
export class WebMapPlugin<T> extends Observer<T> {

  //#region 私有属性

  /** 视图对象 */
  private _viewer: IViewer

  /** 插件名 */
  private _pluginName: string

  //#endregion

  //#region getter

  get viewer () : IViewer {
    return this._viewer
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
    return this
  }

  //#endregion

}

