import { $Supermap } from '../init-modules/init-modules';
export interface IEntityStyle {
    material?: $Supermap.__Color | $Supermap.__MaterialProperty;
    outline?: boolean;
    outlineColor?: $Supermap.__Color;
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
    finsh(): $Supermap.__Entity;
    setPosition(position: $Supermap.__Cartesian3 | $Supermap.__PositionProperty): ICreateEntityRet;
    setBox(options: $Supermap.__BoxGraphics.__ConstructorOptions): ICreateEntityRet;
    setRectangle(options: $Supermap.__RectangleGraphics.__ConstructorOptions): ICreateEntityRet;
    setEllipse(options: $Supermap.__EllipseGraphics.__ConstructorOptions): ICreateEntityRet;
    setPolygon(options: $Supermap.__PolygonGraphics.__ConstructorOptions): ICreateEntityRet;
    setCircle(radius: number, options: $Supermap.__EllipseGraphics.__ConstructorOptions): ICreateEntityRet;
    setCylinder(options: $Supermap.__CylinderGraphics.__ConstructorOptions): ICreateEntityRet;
}
export declare function createEntity(): ICreateEntityRet;
