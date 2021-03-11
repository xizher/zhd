import { IObject } from '../../../../global/interfaces.global'
import { IObserverCallbackParams } from '../../../../observer'
import { IMap, IView } from '../../web-map/web-map'
import { BaseTool } from './base-tool'

export type OnToolResetParams<T> = IObserverCallbackParams<'tool-reset', T>
export type OnToolExecutingParams<T> = IObserverCallbackParams<'tool-executing', T>
export type OnToolDoneParams<T> = IObserverCallbackParams<'tool-done', T>
export type OnToolResetReture = boolean
export type OnToolExecutingReture = boolean
export type OnToolDoneReture = boolean

/** 执行动作工具（弃用） */
export class ExcutionTool<T = IObject> extends BaseTool<T & {
  'tool-reset': void
  'tool-executing': void
  'tool-done': void
}> {

  //#region 构造函数

  /**
   * 构造执行动作工具对象
   * @param map 地图对象
   * @param view 视图对象
   */
  constructor (map: IMap, view: IView) {
    super(map, view, true)

    this.on('tool-reset', e => this.onToolReset(e))
    this.on('tool-executing', e=> this.onToolExecuting(e))
    this.on('tool-done', e => this.onToolDone(e))
  }

  //#endregion

  //#region 公有方法

  /** 重置工具 */
  resetTool () : this {
    this.fire('tool-reset')
    return this
  }

  /** 执行工具 */
  executeTool () : this {
    this.fire('tool-done')
    return this
  }

  /** 完成执行工具 */
  doneTool () : this {
    this.fire('tool-done')
    return this
  }

  /** 工具重置触发事件 */
  onToolReset (e: OnToolResetParams<this>) : OnToolResetReture { // eslint-disable-line @typescript-eslint/no-unused-vars

    return true
  }

  /** 工具开始执行触发事件 */
  onToolExecuting (e: OnToolExecutingParams<this>) : OnToolExecutingReture { // eslint-disable-line @typescript-eslint/no-unused-vars
    this.map.$owner.mapCursor.startWaitingCursor()
    return true
  }

  /** 工具执行完成触发事件 */
  onToolDone (e: OnToolDoneParams<this>) : OnToolDoneReture { // eslint-disable-line @typescript-eslint/no-unused-vars
    this.map.$owner.mapCursor.stopWaitingCursor()
    return true
  }

  //#endregion

}
