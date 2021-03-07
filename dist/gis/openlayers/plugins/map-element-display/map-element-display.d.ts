import { Options as StrokeOptions } from 'ol/style/Stroke';
import { Options as FillOptions } from 'ol/style/Fill';
import { WebMapPlugin } from '../../web-map/web-map-plugin';
import Style from 'ol/style/Style';
import { WebMap } from '../../web-map/web-map';
import { Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
export interface ICircleStyle {
    styleType?: 'circle';
    fill?: FillOptions;
    stroke?: StrokeOptions;
    radius?: number;
}
export interface IPointStyleOptions {
    image?: ICircleStyle;
}
export interface IPolylineStyleOptions {
    stroke?: StrokeOptions;
}
export interface IPolygonStyleOptions {
    stroke?: StrokeOptions;
    fill?: FillOptions;
}
declare type StyleOptions = IPointStyleOptions | IPolylineStyleOptions | IPolygonStyleOptions;
export interface IGeometryStyleOptions {
    pointStyle?: IPointStyleOptions;
    polylineStyle?: IPolylineStyleOptions;
    polygonStyle?: IPolygonStyleOptions;
}
export interface IGeometryStyle {
    pointStyle: Style;
    polylineStyle: Style;
    polygonStyle: Style;
}
/** 插件：图元控制类 */
export declare class MapElementDisplay extends WebMapPlugin<{}> {
    /** 图元存储图层组 */
    private _layerGroup;
    /** 基础图元存储图层 */
    private _graphicsLayer;
    /** 高亮图元存储图层 */
    private _highlightLayer;
    /** 图元样式 */
    private _styleOptions;
    get style(): {
        graphicsStyle: IGeometryStyle;
        highlightStyle: IGeometryStyle;
    };
    /** 构造图元控制对象 */
    constructor();
    /**
     * 创建点样式
     * @param options 配置项
     */
    private _createPointStyle;
    /**
     * 创建线样式
     * @param options 配置项
     */
    private _createPolylineStyle;
    private _createPolygonStyle;
    /** 初始化 */
    private _init;
    /** 重写插件安装方法 */
    installPlugin(webMap: WebMap): this;
    /**
     * 添加基础图元
     * @param features 图元
     */
    add(features: Feature | Feature[]): this;
    /**
     * 移除指定基础图元
     * @param features 图元
     */
    remove(features: Feature | Feature[]): this;
    /** 清空基础图元 */
    clear(): this;
    /**
     * 设置指定基础图元
     * @param features 图元
     */
    set(features: Feature | Feature[]): this;
    /**
     * 添加高亮图元
     * @param features 图元
     */
    addHighlight(features: Feature | Feature[]): this;
    /**
     * 移除指定高亮图元
     * @param features 图元
     */
    removeHighlight(features: Feature | Feature[]): this;
    /** 清空高亮图元 */
    clearHighlight(): this;
    /**
     * 设置指定高亮图元
     * @param features 图元
     */
    setHighlight(features: Feature | Feature[]): this;
    /** 清空所有图元 */
    clearAll(): this;
    /**
     * 解析基础图元
     * @param geometries 几何图形
     * @param styleOptions 样式配置项
     */
    praseGraphics(geometries: Geometry | Geometry[], styleOptions: StyleOptions): Feature[];
    /**
     * 解析高亮图元
     * @param geometries 几何图形
     * @param styleOptions 样式配置项
     */
    parseHighlightGraphics(geometries: Geometry | Geometry[], styleOptions: StyleOptions): Feature[];
}
export {};
