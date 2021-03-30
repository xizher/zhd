import { ImageryProvider } from 'cesium';
import WebMap from '../../web-map/web-map';
import WebMapPlugin from '../../web-map/web-map-plugin';
export interface IBasemapOptions {
    key: string;
    visible: boolean;
}
/** 底图控制插件类 */
export declare class Basemap extends WebMapPlugin<{
    'change:key': {
        key: string;
    };
    'change:visible': {
        visible: boolean;
    };
}> {
    /** 天地图秘钥 */
    private static _TianDiTuKey;
    /** 天地图地址集合 */ private static _TianDiTuUrls;
    /** GEOQ地图地址集合 */
    private static _GeoqUrls;
    /** 高德地图地址集合 */
    private static _GaoDeUrls;
    /** 配置项 */
    private _options;
    /** 底图项池 */
    private _basemapItemPool;
    /** 当前选中的底图项Key值 */
    private _selectedKey;
    /** 底图图层 */
    private _layerGroup;
    /** 底图可见性 */
    private _visible;
    get basemapList(): string[];
    get selectedKey(): string;
    get visible(): boolean;
    /**
     * 构建底图控制插件
     * @param options 配置项
     */
    constructor(options: IBasemapOptions);
    /** 初始化 */
    private _init;
    /** 创建天地图底图项集合 */
    private _createTianDiTuItems;
    /** 创建GeoQ底图项集合 */
    private _createGeoqItems;
    /** 创建高德底图项 */
    private _createGaoDeItems;
    /** 安装插件 */
    installPlugin(webMap: WebMap): this;
    createCustomBasemap(key: string, imageryProviders: ImageryProvider | ImageryProvider[]): this;
    selectBasemap(key: string): this;
    setVisible(visible: boolean): this;
}
export default Basemap;
