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
  Polygon,
  toWgs84,
  // eslint-disable-next-line
  // @ts-ignore
  booleanIntersects
} from '@turf/turf'
import { Feature as OlFeature } from 'ol'
import { Coordinate as OlCoordinate } from 'ol/coordinate'
import { Geometry as OlGeometry } from 'ol/geom'

type TurfGeoJSON = Feature
| FeatureCollection
| GeometryCollection
| LineString
| MultiLineString
| MultiPoint
| MultiPolygon
| Point
| Polygon

export const trufHelper = {
  createGeoJSON (feature: OlFeature | OlGeometry)
    : TurfGeoJSON | null {
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
  },
  toWgs84 (geojson: TurfGeoJSON) : TurfGeoJSON {
    return toWgs84(geojson)
  },
  booleanIntersects (geojson: TurfGeoJSON, anotherGeojson: TurfGeoJSON) : boolean {
    return booleanIntersects(geojson, anotherGeojson)
  }
}

export default trufHelper
