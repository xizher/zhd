import WebMapPlugin from '../../web-map/web-map-plugin';
/** 插件：地图相机 */
export declare class MapCamera extends WebMapPlugin<{}> {
    constructor();
    getCameraLonLat(): [number, number];
    getCameraHeight(): number;
    getCameraExtent(): {
        lonMin: number;
        latMin: number;
        lonMax: number;
        latMax: number;
        height: number;
    };
    zoomTo(lon: number, lat: number, height?: number): this;
}
