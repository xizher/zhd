import { Feature, FeatureCollection, GeometryCollection, LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon } from '@turf/turf';
import { Feature as OlFeature } from 'ol';
import { Geometry as OlGeometry } from 'ol/geom';
export declare const trufHelper: {
    createGeoJSON(feature: OlFeature | OlGeometry): Feature | FeatureCollection | GeometryCollection | LineString | MultiLineString | MultiPoint | MultiPolygon | Point | Polygon | null;
};
export default trufHelper;
