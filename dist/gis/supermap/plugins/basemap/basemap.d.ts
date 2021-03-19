import { $Supermap } from '../../init-modules/init-modules';
import { WebMap } from '../../web-map/web-map';
import { WebMapPlugin } from '../../web-map/web-map-plugin';
export interface IBasemapOptions {
    key: string;
    visible: boolean;
}
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
    /** 安装插件 */
    installPlugin(webMap: WebMap): this;
    createCustomBasemap(key: string, imageryProviders: $Supermap.__ImageryProvider | $Supermap.__ImageryProvider[]): this;
    selectBasemap(key: string): this;
    setVisible(visible: boolean): this;
}
export default Basemap;
