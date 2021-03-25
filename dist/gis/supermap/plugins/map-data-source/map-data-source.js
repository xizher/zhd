import { baseUtils } from '../../../../js-utils';
import WebMapPlugin from '../../web-map/web-map-plugin';
import { toWgs84 } from '@turf/turf';
import { Supermap } from '../../init-modules/init-modules';
/** 插件：地图数据源控制类 */
export class MapDataSource extends WebMapPlugin {
    //#endregion
    //#region 构造函数
    /** 构造地图数据源控制对象 */
    constructor(options = {}) {
        super('mapDataSource');
        //#region 私有属性
        this._options = {
            dataSourceItems: []
        };
        baseUtils.$extend(true, this._options, options);
    }
    //#endregion
    //#region 私有方法
    _init() {
        Supermap.GeoJsonDataSource.crsNames['urn:ogc:def:crs:EPSG::3857'] = Supermap.GeoJsonDataSource.crsNames['EPSG:3857'] = coordinates => {
            const _coordinates = toWgs84(coordinates);
            return Supermap.Cartesian3.fromDegrees(_coordinates[0], _coordinates[1], 0);
        };
        this._options.dataSourceItems.forEach(item => {
            switch (item.type) {
                case 'geojson':
                    this.viewer.dataSources.add(Supermap.GeoJsonDataSource.load(item.url, {
                        clampToGround: item.clampToGround
                    }));
                    break;
                default:
                    break;
            }
        });
    }
    //#endregion
    //#region 公有方法
    installPlugin(webMap) {
        super.installPlugin(webMap);
        this._init();
        return this;
    }
}
export default MapDataSource;
