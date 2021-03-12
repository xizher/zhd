import Geometry from 'ol/geom/Geometry'
import { UnitString } from '../../../../global/types.global'
import { WebMap } from '../../web-map/web-map'
import {
  BaseTool,
  OnToolDoneReture,
  OnToolDoneParams,
  OnToolResetParams,
  OnToolResetReture
} from '../base.tool'

export interface IBufferToolOptions {
  distance: number
  unit: UnitString
  isDissolve: boolean
}

export class BufferTool<T> extends BaseTool<T & {
  'change:buffer-targets': { geometries: Geometry[] }
  'change:buffer-options': { options: IBufferToolOptions }
}> {

  //#region 私有属性

  /** 缓冲目标 */
  private _geometry: Geometry | null

  /** 缓冲结果 */
  private _bufferResult: Geometry

  /** 缓冲配置项 */
  private _options: IBufferToolOptions

  //#endregion

  //#region 构造函数

  /**
   * 构造缓冲区对象
   * @param webMap WebMap
   */
  constructor (webMap: WebMap) {
    super(webMap)
  }

  //#endregion

  //#region 公有方法

  /** 工具重置触发事件 */
  onToolReset (e: OnToolResetParams<this>) : OnToolResetReture {
    if (!super.onToolReset(e)) {
      return false
    }
    this._geometry = null
    this.fire('change:buffer-targets')
    return true
  }

  /** 工具执行完成触发事件 */
  onToolDone (e: OnToolDoneParams<this>) : OnToolDoneReture {
    if (!super.onToolDone(e)) {
      return false
    }
    return true
  }

  //#endregion

}
