import { lineString, multiLineString, multiPoint, multiPolygon, point, polygon, toWgs84, 
// eslint-disable-next-line
// @ts-ignore
booleanIntersects } from '@turf/turf';
import { Feature as OlFeature } from 'ol';
export const trufHelper = {
    createGeoJSON(feature) {
        let geom;
        if (feature instanceof OlFeature) {
            geom = feature.getGeometry();
        }
        else {
            geom = feature;
        }
        const type = geom.getType();
        let ret = null;
        switch (type) {
            case 'Point':
                ret = point(geom.getCoordinates());
                break;
            case 'Polygon':
                ret = polygon(geom.getCoordinates());
                break;
            case 'MultiPolygon':
                ret = multiPolygon(geom.getCoordinates());
                break;
            case 'MultiPoint':
                ret = multiPoint(geom.getCoordinates());
                break;
            case 'LineString':
                ret = lineString(geom.getCoordinates());
                break;
            case 'MultiLineString':
                ret = multiLineString(geom.getCoordinates());
                break;
            default:
                break;
        }
        return ret;
    },
    toWgs84(geojson) {
        return toWgs84(geojson);
    },
    booleanIntersects(geojson, anotherGeojson) {
        return booleanIntersects(geojson, anotherGeojson);
    }
};
export default trufHelper;
