import {
  Supermap,
  $Supermap
} from '../../init-modules/init-modules'
import { createEntity, IEntityStyle } from '../../utilities/entities.utilities'
import { WebMapPlugin } from '../../web-map/web-map-plugin'

export class MapEntities extends WebMapPlugin<{

}> {

  /** 默认样式 */
  private _defaultStyle: IEntityStyle = {
    material: Supermap.Color.RED.withAlpha(.5),
    outline: true,
    outlineColor: Supermap.Color.BLACK,
    outlineWidth: 1,
  }

  constructor () {
    super('mapEntities')
  }

  addBoxEntity (position: $Supermap.__Cartesian3, dimensions: $Supermap.__Cartesian3, options: $Supermap.__BoxGraphics.__ConstructorOptions = {}) : this {
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

  addRectangle (coordinates: $Supermap.__Rectangle | null, options: $Supermap.__RectangleGraphics.__ConstructorOptions = {}) : this {
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

  addEllipse (position: $Supermap.__Cartesian3, options: $Supermap.__EllipseGraphics.__ConstructorOptions = {}) : this {
    const entity = createEntity()
      .setPosition(position)
      .setEllipse({
        ...this._defaultStyle, ...options
      })
      .finsh()
    this.entities.add(entity)
    return this
  }

  addPolygon (hierarchy: $Supermap.__PolygonHierarchy | null, options: $Supermap.__PolygonGraphics.__ConstructorOptions = {}) : this {
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

  addCircle (position: $Supermap.__Cartesian3, radius: number, options: $Supermap.__EllipseGraphics.__ConstructorOptions = {}) : this {
    const entity = createEntity()
      .setPosition(position)
      .setCircle(radius, {
        ...this._defaultStyle, ...options
      })
      .finsh()
    this.entities.add(entity)
    return this
  }

  addCylinder (position: $Supermap.__Cartesian3, size: { topRadius: number, bottomRadius: number, length: number } | null, options: $Supermap.__CylinderGraphics.__ConstructorOptions = {}) : this {
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

  zoomToEntity (entity?: $Supermap.__Entity | $Supermap.__Entity[]) : this {
    entity
      ? this.viewer.zoomTo(entity)
      : this.viewer.zoomTo(this.entities)
    return this
  }

  test () : this {
    return this
      .addBoxEntity(
        Supermap.Cartesian3.fromDegrees(-107.0, 40.0, 0),
        new Supermap.Cartesian3(400000.0, 300000.0, 500000.0),
        { outlineWidth: 4 }
      )
      .addRectangle(
        Supermap.Rectangle.fromDegrees(-92.0, 20.0, -86.0, 27.0),
        { extrudedHeight: 500000 }
      )
      .addEllipse(
        Supermap.Cartesian3.fromDegrees(-80.0, 25.0), {
          semiMinorAxis: 300000.0,
          semiMajorAxis: 500000.0,
          rotation: -40,
          stRotation: 22,
          height: 800000
        }
      )
      .addPolygon(
        new Supermap.PolygonHierarchy(
          Supermap.Cartesian3.fromDegreesArray([
            -107.0, 27.0,
            -107.0, 22.0,
            -102.0, 23.0,
            -97.0, 21.0,
            -97.0, 25.0,
          ])
        )
      )
      .addCircle(
        Supermap.Cartesian3.fromDegrees(-72.0, 25.0),
        250000
      )
      .addCylinder(
        Supermap.Cartesian3.fromDegrees(-70.0, 45.0, 100000.0),
        { length: 100000, topRadius: 150000, bottomRadius: 50000, }
      )
      .zoomToEntity()
  }

}
