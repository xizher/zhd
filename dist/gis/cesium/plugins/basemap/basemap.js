import { ImageryLayer, UrlTemplateImageryProvider } from 'cesium';
import { baseUtils } from '../../../../js-utils';
import WebMapPlugin from '../../web-map/web-map-plugin';
/** 底图控制插件类 */
export class Basemap extends WebMapPlugin {
    //#endregion
    //#region 构造函数
    /**
     * 构建底图控制插件
     * @param options 配置项
     */
    constructor(options) {
        super('basemap');
        //#endregion
        //#region 私有对象
        /** 配置项 */
        this._options = {
            key: '彩色地图',
            visible: true
        };
        /** 底图项池 */
        this._basemapItemPool = new Map();
        /** 底图图层 */
        this._layerGroup = [];
        baseUtils.$extend(true, this._options, options);
        this._selectedKey = this._options.key;
        this._visible = this._options.visible;
    }
    //#endregion
    //#region getter
    get basemapList() {
        return [...this._basemapItemPool.keys()];
    }
    get selectedKey() {
        return this._selectedKey;
    }
    get visible() {
        return this._visible;
    }
    //#endregion
    //#region 私有方法
    /** 初始化 */
    _init() {
        this
            ._createTianDiTuItems()
            ._createGeoqItems()
            ._createGaoDeItems()
            .selectBasemap(this._selectedKey)
            .setVisible(this._visible);
    }
    /** 创建天地图底图项集合 */
    _createTianDiTuItems() {
        const createTianDiTuItem = (name) => {
            this.createCustomBasemap(`天地图${name}`, new UrlTemplateImageryProvider({
                url: Basemap._TianDiTuUrls[`${name}底图`]
            }));
            this.createCustomBasemap(`天地图${name}含注记`, [
                new UrlTemplateImageryProvider({ url: Basemap._TianDiTuUrls[`${name}注记`] }),
                new UrlTemplateImageryProvider({ url: Basemap._TianDiTuUrls[`${name}底图`] }),
            ]);
            return createTianDiTuItem;
        };
        createTianDiTuItem('影像')('矢量')('地形');
        return this;
    }
    /** 创建GeoQ底图项集合 */
    _createGeoqItems() {
        Object.entries(Basemap._GeoqUrls).forEach(([key, url]) => {
            const imageryProvider = new UrlTemplateImageryProvider({ url });
            this.createCustomBasemap(key, imageryProvider);
        });
        return this;
    }
    /** 创建高德底图项 */
    _createGaoDeItems() {
        const createGaoDeItem = (name) => {
            this.createCustomBasemap(`高德${name}`, new UrlTemplateImageryProvider({
                url: Basemap._GaoDeUrls[`${name}底图`]
            }));
            this.createCustomBasemap(`高德${name}含注记`, [
                new UrlTemplateImageryProvider({ url: Basemap._GaoDeUrls[`${name}注记`] }),
                new UrlTemplateImageryProvider({ url: Basemap._GaoDeUrls[`${name}底图`] }),
            ]);
            return createGaoDeItem;
        };
        createGaoDeItem('影像');
        return this;
    }
    //#endregion
    //#region 公有方法
    /** 安装插件 */
    installPlugin(webMap) {
        super.installPlugin(webMap);
        this._init();
        return this;
    }
    createCustomBasemap(key, imageryProviders) {
        const _imageryProviders = Array.isArray(imageryProviders) ? imageryProviders : [imageryProviders];
        this._basemapItemPool.set(key, _imageryProviders.map(item => new ImageryLayer(item), { $type: 'basemap-layer' }));
        return this;
    }
    //#endregion
    //#region 公有方法
    selectBasemap(key) {
        this._selectedKey = key;
        this._layerGroup.forEach(item => this.viewer.imageryLayers.remove(item, false));
        const layers = this._basemapItemPool.get(key);
        if (layers) {
            this._layerGroup = layers;
            this._layerGroup.forEach(item => this.viewer.imageryLayers.add(item, 0));
            this.fire('change:key', { key });
        }
        return this;
    }
    setVisible(visible) {
        this._visible = visible;
        [...this._basemapItemPool.values()].forEach(item => item.forEach(lyr => lyr.show = visible));
        this.fire('change:visible', { visible });
        return this;
    }
}
//#region 静态私有属性
/** 天地图秘钥 */
Basemap._TianDiTuKey = 'd524142425d379adcf285daba823e28a';
/** 天地图地址集合 */ // TODO 仅球面墨卡托投影3857，未兼容4326投影
Basemap._TianDiTuUrls = {
    '影像底图': `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${Basemap._TianDiTuKey}`,
    '影像注记': `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${Basemap._TianDiTuKey}`,
    '矢量底图': `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${Basemap._TianDiTuKey}`,
    '矢量注记': `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${Basemap._TianDiTuKey}`,
    '地形底图': `http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${Basemap._TianDiTuKey}`,
    '地形注记': `http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${Basemap._TianDiTuKey}`,
};
/** GEOQ地图地址集合 */
Basemap._GeoqUrls = {
    '彩色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
    '灰色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
    '蓝黑色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
    '暖色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
};
/** 高德地图地址集合 */
Basemap._GaoDeUrls = {
    '影像底图': 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    '影像注记': 'https://wprd02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8&ltype=11',
};
export default Basemap;
