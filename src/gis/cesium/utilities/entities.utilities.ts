import { BoxGraphics, Cartesian3, Color, CylinderGraphics, EllipseGraphics, Entity, MaterialProperty, PolygonGraphics, PositionProperty, RectangleGraphics } from 'cesium'

export interface IEntityStyle {
  material?: Color | MaterialProperty
  outline?: boolean
  outlineColor?: Color
  outlineWidth?: number
  extrudedHeight?: number
  height?: number
}

export interface IEllipseStyle extends IEntityStyle {
  semiMinorAxis?: number
  semiMajorAxis?: number
  rotation?: number
  stRotation?: number
}
export interface ICreateEntityRet {
  finsh () : Entity
  setPosition (position: Cartesian3 | PositionProperty) : ICreateEntityRet
  setBox (options: BoxGraphics.ConstructorOptions) : ICreateEntityRet
  setRectangle (options: RectangleGraphics.ConstructorOptions) : ICreateEntityRet
  setEllipse (options: EllipseGraphics.ConstructorOptions) : ICreateEntityRet
  setPolygon (options: PolygonGraphics.ConstructorOptions) : ICreateEntityRet
  setCircle (radius: number, options: EllipseGraphics.ConstructorOptions) : ICreateEntityRet
  setCylinder (options: CylinderGraphics.ConstructorOptions) : ICreateEntityRet
}

export function createEntity () : ICreateEntityRet {
  const entityOptions : Entity.ConstructorOptions = {

  }
  const methods : ICreateEntityRet = {
    finsh () {
      return new Entity(entityOptions)
    },
    setPosition (position: Cartesian3 | PositionProperty) {
      entityOptions.position = position as PositionProperty
      return methods
    },
    setBox (options: BoxGraphics.ConstructorOptions) {
      entityOptions.box = options
      return methods
    },
    setRectangle (options: RectangleGraphics.ConstructorOptions) {
      entityOptions.rectangle = options
      return methods
    },
    setEllipse (options: EllipseGraphics.ConstructorOptions) {
      entityOptions.ellipse = options
      return methods
    },
    setPolygon (options: PolygonGraphics.ConstructorOptions) {
      entityOptions.polygon = options
      return methods
    },
    setCircle (radius: number, options: EllipseGraphics.ConstructorOptions) {
      return methods.setEllipse({
        ...options,
        semiMajorAxis: radius,
        semiMinorAxis: radius,
      })
    },
    setCylinder (options: CylinderGraphics.ConstructorOptions) {
      entityOptions.cylinder = options
      return methods
    },
  }
  return methods
}
