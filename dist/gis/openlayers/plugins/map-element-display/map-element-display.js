import { WebMapPlugin } from '../../web-map/web-map-plugin';
import { createCircleStyle, createFill, createStroke, createStyle } from '../../utilities/style.utilities';
import { createLayerGroup, createVectorLayer } from '../../utilities/layer.utilities';
import { createCollection, createFeature } from '../../utilities/base.utilities';
import { baseUtils } from '../../../../js-utils/index';
/** 插件：图元控制类 */
export class MapElementDisplay extends WebMapPlugin {
    //#endregion
    //#region 构造函数
    /** 构造图元控制对象 */
    constructor() {
        super('mapElementDisplay');
        /** 图元样式 */
        this._styleOptions = {
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
        };
    }
    //#endregion
    //#region getter
    get style() {
        const { graphicsStyle: gStyle, highlightStyle: hStyle } = this._styleOptions;
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
        };
    }
    //#endregion
    //#region 私有方法
    /**
     * 创建点样式
     * @param options 配置项
     */
    _createPointStyle(options) {
        let image;
        const imageOptions = options.image;
        switch (imageOptions.styleType) {
            case 'circle':
                image = createCircleStyle({
                    fill: createFill(imageOptions.fill),
                    stroke: createStroke(imageOptions.stroke),
                    radius: imageOptions.radius
                });
                break;
            default:
                break;
        }
        return createStyle({ image });
    }
    /**
     * 创建线样式
     * @param options 配置项
     */
    _createPolylineStyle(options) {
        return createStyle({
            stroke: createStroke(options.stroke)
        });
    }
    _createPolygonStyle(options) {
        return createStyle({
            stroke: createStroke(options.stroke),
            fill: createFill(options.fill)
        });
    }
    /** 初始化 */
    _init() {
        this._layerGroup = createLayerGroup();
        this._graphicsLayer = createVectorLayer();
        this._highlightLayer = createVectorLayer();
        this._layerGroup.setLayers(createCollection([this._graphicsLayer, this._highlightLayer]));
        this.map.addLayer(this._layerGroup);
        return this;
    }
    //#endregion
    //#region 公有方法
    /** 重新设置图层位置 */
    reSortLayer() {
        this.map.getLayers().remove(this._layerGroup);
        this.map.addLayer(this._layerGroup);
        return this;
    }
    /** 重写插件安装方法 */
    installPlugin(webMap) {
        super.installPlugin(webMap);
        return this._init();
    }
    /**
     * 添加基础图元
     * @param features 图元
     */
    add(features) {
        const _features = Array.isArray(features) ? features : [features];
        this._graphicsLayer.getSource().addFeatures(_features);
        return this;
    }
    /**
     * 移除指定基础图元
     * @param features 图元
     */
    remove(features) {
        const _features = Array.isArray(features) ? features : [features];
        _features.map(feat => {
            this._graphicsLayer.getSource().removeFeature(feat);
        });
        return this;
    }
    /** 清空基础图元 */
    clear() {
        this._graphicsLayer.getSource().clear();
        return this;
    }
    /**
     * 设置指定基础图元
     * @param features 图元
     */
    set(features) {
        return this.clear().add(features);
    }
    /**
     * 添加高亮图元
     * @param features 图元
     */
    addHighlight(features) {
        const _features = Array.isArray(features) ? features : [features];
        this._highlightLayer.getSource().addFeatures(_features);
        return this;
    }
    /**
     * 移除指定高亮图元
     * @param features 图元
     */
    removeHighlight(features) {
        const _features = Array.isArray(features) ? features : [features];
        _features.map(feat => {
            this._highlightLayer.getSource().removeFeature(feat);
        });
        return this;
    }
    /** 清空高亮图元 */
    clearHighlight() {
        this._highlightLayer.getSource().clear();
        return this;
    }
    /**
     * 设置指定高亮图元
     * @param features 图元
     */
    setHighlight(features) {
        return this.clearHighlight().add(features);
    }
    /** 清空所有图元 */
    clearAll() {
        return this.clear().clearHighlight();
    }
    /**
     * 解析基础图元
     * @param geometries 几何图形
     * @param styleOptions 样式配置项
     */
    parseGraphics(geometries, styleOptions) {
        const _geometries = Array.isArray(geometries) ? geometries : [geometries];
        return _geometries.map(geometry => {
            let style, options = {};
            switch (geometry.getType()) {
                case 'Point':
                    options = baseUtils.deepCopy(this._styleOptions.graphicsStyle.pointStyle);
                    baseUtils.$extend(true, options, styleOptions);
                    style = this._createPointStyle(options);
                    break;
                case 'LineString':
                    options = baseUtils.deepCopy(this._styleOptions.graphicsStyle.polylineStyle);
                    baseUtils.$extend(true, options, styleOptions);
                    style = this._createPolylineStyle(options);
                    break;
                case 'Polygon':
                case 'Circle':
                    options = baseUtils.deepCopy(this._styleOptions.graphicsStyle.polygonStyle);
                    baseUtils.$extend(true, options, styleOptions);
                    style = this._createPolygonStyle(options);
                    break;
                default:
                    break;
            }
            return createFeature({ style, geometry });
        });
    }
    /**
     * 解析高亮图元
     * @param geometries 几何图形
     * @param styleOptions 样式配置项
     */
    parseHighlightGraphics(geometries, styleOptions) {
        const _geometries = Array.isArray(geometries) ? geometries : [geometries];
        return _geometries.map(geometry => {
            let style, options = {};
            switch (geometry.getType()) {
                case 'Point':
                    options = baseUtils.deepCopy(this._styleOptions.highlightStyle.pointStyle);
                    baseUtils.$extend(true, options, styleOptions);
                    style = this._createPointStyle(options);
                    break;
                case 'LineString':
                    options = baseUtils.deepCopy(this._styleOptions.highlightStyle.polylineStyle);
                    baseUtils.$extend(true, options, styleOptions);
                    style = this._createPolylineStyle(options);
                    break;
                case 'Polygon':
                    options = baseUtils.deepCopy(this._styleOptions.highlightStyle.polygonStyle);
                    baseUtils.$extend(true, options, styleOptions);
                    style = this._createPolygonStyle(options);
                    break;
                default:
                    break;
            }
            return createFeature({ style, geometry });
        });
    }
}
