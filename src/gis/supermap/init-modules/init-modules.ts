/* eslint-disable @typescript-eslint/no-namespace */
import {
  Viewer,
  Color,
  EntityCollection,
  ImageryLayer,
  ImageryProvider,
  UrlTemplateImageryProvider,
  BoxGraphics,
  Cartesian3,
  Cartesian2,
  CylinderGraphics,
  EllipseGraphics,
  Entity,
  MaterialProperty,
  PolygonGraphics,
  PositionProperty,
  RectangleGraphics,
  PolygonHierarchy,
  Rectangle,
  GeographicProjection,
  Ellipsoid,
  Math as CesiumMath,
  Cesium3DTileset,
  Cartographic,
  Matrix4,
  Camera,
  GeoJsonDataSource,
} from 'cesium'
import { baseUtils } from '../../../js-utils'

interface ISupermap {
  Viewer: typeof Viewer
  Color: typeof Color
  Entity: typeof Entity
  EntityCollection: typeof EntityCollection
  ImageryLayer: typeof ImageryLayer
  ImageryProvider: typeof ImageryProvider
  UrlTemplateImageryProvider: typeof UrlTemplateImageryProvider
  Cartesian3: typeof Cartesian3
  Cartesian2: typeof Cartesian2
  Rectangle: typeof Rectangle
  PolygonHierarchy: typeof PolygonHierarchy
  GeographicProjection: typeof GeographicProjection
  Ellipsoid: typeof Ellipsoid
  Math: typeof CesiumMath
  Cesium3DTileset: typeof Cesium3DTileset
  Cartographic: typeof Cartographic
  Matrix4: typeof Matrix4
  /* eslint-disable */
  MeasureHandler: any
  MeasureMode: {
    Distance: any
    Area: any
    DVH: any
  }
  /* eslint-enable-line */
  Camera: typeof Camera
  GeoJsonDataSource: typeof GeoJsonDataSource
}

export namespace $Supermap {
  export type __Viewer = Viewer
  export namespace __Viewer {
    export type __ConstructorOptions = Viewer.ConstructorOptions
  }
  export type __EntityCollection = EntityCollection
  export type __ImageryLayer = ImageryLayer
  export type __ImageryProvider = ImageryProvider
  export type __Cartesian3 = Cartesian3
  export type __Color = Color
  export type __EllipseGraphics = EllipseGraphics
  export namespace __EllipseGraphics {
    export type __ConstructorOptions = EllipseGraphics.ConstructorOptions
  }
  export type __Entity = Entity
  export namespace __Entity {
    export type __ConstructorOptions = Entity.ConstructorOptions
  }
  export type __MaterialProperty = MaterialProperty
  export type __BoxGraphics = BoxGraphics
  export namespace __BoxGraphics {
    export type __ConstructorOptions = BoxGraphics.ConstructorOptions
  }
  export type __PolygonGraphics = PolygonGraphics
  export type __PositionProperty = PositionProperty
  export namespace __PolygonGraphics {
    export type __ConstructorOptions = PolygonGraphics.ConstructorOptions
  }
  export type __RectangleGraphics = RectangleGraphics
  export namespace __RectangleGraphics {
    export type __ConstructorOptions = RectangleGraphics.ConstructorOptions
  }
  export type __CylinderGraphics = CylinderGraphics
  export namespace __CylinderGraphics {
    export type __ConstructorOptions = CylinderGraphics.ConstructorOptions
  }
  export type __PolygonHierarchy = PolygonHierarchy
  export type __Rectangle = Rectangle
  export type __Cesium3DTileset = Cesium3DTileset
  export type __Camera = Camera
}

let Supermap: ISupermap = null

export {
  Supermap
}

export function initModules (cssUrl: string, jsUrl: string) : Promise<void> {
  return new Promise(resolve => {
    baseUtils.loadCss(cssUrl)
    baseUtils.loadJs(jsUrl)

    const handler = setInterval(() => {
      if (window.Cesium) {
        // eslint-disable-next-line
        // @ts-ignore
        window.Supermap = window.Cesium
        Supermap = window.Cesium as any // eslint-disable-line
        clearInterval(handler)
        resolve()
      }
    }, 100)
  })

}
