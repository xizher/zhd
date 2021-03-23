import { Viewer, Color, EntityCollection, ImageryLayer, ImageryProvider, UrlTemplateImageryProvider, BoxGraphics, Cartesian3, Cartesian2, CylinderGraphics, EllipseGraphics, Entity, MaterialProperty, PolygonGraphics, PositionProperty, RectangleGraphics, PolygonHierarchy, Rectangle, GeographicProjection, Ellipsoid, Math as CesiumMath, Cesium3DTileset, Cartographic, Matrix4 } from 'cesium';
interface ISupermap {
    Viewer: typeof Viewer;
    Color: typeof Color;
    Entity: typeof Entity;
    EntityCollection: typeof EntityCollection;
    ImageryLayer: typeof ImageryLayer;
    ImageryProvider: typeof ImageryProvider;
    UrlTemplateImageryProvider: typeof UrlTemplateImageryProvider;
    Cartesian3: typeof Cartesian3;
    Cartesian2: typeof Cartesian2;
    Rectangle: typeof Rectangle;
    PolygonHierarchy: typeof PolygonHierarchy;
    GeographicProjection: typeof GeographicProjection;
    Ellipsoid: typeof Ellipsoid;
    Math: typeof CesiumMath;
    Cesium3DTileset: typeof Cesium3DTileset;
    Cartographic: typeof Cartographic;
    Matrix4: typeof Matrix4;
}
export declare namespace $Supermap {
    type __Viewer = Viewer;
    namespace __Viewer {
        type __ConstructorOptions = Viewer.ConstructorOptions;
    }
    type __EntityCollection = EntityCollection;
    type __ImageryLayer = ImageryLayer;
    type __ImageryProvider = ImageryProvider;
    type __Cartesian3 = Cartesian3;
    type __Color = Color;
    type __EllipseGraphics = EllipseGraphics;
    namespace __EllipseGraphics {
        type __ConstructorOptions = EllipseGraphics.ConstructorOptions;
    }
    type __Entity = Entity;
    namespace __Entity {
        type __ConstructorOptions = Entity.ConstructorOptions;
    }
    type __MaterialProperty = MaterialProperty;
    type __BoxGraphics = BoxGraphics;
    namespace __BoxGraphics {
        type __ConstructorOptions = BoxGraphics.ConstructorOptions;
    }
    type __PolygonGraphics = PolygonGraphics;
    type __PositionProperty = PositionProperty;
    namespace __PolygonGraphics {
        type __ConstructorOptions = PolygonGraphics.ConstructorOptions;
    }
    type __RectangleGraphics = RectangleGraphics;
    namespace __RectangleGraphics {
        type __ConstructorOptions = RectangleGraphics.ConstructorOptions;
    }
    type __CylinderGraphics = CylinderGraphics;
    namespace __CylinderGraphics {
        type __ConstructorOptions = CylinderGraphics.ConstructorOptions;
    }
    type __PolygonHierarchy = PolygonHierarchy;
    type __Rectangle = Rectangle;
    type __Cesium3DTileset = Cesium3DTileset;
}
declare let Supermap: ISupermap;
export { Supermap };
export declare function initModules(cssUrl: string, jsUrl: string): Promise<void>;
