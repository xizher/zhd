import { Feature } from 'ol'
import Geometry from 'ol/geom/Geometry'
import { WebMap } from '../../web-map/web-map'
import { BaseTool, OnToolDoneParams, OnToolDoneReture, OnToolExecutingParams, OnToolExecutingReture } from '../base.tool'
import * as turf from '@turf/turf'

/** 裁剪工具类 */
export class ClipTool extends BaseTool<{

}> {

  //#region 私有变量

  /** 裁剪对象 */
  private _features: Feature[]

  /** 裁剪区域对象 */
  private _clipGeom: Geometry

  /** 裁剪结果 */
  private _resultFeatures: Feature[] = []

  //#endregion

  //#region 构造函数

  setTarget (features: Feature[]) : this {
    this._features = features
    return this
  }

  setClipGeometry (geometry: Geometry) : this {
    this._clipGeom = geometry
    return this
  }

  getResult () : Feature[] {
    return this._resultFeatures
  }

  /**
   * 构造裁剪工具对象
   * @param webMap WebMap
   */
  constructor (webMap: WebMap) {
    super(webMap)
  }

  /** 工具执行时触发事件 */
  onToolExecuting (e: OnToolExecutingParams<this>) : OnToolExecutingReture {
    if (!super.onToolExecuting(e)) {
      return false
    }
    this._resultFeatures = []
    let polygon = turf.polygon((this._clipGeom as any).getCoordinates()[0]) // eslint-disable-line
    polygon = turf.toWgs84(polygon)
    this._features.forEach(feat => {
      const coordinates = (feat.getGeometry() as any).getCoordinates() // eslint-disable-line
      let point = turf.point(coordinates)
      point = turf.toWgs84(point)
      const intersection = (turf as any).booleanIntersects(point, polygon) // eslint-disable-line
      if (intersection) {
        this._resultFeatures.push(feat)
      }
    })
    this.doneTool()
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
