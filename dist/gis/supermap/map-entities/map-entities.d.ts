import { BoxGraphics, Cartesian3, CylinderGraphics, EllipseGraphics, Entity, PolygonGraphics, PolygonHierarchy, Rectangle, RectangleGraphics } from 'cesium';
import { WebMapPlugin } from '../../web-map/web-map-plugin';
export declare class MapEntities extends WebMapPlugin<{}> {
    /** 默认样式 */
    private _defaultStyle;
    constructor();
    addBoxEntity(position: Cartesian3, dimensions: Cartesian3, options?: BoxGraphics.ConstructorOptions): this;
    addRectangle(coordinates: Rectangle | null, options?: RectangleGraphics.ConstructorOptions): this;
    addEllipse(position: Cartesian3, options?: EllipseGraphics.ConstructorOptions): this;
    addPolygon(hierarchy: PolygonHierarchy | null, options?: PolygonGraphics.ConstructorOptions): this;
    addCircle(position: Cartesian3, radius: number, options?: EllipseGraphics.ConstructorOptions): this;
    addCylinder(position: Cartesian3, size: {
        topRadius: number;
        bottomRadius: number;
        length: number;
    } | null, options?: CylinderGraphics.ConstructorOptions): this;
    zoomToEntity(entity?: Entity | Entity[]): this;
    test(): this;
}
