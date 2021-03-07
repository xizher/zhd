// import { Fill, Stroke, Style } from 'ol/style'
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
/**
 * 创建圆样式
 * @param options 配置项
 */
export function createCircleStyle(options) {
    return new CircleStyle(options);
}
/**
 * 创建样式
 * @param options 配置项
 */
export function createStyle(options) {
    return new Style(options);
}
/**
 * 创建Stroke
 * @param options 配置项
 */
export function createStroke(options) {
    return new Stroke(options);
}
/**
 * 创建Fill
 * @param options 配置项
 */
export function createFill(options) {
    return new Fill(options);
}
