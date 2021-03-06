import BaseLayer from 'ol/layer/Base';
import WebMap from '../../web-map/web-map';
import WebMapPlugin from '../../web-map/web-map-plugin';
export interface IBasemapOptions {
    key?: string;
    visible?: boolean;
}
/** 底图类 */
export declare class Basemap extends WebMapPlugin<{
    'change:key': {
        key: string;
    };
    'change:visible': {
        visible: boolean;
    };
}> {
    /** 天地图秘钥 */
    private _tianDiTuKey;
    /** 天地图地址集合 */ private _tianDiTuUrls;
    /** GEOQ地图地址集合 */
    private _geoqUrls;
    /** 高德地图地址集合 */
    private _gaodeUrls;
    /** 配置项 */
    private _options;
    /** 底图项池 */
    private _basemapItemPool;
    /** 当前选中的底图项Key值 */
    private _selectedKey;
    /** 底图图层容器组 */
    private _layerGroup;
    /** 底图可见性 */
    private _visible;
    get selectedKey(): string;
    get visible(): boolean;
    get basemapItemList(): string[];
    /**
     * 构造底图插件对象
     * @param options 配置项
     */
    constructor(options?: IBasemapOptions);
    /** 初始化 */
    private _init;
    /** 创建天地图底图项 */
    private _createTianDiTu;
    /** 创建GeoQ底图项 */
    private _createGeoQDiTu;
    /** 创建Gaode底图项 */
    private _createHGaoDeDiTu;
    /** 重新设置底图图层位置 */
    reSortLayers(): this;
    /**
     * 安装插件
     * @param webMap WebMap对象
     */
    installPlugin(webMap: WebMap): this;
    /**
     * 选择底图项
     * @param key 底图项Key
     */
    selectBasemap(key: string): this;
    /**
     * 设置底图可见性
     * @param visible 可见性
     */
    setVisible(visible: boolean): this;
    /**
     * 创建自定义底图项
     * @param key 底图项Key
     * @param layers 图层
     */
    createCustomBasemap(key: string, layers: BaseLayer | BaseLayer[]): this;
    /**
     * 创建并选择自定义底图项
     * @param key 底图项Key
     * @param layers 图层
     */
    createCustomBasemapAndSelect(key: string, layers: BaseLayer | BaseLayer[]): this;
    /** 异常：无对应Key值底图项 */
    private _NoKeyInBasemapItemsException;
}
export default Basemap;
