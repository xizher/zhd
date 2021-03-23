import { baseUtils } from '../../../../js-utils'
import {
  Supermap,
  $Supermap
} from '../../init-modules/init-modules'
import { createEntity, IEntityStyle } from '../../utilities/entities.utilities'
import { WebMapPlugin } from '../../web-map/web-map-plugin'

export class MapEntities extends WebMapPlugin<{

}> {

  //#region 私有属性

  /** 默认样式 */
  private _defaultStyle: IEntityStyle = {
    material: Supermap.Color.RED.withAlpha(.5),
    outline: true,
    outlineColor: Supermap.Color.BLACK,
    outlineWidth: 1,
  }

  private _entitiesPool: Map<string, $Supermap.__Entity> = new Map()

  //#endregion

  //#region 构造函数

  constructor () {
    super('mapEntities')
  }

  //#endregion

  //#region 公有方法

  addEntity (entity: $Supermap.__Entity, name = '') : this {
    let _name = name
    if (!_name) {
      _name = baseUtils.createGuid()
    }
    this._entitiesPool.set(_name, entity)
    this.entities.add(entity)
    return this
  }

  createBoxEntity (
    position: $Supermap.__Cartesian3,
    dimensions: $Supermap.__Cartesian3,
    options: $Supermap.__BoxGraphics.__ConstructorOptions = {}
  ) : $Supermap.__Entity {
    return createEntity()
      .setPosition(position)
      .setBox({
        dimensions,
        ...this._defaultStyle,
        ...options
      })
      .finsh()
  }

  createRectangle (
    coordinates: $Supermap.__Rectangle | null,
    options: $Supermap.__RectangleGraphics.__ConstructorOptions = {}
  ) : $Supermap.__Entity {
    return createEntity()
      .setRectangle({
        coordinates,
        ...this._defaultStyle,
        ...options
      })
      .finsh()
  }

  createEllipse (
    position: $Supermap.__Cartesian3,
    options: $Supermap.__EllipseGraphics.__ConstructorOptions = {}
  ) : $Supermap.__Entity {
    return createEntity()
      .setPosition(position)
      .setEllipse({
        ...this._defaultStyle, ...options
      })
      .finsh()
  }

  createPolygon (
    hierarchy: $Supermap.__PolygonHierarchy | null,
    options: $Supermap.__PolygonGraphics.__ConstructorOptions = {}
  ) : $Supermap.__Entity {
    return createEntity()
      .setPolygon({
        hierarchy,
        ...this._defaultStyle,
        ...options
      })
      .finsh()
  }

  createCircle (
    position: $Supermap.__Cartesian3,
    radius: number,
    options: $Supermap.__EllipseGraphics.__ConstructorOptions = {}
  ) : $Supermap.__Entity {
    return createEntity()
      .setPosition(position)
      .setCircle(radius, {
        ...this._defaultStyle, ...options
      })
      .finsh()
  }

  createCylinder (
    position: $Supermap.__Cartesian3,
    size: { topRadius: number, bottomRadius: number, length: number } | null,
    options: $Supermap.__CylinderGraphics.__ConstructorOptions = {}
  ) : $Supermap.__Entity {
    return createEntity()
      .setPosition(position)
      .setCylinder({
        ...size,
        ...this._defaultStyle,
        ...options
      })
      .finsh()
  }

  zoomTo () : this
  zoomTo (name: string) : this
  zoomTo (entity?: $Supermap.__Entity) : this
  zoomTo (entity?: $Supermap.__Entity[]) : this
  zoomTo (...args) : this { // eslint-disable-line
    if (args.length === 0) {
      this.viewer.zoomTo(this.entities)
      return this
    }
    if (typeof args[0] === 'string') {
      const entity = this.getEntityByName(args[0])
      this.viewer.zoomTo(entity)
      return this
    }
    if (Array.isArray(args[0])) {
      this.viewer.zoomTo(args[0])
      return this
    }
    this.viewer.zoomTo(args[0])
    return this
  }

  getEntityByName (name: string) : $Supermap.__Entity | null {
    if (!this._entitiesPool.has(name)) {
      return null
    }
    return this._entitiesPool.get(name)
  }

  test () : this {
    return this
      .addEntity(this.createBoxEntity(
        Supermap.Cartesian3.fromDegrees(-107.0, 40.0, 0),
        new Supermap.Cartesian3(400000.0, 300000.0, 500000.0),
        { outlineWidth: 4 }
      ))
      .addEntity(this.createRectangle(
        Supermap.Rectangle.fromDegrees(-92.0, 20.0, -86.0, 27.0),
        { extrudedHeight: 500000 }
      ))
      .addEntity(this.createEllipse(
        Supermap.Cartesian3.fromDegrees(-80.0, 25.0), {
          semiMinorAxis: 300000.0,
          semiMajorAxis: 500000.0,
          rotation: -40,
          stRotation: 22,
          height: 800000
        }
      ))
      .addEntity(this.createPolygon(
        new Supermap.PolygonHierarchy(
          Supermap.Cartesian3.fromDegreesArray([
            -107.0, 27.0,
            -107.0, 22.0,
            -102.0, 23.0,
            -97.0, 21.0,
            -97.0, 25.0,
          ])
        )
      ))
      .addEntity(this.createCircle(
        Supermap.Cartesian3.fromDegrees(-72.0, 25.0),
        250000
      ))
      .addEntity(this.createCylinder(
        Supermap.Cartesian3.fromDegrees(-70.0, 45.0, 100000.0),
        { length: 100000, topRadius: 150000, bottomRadius: 50000, }
      ))
      .zoomTo()
  }

  //#endregion

}
