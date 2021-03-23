import { Feature, FeatureCollection, GeometryCollection, LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon } from '@turf/turf';
import { Feature as OlFeature } from 'ol';
import { Geometry as OlGeometry } from 'ol/geom';
declare type TurfGeoJSON = Feature | FeatureCollection | GeometryCollection | LineString | MultiLineString | MultiPoint | MultiPolygon | Point | Polygon;
export declare const trufHelper: {
    createGeoJSON(feature: OlFeature | OlGeometry): TurfGeoJSON | null;
    toWgs84(geojson: TurfGeoJSON): TurfGeoJSON;
    booleanIntersects(geojson: TurfGeoJSON, anotherGeojson: TurfGeoJSON): boolean;
};
export default trufHelper;
