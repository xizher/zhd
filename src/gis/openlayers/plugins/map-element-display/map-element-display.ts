import { Options as StrokeOptions } from 'ol/style/Stroke'
import { Options as FillOptions } from 'ol/style/Fill'
import { WebMapPlugin } from '../../web-map/web-map-plugin'
import LayerGroup from 'ol/layer/Group'
import VectorLayer from 'ol/layer/Vector'
import Style from 'ol/style/Style'
import { createCircleStyle, createFill, createStroke, createStyle } from '../../utilities/style.utilities'
import ImageStyle from 'ol/style/Image'
import { createLayerGroup, createVectorLayer } from '../../utilities/layer.utilities'
import { createCollection, createFeature } from '../../utilities/base.utilities'
import { WebMap } from '../../web-map/web-map'
import { Feature } from 'ol'
import Geometry from 'ol/geom/Geometry'
import { baseUtils } from '../../../../js-utils/index'

export interface ICircleStyle {
  styleType?: 'circle'
  fill?: FillOptions
  stroke?: StrokeOptions
  radius?: number
}

export interface IPointStyleOptions {
  image?: ICircleStyle
}

export interface IPolylineStyleOptions {
  stroke?: StrokeOptions
}

export interface IPolygonStyleOptions {
  stroke?: StrokeOptions
  fill?: FillOptions
}

type StyleOptions = IPointStyleOptions | IPolylineStyleOptions | IPolygonStyleOptions

export interface IGeometryStyleOptions {
  pointStyle?: IPointStyleOptions
  polylineStyle?: IPolylineStyleOptions
  polygonStyle?: IPolygonStyleOptions
}

export interface IGeometryStyle {
  pointStyle: Style
  polylineStyle: Style
  polygonStyle: Style
}

