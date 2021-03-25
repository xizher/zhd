import WebMap from '../../web-map/web-map';
import WebMapPlugin from '../../web-map/web-map-plugin';
export declare type DataSourceItemType = 'geojson';
export interface IDataSourceItem {
    type: DataSourceItemType;
    url: string;
    clampToGround: boolean;
}
export interface IMapDataSourceOptions {
    dataSourceItems?: IDataSourceItem[];
}
/** 插件：地图数据源控制类 */
export declare class MapDataSource extends WebMapPlugin<{}> {
    private _options;
    /** 构造地图数据源控制对象 */
    constructor(options?: IMapDataSourceOptions);
    private _init;
    installPlugin(webMap: WebMap): this;
}
export default MapDataSource;
