// import { Fill, Stroke, Style } from 'ol/style'
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import IconStyle from 'ol/style/Icon';
import RegularShapeStyle from 'ol/style/RegularShape';
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
/**
 * 创建样式
 * @param options 配置项
 */
export function createStyle2(options) {
    let image, fill, stroke;
    if (options.image) {
        switch (options.image.styleType) {
            case 'circle':
                image = createCircleStyle({
                    fill: createFill(options.image.fill),
                    stroke: createStroke(options.image.stroke),
                    radius: options.image.radius
                });
                break;
            case 'icon':
                image = new IconStyle(options.image);
                break;
            case 'regular-shape':
                image = new RegularShapeStyle(options.image);
                break;
            default:
                break;
        }
    }
    if (options.fill) {
        fill = createFill(options.fill);
    }
    if (options.stroke) {
        stroke = createStroke(options.stroke);
    }
    return new Style({ image, fill, stroke });
}
