import { Feature } from 'ol'
import Geometry from 'ol/geom/Geometry'
import { WebMap } from '../../web-map/web-map'
import { BaseTool, OnToolDoneParams, OnToolDoneReture, OnToolExecutingParams, OnToolExecutingReture, OnToolResetParams, OnToolResetReture } from '../base.tool'
import trufHelper from '../../truf-helper/truf-helper'

/** 交集工具类 */
export class IntersectsTool extends BaseTool<{

}> {

  //#region 私有变量

  /** 裁剪对象 */
  private _features: Feature[]

  /** 裁剪区域对象 */
  private _instersectsGeom: Geometry

  /** 裁剪结果 */
  private _resultFeatures: Feature[] = []

  //#endregion

  //#region 构造函数

  setTarget (features: Feature[]) : this {
    this._features = features
    return this
  }

  setIntersectsGeometry (geometry: Geometry) : this {
    this._instersectsGeom = geometry
    return this
  }

  getResult () : Feature[] {
    return this._resultFeatures
  }

  clearResult () : this {
    this._resultFeatures = []
    return this
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
    if (!this._instersectsGeom) {
      this.doneTool(false, '交集目标范围未确定')
      return true
    }
    if (!this._features) {
      this.doneTool(false, '求交要素数据未确定')
      return true
    }
    this.clearResult()
    let polygon = trufHelper.createGeoJSON(this._instersectsGeom)
    polygon = trufHelper.toWgs84(polygon)
    this._features.forEach(feat => {
      let geojson = trufHelper.createGeoJSON(feat)
      geojson = trufHelper.toWgs84(geojson)
      const intersection = trufHelper.booleanIntersects(geojson, polygon) // eslint-disable-line
      if (intersection) {
        this._resultFeatures.push(feat)
      }
    })
    this.doneTool(true)
    return true
  }

  /** 工具执行完成触发事件 */
  onToolDone (e: OnToolDoneParams<this>) : OnToolDoneReture {
    if (!super.onToolDone(e)) {
      return false
    }
    return true
  }

  onToolReset (e: OnToolResetParams<this>) : OnToolResetReture {
    if (!super.onToolReset(e)) {
      return false
    }
    this.clearResult()
    this._instersectsGeom = null
    this._features = null
    return true
  }

  //#endregion

}
