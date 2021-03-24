import { IObject } from '../../../../global/interfaces.global'
import Observer, { IObserverCallbackParams } from '../../../../observer/observer'
import { IViewer, IEntities } from '../../web-map/web-map'

export type OnToolActivedParams<T> = IObserverCallbackParams<'tool-actived', T>
export type OnToolDeActivedParams<T> = IObserverCallbackParams<'tool-deactived', T>
export type OnToolActivedReture = boolean
export type OnToolDeActivedReture = boolean

/** 基础工具类 */
export class BaseTool<T = IObject> extends Observer<T & { // eslint-disable-line @typescript-eslint/ban-types
  'tool-actived': void // 工具打开
  'tool-deactived': void // 工具关闭
}> {

  //#region 私有方法

  /** 地图对象 */
  private _viewer: IViewer

  /** 视图对象 */
  private _entities: IEntities

  /** 是否为一次性工具 */
  private _isOnceTool: boolean

  /** 工具是否为激活状态 */
  private _actived = false

  //#endregion

  //#region getter

  get viewer () : IViewer {
    return this._viewer
  }

  get entities () : IEntities {
    return this._entities
  }

  get isOnceTool () : boolean {
    return this._isOnceTool
  }

  get actived () : boolean {
    return this._actived
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造基础工具对象
   * @param viewer 地图对象
   * @param entities 视图对象
   * @param isOnceTool 是否为一次性工具，默认为否
   */
  constructor (viewer: IViewer, entities: IEntities, isOnceTool = false) {
    super()
    this._viewer = viewer
    this._entities = entities
    this._isOnceTool = isOnceTool

    this.on('tool-actived', e => this.onToolActived(e))
    this.on('tool-deactived', e => this.onToolDeActived(e))
  }

  //#endregion

  //#region 公有方法

  /** 激活工具 */
  active () : this {
    if (this._actived) {
      return this
    }
    this._actived = true
    this.fire('tool-actived')
    if (this._isOnceTool) {
      this.deactive()
    }
    return this
  }

  /** 接触工具激活状态 */
  deactive () : this {
    if (!this._actived) {
      return this
    }
    this.fire('tool-deactived')
    return this
  }

  /** 工具激化处理事件 */
  onToolActived (e: OnToolActivedParams<this>) : OnToolActivedReture { // eslint-disable-line @typescript-eslint/no-unused-vars
    if (!this._actived) {
      return false
    }
    return true
  }

  /** 工具失活处理事件 */
  onToolDeActived (e: OnToolDeActivedParams<this>) : OnToolDeActivedReture { // eslint-disable-line @typescript-eslint/no-unused-vars
    if (!this._actived) {
      return false
    }
    this._actived = false
    return true
  }

  //#endregion

}

export default BaseTool
