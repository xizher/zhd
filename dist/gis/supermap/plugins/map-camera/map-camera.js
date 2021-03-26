import { Supermap } from '../../init-modules/init-modules';
import WebMapPlugin from '../../web-map/web-map-plugin';
/** 插件：地图相机 */
export class MapCamera extends WebMapPlugin {
    //#region 构造和函数
    constructor() {
        super('mapCamera');
    }
    //#endregion
    //#region 公有方法
    getCameraLonLat() {
        const result = this.camera.pickEllipsoid(new Supermap.Cartesian3(this.viewer.canvas.clientWidth / 2, this.viewer.canvas.clientHeight / 2));
        const curPosition = Supermap.Ellipsoid.WGS84.cartesianToCartographic(result);
        const lon = curPosition.longitude * 180 / Math.PI;
        const lat = curPosition.latitude * 180 / Math.PI;
        return [lon, lat];
    }
    getCameraHeight() {
        const { ellipsoid } = this.viewer.scene.globe;
        return ellipsoid.cartesianToCartographic(this.camera.position).height;
    }
    getCameraExtent() {
        const extent = {}; // eslint-disable-line
        const { scene } = this.viewer;
        const { ellipsoid } = scene.globe;
        const { canvas } = scene;
        const car3Lt = this.camera.pickEllipsoid(new Supermap.Cartesian2(0, 0), ellipsoid);
        const car3Rb = this.camera.pickEllipsoid(new Supermap.Cartesian2(canvas.width, canvas.height), ellipsoid);
        if (car3Lt && car3Rb) {
            const cartoLt = ellipsoid.cartesianToCartographic(car3Lt);
            const cartoRb = ellipsoid.cartesianToCartographic(car3Rb);
            extent.lonMin = Supermap.Math.toDegrees(cartoLt.longitude);
            extent.latMax = Supermap.Math.toDegrees(cartoLt.latitude);
            extent.lonMax = Supermap.Math.toDegrees(cartoRb.longitude);
            extent.latMin = Supermap.Math.toDegrees(cartoRb.latitude);
        }
        else if (!car3Lt && car3Rb) {
            let car3Lt2 = null;
            let yIndex = 0;
            do {
                yIndex <= canvas.height ? yIndex += 10 : canvas.height;
                car3Lt2 = this.camera.pickEllipsoid(new Supermap.Cartesian2(0, yIndex), ellipsoid);
            } while (!car3Lt2);
            const cartoLt2 = ellipsoid.cartesianToCartographic(car3Lt2);
            const cartoRb2 = ellipsoid.cartesianToCartographic(car3Rb);
            extent.lonMin = Supermap.Math.toDegrees(cartoLt2.longitude);
            extent.latMax = Supermap.Math.toDegrees(cartoLt2.latitude);
            extent.lonMax = Supermap.Math.toDegrees(cartoRb2.longitude);
            extent.latMin = Supermap.Math.toDegrees(cartoRb2.latitude);
        }
        extent.height = Math.ceil(this.camera.positionCartographic.height);
        return extent;
    }
    zoomTo(lon, lat, height) {
        const _hegith = height ?? this.getCameraHeight();
        this.camera.flyTo({
            destination: Supermap.Cartesian3.fromDegrees(lon, lat, _hegith),
            duration: 0,
        });
        return this;
    }
    zoomToExtent(west, south, east, north) {
        this.camera.flyTo({
            destination: Supermap.Rectangle.fromDegrees(west, south, east, north),
            duration: 0,
        });
        return this;
    }
}