/** 插件：图元控制类 */
export class MapElementDisplay extends WebMapPlugin<{

}> {

  //#region 私有属性

  /** 图元存储图层组 */
  private _layerGroup : LayerGroup

  /** 基础图元存储图层 */
  private _graphicsLayer : VectorLayer

  /** 高亮图元存储图层 */
  private _highlightLayer : VectorLayer

  /** 图元样式 */
  private _styleOptions : {
    graphicsStyle: IGeometryStyleOptions
    highlightStyle: IGeometryStyleOptions
  } = {
    graphicsStyle: {
      pointStyle: {
        image: {
          styleType: 'circle',
          radius: 5,
          stroke: {
            color: 'red',
            width: 1
          },
          fill: {
            color: 'rgba(255, 0, 0, 0.8)'
          }
        }
      },
      polylineStyle: {
        stroke: {
          color: 'red',
          width: 1
        }
      },
      polygonStyle: {
        stroke: {
          color: 'red',
          width: 1
        },
        fill: {
          color: 'rgba(255, 0, 0, 0.5)'
        }
      }
    },
    highlightStyle: {
      pointStyle: {
        image: {
          styleType: 'circle',
          radius: 5,
          stroke: {
            color: 'rgba(0, 255, 255, 1)',
            width: 1
          },
          fill: {
            color: 'rgba(0, 255, 255, 0.8)'
          }
        }
      },
      polylineStyle: {
        stroke: {
          color: 'rgba(0, 255, 255, 0.8)',
          width: 1
        }
      },
      polygonStyle: {
        stroke: {
          color: 'rgba(0, 255, 255, 0.8)',
          width: 1
        },
        fill: {
          color: 'rgba(0, 255, 255, 0.5)'
        }
      }
    }
  }

  //#endregion

  //#region getter

  get style () : {
    graphicsStyle: IGeometryStyle
    highlightStyle: IGeometryStyle
  } {
    const { graphicsStyle: gStyle, highlightStyle: hStyle } = this._styleOptions
    return {
      graphicsStyle: {
        pointStyle: this._createPointStyle(gStyle.pointStyle),
        polylineStyle: this._createPolylineStyle(gStyle.polylineStyle),
        polygonStyle: this._createPolygonStyle(gStyle.polygonStyle),
      },
      highlightStyle: {
        pointStyle: this._createPointStyle(hStyle.pointStyle),
        polylineStyle: this._createPolylineStyle(hStyle.polylineStyle),
        polygonStyle: this._createPolygonStyle(hStyle.polygonStyle),
      },
    }
  }

  //#endregion

  //#region 构造函数

  /** 构造图元控制对象 */
  constructor () {
    super('mapElementDisplay')
  }

  //#endregion

  //#region 私有方法

  /**
   * 创建点样式
   * @param options 配置项
   */
  private _createPointStyle (options: IPointStyleOptions) : Style {
    let image: ImageStyle
    const imageOptions = options.image
    switch (imageOptions.styleType) {
      case 'circle':
        image = createCircleStyle({
          fill: createFill(imageOptions.fill),
          stroke: createStroke(imageOptions.stroke),
          radius: imageOptions.radius
        })
        break
      default:
        break
    }
    return createStyle({ image })
  }

  /**
   * 创建线样式
   * @param options 配置项
   */
  private _createPolylineStyle (options: IPolylineStyleOptions) : Style {
    return createStyle({
      stroke: createStroke(options.stroke)
    })
  }

  private _createPolygonStyle (options: IPolygonStyleOptions) : Style {
    return createStyle({
      stroke: createStroke(options.stroke),
      fill: createFill(options.fill)
    })
  }

  /** 初始化 */
  private _init () : this {
    this._layerGroup = createLayerGroup()
    this._graphicsLayer = createVectorLayer()
    this._highlightLayer = createVectorLayer()
    this._layerGroup.setLayers(createCollection([this._graphicsLayer, this._highlightLayer]))
    this.map.addLayer(this._layerGroup)
    return this
  }

  //#endregion

  //#region 公有方法

  /** 重写插件安装方法 */
  installPlugin (webMap: WebMap) : this {
    super.installPlugin(webMap)
    return this._init()
  }

  /**
   * 添加基础图元
   * @param features 图元
   */
  add (features: Feature | Feature[]) : this {
    const _features = Array.isArray(features) ? features : [features]
    this._graphicsLayer.getSource().addFeatures(_features)
    return this
  }

  /**
   * 移除指定基础图元
   * @param features 图元
   */
  remove (features: Feature | Feature[]) : this {
    const _features = Array.isArray(features) ? features : [features]
    _features.map(feat => {
      this._graphicsLayer.getSource().removeFeature(feat)
    })
    return this
  }

  /** 清空基础图元 */
  clear () : this {
    this._graphicsLayer.getSource().clear()
    return this
  }

  /**
   * 设置指定基础图元
   * @param features 图元
   */
  set (features: Feature | Feature[]) : this {
    return this.clear().add(features)
  }

  /**
   * 添加高亮图元
   * @param features 图元
   */
  addHighlight (features: Feature | Feature[]) : this {
    const _features = Array.isArray(features) ? features : [features]
    this._highlightLayer.getSource().addFeatures(_features)
    return this
  }

  /**
   * 移除指定高亮图元
   * @param features 图元
   */
  removeHighlight (features: Feature | Feature[]) : this {
    const _features = Array.isArray(features) ? features : [features]
    _features.map(feat => {
      this._highlightLayer.getSource().removeFeature(feat)
    })
    return this
  }

  /** 清空高亮图元 */
  clearHighlight () : this {
    this._highlightLayer.getSource().clear()
    return this
  }

  /**
   * 设置指定高亮图元
   * @param features 图元
   */
  setHighlight (features: Feature | Feature[]) : this {
    return this.clearHighlight().add(features)
  }

  /** 清空所有图元 */
  clearAll () : this {
    return this.clear().clearHighlight()
  }

  /**
   * 解析基础图元
   * @param geometries 几何图形
   * @param styleOptions 样式配置项
   */
  praseGraphics (geometries: Geometry | Geometry[], styleOptions: StyleOptions) : Feature[] {
    const _geometries = Array.isArray(geometries) ? geometries : [geometries]
    return _geometries.map(geometry => {
      let style: Style, options = {}
      switch (geometry.getType()) {
        case 'Point':
          options = baseUtils.deepCopy(this._styleOptions.graphicsStyle.pointStyle)
          baseUtils.$extend(true, options, styleOptions)
          style = this._createPointStyle(options)
          break
        case 'LineString':
          options = baseUtils.deepCopy(this._styleOptions.graphicsStyle.polylineStyle)
          baseUtils.$extend(true, options, styleOptions)
          style = this._createPolylineStyle(options)
          break
        case 'Polygon':
        case 'Circle':
          options = baseUtils.deepCopy(this._styleOptions.graphicsStyle.polygonStyle)
          baseUtils.$extend(true, options, styleOptions)
          style = this._createPolygonStyle(options)
          break
        default:
          break
      }
      return createFeature({ style, geometry })
    })
  }

  /**
   * 解析高亮图元
   * @param geometries 几何图形
   * @param styleOptions 样式配置项
   */
  parseHighlightGraphics (geometries: Geometry | Geometry[], styleOptions: StyleOptions) : Feature[] {
    const _geometries = Array.isArray(geometries) ? geometries : [geometries]
    return _geometries.map(geometry => {
      let style: Style, options = {}
      switch (geometry.getType()) {
        case 'Point':
          options = baseUtils.deepCopy(this._styleOptions.highlightStyle.pointStyle)
          baseUtils.$extend(true, options, styleOptions)
          style = this._createPointStyle(options)
          break
        case 'LineString':
          options = baseUtils.deepCopy(this._styleOptions.highlightStyle.polylineStyle)
          baseUtils.$extend(true, options, styleOptions)
          style = this._createPolylineStyle(options)
          break
        case 'Polygon':
          options = baseUtils.deepCopy(this._styleOptions.highlightStyle.polygonStyle)
          baseUtils.$extend(true, options, styleOptions)
          style = this._createPolygonStyle(options)
          break
        default:
          break
      }
      return createFeature({ style, geometry })
    })
  }

  //#endregion

}
