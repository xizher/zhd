import { BoxGraphics, Cartesian3, Color, CylinderGraphics, EllipseGraphics, Entity, MaterialProperty, PolygonGraphics, PositionProperty, RectangleGraphics } from 'cesium';
export interface IEntityStyle {
    material?: Color | MaterialProperty;
    outline?: boolean;
    outlineColor?: Color;
    outlineWidth?: number;
    extrudedHeight?: number;
    height?: number;
}
export interface IEllipseStyle extends IEntityStyle {
    semiMinorAxis?: number;
    semiMajorAxis?: number;
    rotation?: number;
    stRotation?: number;
}
export interface ICreateEntityRet {
    finsh(): Entity;
    setPosition(position: Cartesian3 | PositionProperty): ICreateEntityRet;
    setBox(options: BoxGraphics.ConstructorOptions): ICreateEntityRet;
    setRectangle(options: RectangleGraphics.ConstructorOptions): ICreateEntityRet;
    setEllipse(options: EllipseGraphics.ConstructorOptions): ICreateEntityRet;
    setPolygon(options: PolygonGraphics.ConstructorOptions): ICreateEntityRet;
    setCircle(radius: number, options: EllipseGraphics.ConstructorOptions): ICreateEntityRet;
    setCylinder(options: CylinderGraphics.ConstructorOptions): ICreateEntityRet;
}
export declare function createEntity(): ICreateEntityRet;
