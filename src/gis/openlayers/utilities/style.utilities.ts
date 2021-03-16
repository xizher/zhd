// import { Fill, Stroke, Style } from 'ol/style'
import CircleStyle, { Options as CircleStyleOptions } from 'ol/style/Circle'
import Fill, { Options as FillOptions } from 'ol/style/Fill'
import IconStyle, { Options as IconStyleOptions } from 'ol/style/Icon'
import RegularShapeStyle, { Options as RegularShapeStyleOptions } from 'ol/style/RegularShape'
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

export interface ICircleStyleOptions {
  styleType?: 'circle'
  fill?: FillOptions
  stroke?: StrokeOptions
  radius?: number
}
export interface IIconStyleOptions extends IconStyleOptions {
  styleType?: 'icon'
}
export interface IRegularShapeStyleOptions extends RegularShapeStyleOptions {
  styleType?: 'regular-shape'
}

export interface IStyleOptions {
  image?: ICircleStyleOptions | IIconStyleOptions | IRegularShapeStyleOptions
  fill?: FillOptions
  stroke?: StrokeOptions
}

/**
 * 创建样式
 * @param options 配置项
 */
export function createStyle2 (options: IStyleOptions) : Style {
  let image, fill, stroke
  if (options.image) {
    switch (options.image.styleType) {
      case 'circle':
        image = createCircleStyle({
          fill: createFill(options.image.fill),
          stroke: createStroke(options.image.stroke),
          radius: options.image.radius
        })
        break
      case 'icon':
        image = new IconStyle(options.image)
        break
      case 'regular-shape':
        image = new RegularShapeStyle(options.image)
        break
      default:
        break
    }
  }
  if (options.fill) {
    fill = createFill(options.fill)
  }
  if (options.stroke) {
    stroke = createStroke(options.stroke)
  }
  return new Style({ image, fill, stroke })
}
