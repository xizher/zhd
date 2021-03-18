import { BoxGraphics, Cartesian3, Color, CylinderGraphics, EllipseGraphics, Entity, PolygonGraphics, PolygonHierarchy, Rectangle, RectangleGraphics } from 'cesium'
import { createEntity, IEntityStyle } from '../../utilities/entities.utilities'
import { WebMapPlugin } from '../../web-map/web-map-plugin'

export class MapEntities extends WebMapPlugin<{

}> {

  /** 默认样式 */
  private _defaultStyle: IEntityStyle = {
    material: Color.RED.withAlpha(.5),
    outline: true,
    outlineColor: Color.BLACK,
    outlineWidth: 1,
  }

  constructor () {
    super('mapEntities')
  }

  addBoxEntity (position: Cartesian3, dimensions: Cartesian3, options: BoxGraphics.ConstructorOptions = {}) : this {
    const entity = createEntity()
      .setPosition(position)
      .setBox({
        dimensions,
        ...this._defaultStyle,
        ...options
      })
      .finsh()
    this.entities.add(entity)
    return this
  }

  addRectangle (coordinates: Rectangle | null, options: RectangleGraphics.ConstructorOptions = {}) : this {
    const entity = createEntity()
      .setRectangle({
        coordinates,
        ...this._defaultStyle,
        ...options
      })
      .finsh()
    this.entities.add(entity)
    return this
  }

  addEllipse (position: Cartesian3, options: EllipseGraphics.ConstructorOptions = {}) : this {
    const entity = createEntity()
      .setPosition(position)
      .setEllipse({
        ...this._defaultStyle, ...options
      })
      .finsh()
    this.entities.add(entity)
    return this
  }

  addPolygon (hierarchy: PolygonHierarchy | null, options: PolygonGraphics.ConstructorOptions = {}) : this {
    const entity = createEntity()
      .setPolygon({
        hierarchy,
        ...this._defaultStyle,
        ...options
      })
      .finsh()
    this.entities.add(entity)
    return this
  }

  addCircle (position: Cartesian3, radius: number, options: EllipseGraphics.ConstructorOptions = {}) : this {
    const entity = createEntity()
      .setPosition(position)
      .setCircle(radius, {
        ...this._defaultStyle, ...options
      })
      .finsh()
    this.entities.add(entity)
    return this
  }

  addCylinder (position: Cartesian3, size: { topRadius: number, bottomRadius: number, length: number } | null, options: CylinderGraphics.ConstructorOptions = {}) : this {
    const entity = createEntity()
      .setPosition(position)
      .setCylinder({
        ...size,
        ...this._defaultStyle,
        ...options
      })
      .finsh()
    this.entities.add(entity)
    return this
  }

  zoomToEntity (entity?: Entity | Entity[]) : this {
    entity
      ? this.viewer.zoomTo(entity)
      : this.viewer.zoomTo(this.entities)
    return this
  }

  test () : this {
    return this
      .addBoxEntity(
        Cartesian3.fromDegrees(-107.0, 40.0, 0),
        new Cartesian3(400000.0, 300000.0, 500000.0),
        { outlineWidth: 4 }
      )
      .addRectangle(
        Rectangle.fromDegrees(-92.0, 20.0, -86.0, 27.0),
        { extrudedHeight: 500000 }
      )
      .addEllipse(
        Cartesian3.fromDegrees(-80.0, 25.0), {
          semiMinorAxis: 300000.0,
          semiMajorAxis: 500000.0,
          rotation: -40,
          stRotation: 22,
          height: 800000
        }
      )
      .addPolygon(
        new PolygonHierarchy(
          Cartesian3.fromDegreesArray([
            -107.0, 27.0,
            -107.0, 22.0,
            -102.0, 23.0,
            -97.0, 21.0,
            -97.0, 25.0,
          ])
        )
      )
      .addCircle(
        Cartesian3.fromDegrees(-72.0, 25.0),
        250000
      )
      .addCylinder(
        Cartesian3.fromDegrees(-70.0, 45.0, 100000.0),
        { length: 100000, topRadius: 150000, bottomRadius: 50000, }
      )
      .zoomToEntity()
  }

}
