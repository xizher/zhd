import { $Supermap } from '../../init-modules/init-modules';
import { WebMapPlugin } from '../../web-map/web-map-plugin';
export declare class MapEntities extends WebMapPlugin<{}> {
    /** 默认样式 */
    private _defaultStyle;
    constructor();
    addBoxEntity(position: $Supermap.__Cartesian3, dimensions: $Supermap.__Cartesian3, options?: $Supermap.__BoxGraphics.__ConstructorOptions): this;
    addRectangle(coordinates: $Supermap.__Rectangle | null, options?: $Supermap.__RectangleGraphics.__ConstructorOptions): this;
    addEllipse(position: $Supermap.__Cartesian3, options?: $Supermap.__EllipseGraphics.__ConstructorOptions): this;
    addPolygon(hierarchy: $Supermap.__PolygonHierarchy | null, options?: $Supermap.__PolygonGraphics.__ConstructorOptions): this;
    addCircle(position: $Supermap.__Cartesian3, radius: number, options?: $Supermap.__EllipseGraphics.__ConstructorOptions): this;
    addCylinder(position: $Supermap.__Cartesian3, size: {
        topRadius: number;
        bottomRadius: number;
        length: number;
    } | null, options?: $Supermap.__CylinderGraphics.__ConstructorOptions): this;
    zoomToEntity(entity?: $Supermap.__Entity | $Supermap.__Entity[]): this;
    test(): this;
}
