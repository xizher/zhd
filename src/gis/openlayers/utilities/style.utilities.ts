// import { Fill, Stroke, Style } from 'ol/style'
import CircleStyle, { Options as CircleStyleOptions } from 'ol/style/Circle'
import Fill, { Options as FillOptions } from 'ol/style/Fill'
import Stroke, { Options as StrokeOptions } from 'ol/style/Stroke'
import Style, { Options as StyleOptions } from 'ol/style/Style'

/**
 * 创建圆样式
 * @param options 配置项
 */
export function createCircleStyle (options: CircleStyleOptions) : CircleStyle {
  return new CircleStyle(options)
}

/**
 * 创建样式
 * @param options 配置项
 */
export function createStyle (options: StyleOptions) : Style {
  return new Style(options)
}

/**
 * 创建Stroke
 * @param options 配置项
 */
export function createStroke (options: StrokeOptions) : Stroke {
  return new Stroke(options)
}

/**
 * 创建Fill
 * @param options 配置项
 */
export function createFill (options: FillOptions) : Fill {
  return new Fill(options)
}
