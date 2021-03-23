import { baseUtils } from '../../../../js-utils';
import { Supermap } from '../../init-modules/init-modules';
import { createEntity } from '../../utilities/entities.utilities';
import { WebMapPlugin } from '../../web-map/web-map-plugin';
export class MapEntities extends WebMapPlugin {
    //#endregion
    //#region 构造函数
    constructor() {
        super('mapEntities');
        //#region 私有属性
        /** 默认样式 */
        this._defaultStyle = {
            material: Supermap.Color.RED.withAlpha(.5),
            outline: true,
            outlineColor: Supermap.Color.BLACK,
            outlineWidth: 1,
        };
        this._entitiesPool = new Map();
    }
    //#endregion
    //#region 公有方法
    addEntity(entity, name = '') {
        let _name = name;
        if (!_name) {
            _name = baseUtils.createGuid();
        }
        this._entitiesPool.set(_name, entity);
        this.entities.add(entity);
        return this;
    }
    createBoxEntity(position, dimensions, options = {}) {
        return createEntity()
            .setPosition(position)
            .setBox({
            dimensions,
            ...this._defaultStyle,
            ...options
        })
            .finsh();
    }
    createRectangle(coordinates, options = {}) {
        return createEntity()
            .setRectangle({
            coordinates,
            ...this._defaultStyle,
            ...options
        })
            .finsh();
    }
    createEllipse(position, options = {}) {
        return createEntity()
            .setPosition(position)
            .setEllipse({
            ...this._defaultStyle, ...options
        })
            .finsh();
    }
    createPolygon(hierarchy, options = {}) {
        return createEntity()
            .setPolygon({
            hierarchy,
            ...this._defaultStyle,
            ...options
        })
            .finsh();
    }
    createCircle(position, radius, options = {}) {
        return createEntity()
            .setPosition(position)
            .setCircle(radius, {
            ...this._defaultStyle, ...options
        })
            .finsh();
    }
    createCylinder(position, size, options = {}) {
        return createEntity()
            .setPosition(position)
            .setCylinder({
            ...size,
            ...this._defaultStyle,
            ...options
        })
            .finsh();
    }
    zoomTo(...args) {
        if (args.length === 0) {
            this.viewer.zoomTo(this.entities);
            return this;
        }
        if (typeof args[0] === 'string') {
            const entity = this.getEntityByName(args[0]);
            this.viewer.zoomTo(entity);
            return this;
        }
        if (Array.isArray(args[0])) {
            this.viewer.zoomTo(args[0]);
            return this;
        }
        this.viewer.zoomTo(args[0]);
        return this;
    }
    getEntityByName(name) {
        if (!this._entitiesPool.has(name)) {
            return null;
        }
        return this._entitiesPool.get(name);
    }
    test() {
        return this
            .addEntity(this.createBoxEntity(Supermap.Cartesian3.fromDegrees(-107.0, 40.0, 0), new Supermap.Cartesian3(400000.0, 300000.0, 500000.0), { outlineWidth: 4 }))
            .addEntity(this.createRectangle(Supermap.Rectangle.fromDegrees(-92.0, 20.0, -86.0, 27.0), { extrudedHeight: 500000 }))
            .addEntity(this.createEllipse(Supermap.Cartesian3.fromDegrees(-80.0, 25.0), {
            semiMinorAxis: 300000.0,
            semiMajorAxis: 500000.0,
            rotation: -40,
            stRotation: 22,
            height: 800000
        }))
            .addEntity(this.createPolygon(new Supermap.PolygonHierarchy(Supermap.Cartesian3.fromDegreesArray([
            -107.0, 27.0,
            -107.0, 22.0,
            -102.0, 23.0,
            -97.0, 21.0,
            -97.0, 25.0,
        ]))))
            .addEntity(this.createCircle(Supermap.Cartesian3.fromDegrees(-72.0, 25.0), 250000))
            .addEntity(this.createCylinder(Supermap.Cartesian3.fromDegrees(-70.0, 45.0, 100000.0), { length: 100000, topRadius: 150000, bottomRadius: 50000, }))
            .zoomTo();
    }
}
