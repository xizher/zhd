import CircleStyle, { Options as CircleStyleOptions } from 'ol/style/Circle';
import Fill, { Options as FillOptions } from 'ol/style/Fill';
import Stroke, { Options as StrokeOptions } from 'ol/style/Stroke';
import Style, { Options as StyleOptions } from 'ol/style/Style';
/**
 * 创建圆样式
 * @param options 配置项
 */
export declare function createCircleStyle(options: CircleStyleOptions): CircleStyle;
/**
 * 创建样式
 * @param options 配置项
 */
export declare function createStyle(options: StyleOptions): Style;
/**
 * 创建Stroke
 * @param options 配置项
 */
export declare function createStroke(options: StrokeOptions): Stroke;
/**
 * 创建Fill
 * @param options 配置项
 */
export declare function createFill(options: FillOptions): Fill;
