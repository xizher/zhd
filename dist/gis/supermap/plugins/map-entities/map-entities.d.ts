import { $Supermap } from '../../init-modules/init-modules';
import { WebMapPlugin } from '../../web-map/web-map-plugin';
export declare class MapEntities extends WebMapPlugin<{}> {
    /** 默认样式 */
    private _defaultStyle;
    private _entitiesPool;
    constructor();
    addEntity(entity: $Supermap.__Entity, name?: string): this;
    createBoxEntity(position: $Supermap.__Cartesian3, dimensions: $Supermap.__Cartesian3, options?: $Supermap.__BoxGraphics.__ConstructorOptions): $Supermap.__Entity;
    createRectangle(coordinates: $Supermap.__Rectangle | null, options?: $Supermap.__RectangleGraphics.__ConstructorOptions): $Supermap.__Entity;
    createEllipse(position: $Supermap.__Cartesian3, options?: $Supermap.__EllipseGraphics.__ConstructorOptions): $Supermap.__Entity;
    createPolygon(hierarchy: $Supermap.__PolygonHierarchy | null, options?: $Supermap.__PolygonGraphics.__ConstructorOptions): $Supermap.__Entity;
    createCircle(position: $Supermap.__Cartesian3, radius: number, options?: $Supermap.__EllipseGraphics.__ConstructorOptions): $Supermap.__Entity;
    createCylinder(position: $Supermap.__Cartesian3, size: {
        topRadius: number;
        bottomRadius: number;
        length: number;
    } | null, options?: $Supermap.__CylinderGraphics.__ConstructorOptions): $Supermap.__Entity;
    zoomTo(): this;
    zoomTo(name: string): this;
    zoomTo(entity?: $Supermap.__Entity): this;
    zoomTo(entity?: $Supermap.__Entity[]): this;
    getEntityByName(name: string): $Supermap.__Entity | null;
    test(): this;
}
