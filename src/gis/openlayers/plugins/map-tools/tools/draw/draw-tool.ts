import Geometry from 'ol/geom/Geometry'
import { IObserverCallbackParams } from '../../../../../../observer'
import { createLineString, createPoint } from '../../../../utilities/geom.utilities'
import { IMap, IView } from '../../../../web-map/web-map'
import { MapCursorType } from '../../../map-cursor/map-cursor'
import {
  BaseTool,
  OnToolActivedParams,
  OnToolActivedReture,
  OnToolDeActivedParams,
  OnToolDeActivedReture
} from '../../base-tool'
import { Drawer } from './drawer'
import { Feature } from 'ol'
import { Coordinate } from 'ol/coordinate'
import { ext } from '../../../../../../js-exts'

export type DrawType =
  'point' |
  'line' |
  'line-faster' |
  'polyline' |
  'polygon' |
  'rectangle' |
  'rectangle-faster' |
  'circle' |
  'circle-faster'

export type OnDrawStartParams<T> = IObserverCallbackParams<'draw-start', T> & { coordinate: Coordinate }
export type OnDrawMoveParams<T> = IObserverCallbackParams<'draw-move', T> & { geometry: Geometry }
export type OnDrawEndParams<T> = IObserverCallbackParams<'draw-end', T> & { geometry: Geometry }
export type OnDrawClearParams<T> = IObserverCallbackParams<'draw-clear', T>
export type OnDrawStartReture = Coordinate | false
export type OnDrawMoveReture = Feature[] | false
export type OnDrawEndReture = Feature[] | false
export type OnDrawClearReture = boolean


