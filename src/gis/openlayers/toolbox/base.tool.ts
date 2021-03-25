import { IObserverCallbackParams, Observer } from '../../../observer'
import { WebMap } from '../web-map/web-map'

export type OnToolResetParams<T> = IObserverCallbackParams<'tool-reset', T>
export type OnToolExecutingParams<T> = IObserverCallbackParams<'tool-executing', T>
export type OnToolDoneParams<T> = IObserverCallbackParams<'tool-done', T>
export type OnToolErrorParams<T> = IObserverCallbackParams<'tool-error', T>
export type OnToolResetReture = boolean
export type OnToolExecutingReture = boolean
export type OnToolDoneReture = boolean
export type OnToolErrorReture = boolean

/** 执行动作工具（弃用） */
export class BaseTool<T> extends Observer<T & {
  'tool-reset': void
  'tool-executing': void
  'tool-done': void
  'tool-error': {
    message: string
  }
}> {

  //#region 私有属性

  private _webMap: WebMap

  //#endregion

  //#region getter

  get webMap () : WebMap {
    return this._webMap
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造执行动作工具对象
   * @param map 地图对象
   * @param view 视图对象
   */
  constructor (webMap: WebMap) {
    super()
    this._webMap = webMap
    this.on('tool-reset', e => this.onToolReset(e))
    this.on('tool-executing', e=> this.onToolExecuting(e))
    this.on('tool-done', e => this.onToolDone(e))
    this.on('tool-error', e => this.onToolError(e))
  }

  //#endregion

  //#region 公有方法

  /** 重置工具 */
  resetTool () : this {
    this.fire('tool-reset')
    return this
  }

  /** 执行工具 */
  execute () : this {
    this.fire('tool-executing')
    return this
  }

  doneTool (success: true) : this
  doneTool (success: false, errorMessage: string) : this
  /** 完成执行工具 */
  doneTool (success: true | false, errorMessage?: string) : this {
    if (success) {
      this.fire('tool-done')
    } else {
      this.fire('tool-error', ({ message: errorMessage } as any)) // eslint-disable-line
    }
    return this
  }

  /** 工具重置触发事件 */
  onToolReset (e: OnToolResetParams<this>) : OnToolResetReture { // eslint-disable-line @typescript-eslint/no-unused-vars

    return true
  }

  /** 工具开始执行触发事件 */
  onToolExecuting (e: OnToolExecutingParams<this>) : OnToolExecutingReture { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._webMap.mapCursor.startWaitingCursor()
    return true
  }

  /** 工具执行完成触发事件 */
  onToolDone (e: OnToolDoneParams<this>) : OnToolDoneReture { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._webMap.mapCursor.stopWaitingCursor()
    return true
  }

  /** 工具执行异常触发事件 */
  onToolError (e: OnToolErrorParams<this>) : OnToolErrorReture { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._webMap.mapCursor.stopWaitingCursor()
    return true
  }

  //#endregion

}
