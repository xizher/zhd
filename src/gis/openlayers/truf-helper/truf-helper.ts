import {
  Feature,
  FeatureCollection,
  GeometryCollection,
  lineString,
  LineString,
  multiLineString,
  MultiLineString,
  multiPoint,
  MultiPoint,
  multiPolygon,
  MultiPolygon,
  point,
  Point,
  polygon,
  Polygon
} from '@turf/turf'
import { Feature as OlFeature } from 'ol'
import { Coordinate as OlCoordinate } from 'ol/coordinate'
import { Geometry as OlGeometry } from 'ol/geom'

export const trufHelper = {
  createGeoJSON (feature: OlFeature | OlGeometry)
    : Feature
    | FeatureCollection
    | GeometryCollection
    | LineString
    | MultiLineString
    | MultiPoint
    | MultiPolygon
    | Point
    | Polygon
    | null {
    let geom : OlGeometry & { getCoordinates () : OlCoordinate | OlCoordinate[] | OlCoordinate[][] | OlCoordinate[][][] }
    if (feature instanceof OlFeature) {
      geom = feature.getGeometry() as OlGeometry & { getCoordinates () : OlCoordinate | OlCoordinate[] | OlCoordinate[][] | OlCoordinate[][][] }
    } else {
      geom = feature as OlGeometry & { getCoordinates () : OlCoordinate | OlCoordinate[] | OlCoordinate[][] | OlCoordinate[][][] }
    }
    const type = geom.getType()
    let ret = null
    switch (type) {
      case 'Point':
        ret = point(geom.getCoordinates() as OlCoordinate)
        break
      case 'Polygon':
        ret = polygon(geom.getCoordinates() as OlCoordinate[][])
        break
      case 'MultiPolygon':
        ret = multiPolygon(geom.getCoordinates() as OlCoordinate[][][])
        break
      case 'MultiPoint':
        ret = multiPoint(geom.getCoordinates() as OlCoordinate[])
        break
      case 'LineString':
        ret = lineString(geom.getCoordinates() as OlCoordinate[])
        break
      case 'MultiLineString':
        ret = multiLineString(geom.getCoordinates() as OlCoordinate[][])
        break
      default:
        break
    }
    return ret
  }
}

export default trufHelper