/** 绘图工具 */
export class DrawTool extends BaseTool<{
  'draw-start': { coordinate: Coordinate }
  'draw-move': { geometry: Geometry }
  'draw-end': { geometry: Geometry }
  'draw-clear': {} // eslint-disable-line @typescript-eslint/ban-types
}> {

  //#region 私有方法

  /** 绘图器对象 */
  private _drawer: Drawer

  /** 绘图类型 */
  private _drawType: DrawType

  /** 鼠标样式 */
  private _cursorType: MapCursorType

  //#endregion

  //#region getter

  get drawer () : Drawer {
    return this._drawer
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造绘图工具对象
   * @param map 地图对象
   * @param view 视图对象
   * @param drawType 绘图类型
   * @param cursorType 鼠标类型
   */
  constructor (map: IMap, view:IView, drawType: DrawType, cursorType: MapCursorType = 'draw') {
    super(map, view, false)

    this._drawer = new Drawer(map.$owner.mapElementDisplay)
    this._drawType = drawType
    this._cursorType = cursorType

    this.on('draw-start', e => this.onDrawStart(e))
    this.on('draw-move', e => this.onDrawMove(e))
    this.on('draw-end', e => this.onDrawEnd(e))
    this.on('draw-clear', e => this.onDrawClear(e))
  }

  //#endregion

  //#region 公有方法

  /** 清理绘制图形 */
  clearDrawed () : this {
    this.fire('draw-clear')
    return this
  }

  /** 绘图开始处理事件 */
  onDrawStart (e: OnDrawStartParams<this>) : OnDrawStartReture {
    if (!this.actived) {
      return false
    }
    return e.coordinate
  }
  /** 绘图过程处理事件 */
  onDrawMove (e: OnDrawMoveParams<this>) : OnDrawMoveReture {
    if (!this.actived) {
      return false
    }
    const features = this._drawer.setTemp(e.geometry, true) as Feature[]
    return features
  }
  /** 绘图结束处理事件 */
  onDrawEnd (e: OnDrawEndParams<this>) : OnDrawEndReture {
    if (!this.actived) {
      return false
    }
    const features = this._drawer.add(e.geometry, {}, true) as Feature[]
    return features
  }
  /** 绘图清除处理事件 */
  onDrawClear (e: OnDrawClearParams<this>) : OnDrawClearReture { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._drawer.clear()
    if (!this.actived) {
      return false
    }
    return true
  }

  /** 重写：工具激化处理事件 */
  onToolActived (e: OnToolActivedParams<this>) : OnToolActivedReture {
    if (!super.onToolActived(e)) {
      return false
    }
    this.map.$owner.mapCursor.setMapCursor(this._cursorType)
    DrawTool[`_${this._drawType}`](this)
    return true
  }

  /** 重写：工具失活处理事件 */
  onToolDeActived (e: OnToolDeActivedParams<this>) : OnToolDeActivedReture {
    if (!super.onToolDeActived(e)) {
      return false
    }
    this.map.$owner.mapCursor.setMapCursor('default')
    DrawTool._clearDrawHandlers()
    return true
  }

  //#endregion

  //#region 私有静态属性

  /** 绘制动作响应事件池 */
  private static _handlerPool : { [key: string]: { remove() : void } | null } = {
    'click': null,
    'dblclick': null,
    'moveend': null,
    'movestart': null,
    'pointerdrag': null,
    'pointermove': null,
    'singleclick': null,
    'mousedown': null,
    'mouseup': null,
  }

  //#endregion

  //#region 私有静态方法

  /** 清理绘制动作响应事件 */
  private static _clearDrawHandlers () {
    Object.entries(this._handlerPool).forEach(([key, item]) => {
      if (item) {
        item.remove()
        this._handlerPool[key] = null
      }
    })
    return this
  }

  /** 绘制点 */
  private static _point (drawTool: DrawTool) {
    this._clearDrawHandlers()
    const handler = drawTool.map.on('singleclick', ({ coordinate }) => {
      const geometry = createPoint(coordinate)
      drawTool.fire('draw-start', { coordinate })
      drawTool.fire('draw-end', { geometry })
    })
    const remove = () => drawTool.map.un('singleclick', handler.listener)
    this._handlerPool['singleclick'] = { remove }
  }

  /** 绘制直线段 */
  private static '_line' (drawTool: DrawTool) {
    this._clearDrawHandlers()
    let drawing = false, startCoordinate: Coordinate | null = null
    const handlerStartAndEnd = drawTool.map.on('singleclick', ({ coordinate }) => {
      if (drawing) {
        drawing = false
        const geometry = createLineString([startCoordinate, coordinate])
        startCoordinate = null
        drawTool.fire('draw-end', { geometry })
      } else {
        drawing = true
        startCoordinate = coordinate
        drawTool.fire('draw-start', { coordinate })
      }
    })
    const handlerMove = drawTool.map.on('pointermove', e => {
      if (drawing && startCoordinate) {
        const geometry = createLineString([startCoordinate, e.coordinate])
        drawTool.fire('draw-move', { geometry })
      }
    })
    {
      const remove = () => drawTool.map.un('singleclick', handlerStartAndEnd.listener)
      this._handlerPool['singleclick'] = { remove }
    } {
      const remove = () => drawTool.map.un('pointermove', handlerMove.listener)
      this._handlerPool['pointermove'] = { remove }
    }
  }

  /** 快速绘制直线段 */
  private static '_line-faster' (drawTool: DrawTool) {
    this._clearDrawHandlers()
    let drawing = false, startCoordinate: Coordinate | null = null
    const handlerMove = drawTool.map.on('pointermove', (e) => {
      if (drawing) {
        const geometry = createLineString([startCoordinate, e.coordinate])
        drawTool.fire('draw-move', { geometry })
      }
      e.stopPropagation()
    })
    function handlerMousedown (e: MouseEvent) {
      if (e.button !== 0) {
        return
      }
      drawing = true
      startCoordinate = drawTool.map.getEventCoordinate(e)
      drawTool.fire('draw-start', { coordinate: startCoordinate })
    }
    function handlerMouseup (e: MouseEvent) {
      if (e.button !== 0) {
        return
      }
      drawing = false
      const coordinate = drawTool.map.getEventCoordinate(e)
      const geometry = createLineString([startCoordinate, coordinate])
      drawTool.fire('draw-end', { geometry })
    }
    drawTool.map.getTargetElement().addEventListener('mousedown', handlerMousedown)
    drawTool.map.getTargetElement().addEventListener('mouseup', handlerMouseup)
    {
      const remove = () => drawTool.map.un('pointermove', handlerMove.listener)
      this._handlerPool['pointermove'] = { remove }
    } {
      const remove = () => drawTool.map.getTargetElement().removeEventListener('mousedown', handlerMousedown)
      this._handlerPool['mousedown'] = { remove }
    } {
      const remove = () => drawTool.map.getTargetElement().removeEventListener('mouseup', handlerMouseup)
      this._handlerPool['mouseup'] = { remove }
    }
  }

  /** 绘制多段线 */
  private static '_polyline' (drawTool: DrawTool) {
    this._clearDrawHandlers()
    let drawing = false
    const coordinates: Coordinate[] = []
    const handlerSingleClick = drawTool.map.on('singleclick', ({ coordinate }) => {
      coordinates.push(coordinate)
      if (!drawing) {
        drawing = true
        drawTool.fire('draw-start', { coordinate })
      }
    }); {
      const remove = () => drawTool.map.un('singleclick', handlerSingleClick.listener)
      this._handlerPool['singleclick'] = { remove }
    }
    const handlerDbClick = drawTool.map.on('dblclick', e => {
      if (drawing) {
        e.stopPropagation()
        coordinates.push(e.coordinate)
        const geometry = createLineString(coordinates)
        drawing = false
        ext(coordinates).clear()
        drawTool.fire('draw-end', { geometry })
      }
    }); {
      const remove = () => drawTool.map.un('dblclick', handlerDbClick.listener)
      this._handlerPool['dbclick'] = { remove }
    }
    const handlerPointermove = drawTool.map.on('pointermove', ({ coordinate }) => {
      if (drawing) {
        const geometry = createLineString([...coordinates, coordinate])
        drawTool.fire('draw-move', { geometry })
      }
    }); {
      const remove = () => drawTool.map.un('pointermove', handlerPointermove.listener)
      this._handlerPool['pointermove'] = { remove }
    }
  }

  //#endregion

}