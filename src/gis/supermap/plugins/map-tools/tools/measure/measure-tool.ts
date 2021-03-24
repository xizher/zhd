import { Supermap } from '../../../../init-modules/init-modules'
import { IEntities, IViewer } from '../../../../web-map/web-map'
import BaseTool, { OnToolActivedParams, OnToolActivedReture, OnToolDeActivedParams, OnToolDeActivedReture } from '../../base-tool'

export enum ClampModeType {
  Space = 0,
  Ground = 1,
}
export type MeasureType = 'distance' | 'area' | 'height'

/** 测量工具 */
export class MeasureTool extends BaseTool<{
  'change:type': {
    type: MeasureType
  }
  'change:mode': {
    mode: ClampModeType
  }
}> {

  //#region 私有方法

  /** 量算方式 */
  private _clampMode : ClampModeType = ClampModeType.Space

  /** 测量类型 */
  private _measureType : MeasureType = 'distance'

  private _distanceHandler = null

  private _areaHandler = null

  private _heightHandler = null

  //#endregion

  //#region getter

  get measureType () : MeasureType {
    return this._measureType
  }

  get clampMode () : ClampModeType {
    return this._clampMode
  }

  //#endregion

  //#region 构造函数

  /** 构造测量工具对象 */
  constructor (viewer: IViewer, entities: IEntities) {
    super(viewer, entities)
    this._init()
  }

  //#endregion

  //#region 私有方法

  private _init () {
    this
      ._initDistanceHandler()
      ._initAreaHandler()
      ._initHeightHandler()
  }

  private _initDistanceHandler () : this {
    this._distanceHandler = new Supermap.MeasureHandler(
      this.viewer,
      Supermap.MeasureMode.Distance,
      this._clampMode
    )
    this._distanceHandler.measureEvt.addEventListener(result => {
      const dis = Number(result.distance)
      const distance = dis > 1000 ? `${(dis / 1000).toFixed(2)}km` : `${dis.toFixed(2)}m`
      this._distanceHandler.disLabel.text = `距离:${distance}`
    })
    this._distanceHandler.activeEvt.addEventListener(isActive => {
      if (isActive) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (this.viewer as any).enableCursorStyle = false
        ;(this.viewer as any)._element.style.cursor = ''
      } else {
        (this.viewer as any).enableCursorStyle = true
        this.viewer.$owner.mapTools.setMapTool('default')
        /* eslint-enable */
      }
    })
    return this
  }

  private _initAreaHandler () : this {
    this._areaHandler = new Supermap.MeasureHandler(
      this.viewer,
      Supermap.MeasureMode.Area,
      this._clampMode
    )
    this._areaHandler.measureEvt.addEventListener(result => {
      const mj = Number(result.area)
      const area = mj > 1000000 ? `${(mj / 1000000).toFixed(2)}km²` : `${mj.toFixed(2)}m²`
      this._areaHandler.areaLabel.text = `面积:${area}`
    })
    this._areaHandler.activeEvt.addEventListener(isActive => {
      if (isActive) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (this.viewer as any).enableCursorStyle = false
        ;(this.viewer as any)._element.style.cursor = ''
      } else {
        (this.viewer as any).enableCursorStyle = true
        this.viewer.$owner.mapTools.setMapTool('default')
        /* eslint-enable */
      }
    })
    return this
  }

  private _initHeightHandler () : this {
    this._heightHandler = new Supermap.MeasureHandler(
      this.viewer,
      Supermap.MeasureMode.DVH
    )
    this._heightHandler.measureEvt.addEventListener(result => {
      const distance = result.distance > 1000 ? (result.distance / 1000).toFixed(2) + 'km' : result.distance + 'm'
      const vHeight = result.verticalHeight > 1000 ? (result.verticalHeight / 1000).toFixed(2) + 'km' : result.verticalHeight + 'm'
      const hDistance = result.horizontalDistance > 1000 ? (result.horizontalDistance / 1000).toFixed(2) + 'km' : result.horizontalDistance + 'm'
      this._heightHandler.disLabel.text = '空间距离:' + distance
      this._heightHandler.vLabel.text = '垂直高度:' + vHeight
      this._heightHandler.hLabel.text = '水平距离:' + hDistance
    })
    this._heightHandler.activeEvt.addEventListener(isActive => {
      if (isActive) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (this.viewer as any).enableCursorStyle = false
        ;(this.viewer as any)._element.style.cursor = ''
      } else {
        (this.viewer as any).enableCursorStyle = true
        this.viewer.$owner.mapTools.setMapTool('default')
        /* eslint-enable */
      }
    })
    return this
  }

  private _deactiveAllHandler () : this {
    this._distanceHandler.deactivate()
    this._areaHandler.deactivate()
    this._heightHandler.deactivate()
    return this
  }

  private _clearMeasureResult () : this {
    this._distanceHandler.clear()
    this._areaHandler.clear()
    this._heightHandler.clear()
    return this
  }

  private _updateClampMode () : this {
    switch (this._clampMode) {
      case ClampModeType.Space:
        this._areaHandler.clampMode = 0
        this._distanceHandler.clampMode = 0
        break
      case ClampModeType.Ground:
        this._areaHandler.clampMode = 1
        this._distanceHandler.clampMode = 1
        break
      default:
        break
    }
    return this
  }

  private _activeMeasure () : this {
    this
      ._deactiveAllHandler()
      ._updateClampMode()
    switch (this._measureType) {
      case 'distance':
        this._distanceHandler.activate()
        break
      case 'area':
        this._areaHandler.activate()
        break
      case 'height':
        this._heightHandler.activate()
        break
      default:
        break
    }
    return this
  }

  //#endregion

  //#region 公有方法

  /** 设置量算方式 */
  setClampMode (mode: ClampModeType) : this {
    this._clampMode = mode
    this.fire('change:mode', { mode })
    return this._updateClampMode()
  }

  /** 设置测量类型 */
  setMeasureType (type: MeasureType) : this {
    this._measureType = type
    this.fire('change:type', { type })
    if (this.actived) {
      this._activeMeasure()
    }
    return this
  }

  /** 清理测量结果 */
  clearMeasureResult () : this {
    return this._clearMeasureResult()
  }

  onToolActived (e: OnToolActivedParams<this>) : OnToolActivedReture {
    if (!super.onToolActived(e)) {
      return false
    }
    this._activeMeasure()
    return true
  }

  onToolDeActived (e: OnToolDeActivedParams<this>) : OnToolDeActivedReture {
    if (!super.onToolDeActived(e)) {
      return false
    }
    this._deactiveAllHandler()
    return true
  }

  //#endregion

}

export default MeasureTool
