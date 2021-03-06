import { baseUtils } from '../../../../js-utils/index';
import { createCollection } from '../../utilities/base.utilities';
import { createLayerGroup, createOSMLayer, createXYZLayer } from '../../utilities/layer.utilities';
import { WebMapPlugin } from '../../web-map/web-map-plugin';
/** 底图类 */
export class Basemap extends WebMapPlugin {
    //#endregion
    //#region 构造函数
    /**
     * 构造底图插件对象
     * @param options 配置项
     */
    constructor(options = {
        key: '彩色地图',
        visible: true
    }) {
        super('basemap');
        //#region 私有对象
        /** 天地图秘钥 */
        this._tianDiTuKey = 'd524142425d379adcf285daba823e28a';
        /** 天地图地址集合 */ // TODO 仅球面墨卡托投影3857，未兼容4326投影
        this._tianDiTuUrls = {
            '影像底图': `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this._tianDiTuKey}`,
            '影像注记': `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this._tianDiTuKey}`,
            '矢量底图': `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this._tianDiTuKey}`,
            '矢量注记': `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this._tianDiTuKey}`,
            '地形底图': `http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this._tianDiTuKey}`,
            '地形注记': `http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this._tianDiTuKey}`,
        };
        /** GEOQ地图地址集合 */
        this._geoqUrls = {
            '彩色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
            '灰色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
            '蓝黑色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
            '暖色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
        };
        /** */
        this._gaodeUrls = {
            '影像底图': 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            '影像注记': 'https://wprd02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8&ltype=11',
        };
        /** 配置项 */
        this._options = {
            key: '彩色地图',
            visible: true
        };
        /** 底图项池 */
        this._basemapItemPool = new Map();
        baseUtils.$extend(true, this._options, options);
        this._selectedKey = this._options.key;
        this._visible = this._options.visible;
    }
    //#endregion
    //#region getter
    get selectedKey() {
        return this._selectedKey;
    }
    get visible() {
        return this._visible;
    }
    get basemapItemList() {
        return [...this._basemapItemPool.keys()];
    }
    //#endregion
    //#region 私有方法
    /** 初始化 */
    _init() {
        this._layerGroup = createLayerGroup({ visible: this._visible });
        this.map.getLayers().insertAt(0, this._layerGroup);
        return this
            ._createTianDiTu()
            ._createGeoQDiTu()
            ._createHGaoDeDiTu()
            .createCustomBasemap('osm', createOSMLayer())
            .selectBasemap(this._selectedKey);
    }
    /** 创建天地图底图项 */
    _createTianDiTu() {
        const createTianDiTuItem = (name) => {
            this.createCustomBasemap(`天地图${name}`, createXYZLayer(this._tianDiTuUrls[`${name}底图`]));
            this.createCustomBasemap(`天地图${name}含注记`, [
                createXYZLayer(this._tianDiTuUrls[`${name}底图`]),
                createXYZLayer(this._tianDiTuUrls[`${name}注记`]),
            ]);
            return createTianDiTuItem;
        };
        createTianDiTuItem('影像')('矢量')('地形');
        return this;
    }
    /** 创建GeoQ底图项 */
    _createGeoQDiTu() {
        Object.entries(this._geoqUrls).forEach(([key, url]) => this._basemapItemPool.set(key.toLowerCase(), createCollection([createXYZLayer(url)])));
        return this;
    }
    /** 创建Gaode底图项 */
    _createHGaoDeDiTu() {
        this.createCustomBasemap(`高德影像`, createXYZLayer(this._gaodeUrls['影像底图']));
        this.createCustomBasemap(`高德影像含注记`, [
            createXYZLayer(this._gaodeUrls['影像底图']),
            createXYZLayer(this._gaodeUrls['影像注记']),
        ]);
        return this;
    }
    //#endregion
    //#region 公有方法
    /**
     * 安装插件
     * @param webMap WebMap对象
     */
    installPlugin(webMap) {
        super.installPlugin(webMap);
        this._init();
        return this;
    }
    /**
     * 选择底图项
     * @param key 底图项Key
     */
    selectBasemap(key) {
        if (this._basemapItemPool.has(key)) {
            this._layerGroup.setLayers(this._basemapItemPool.get(key));
            this._selectedKey = key;
            this.fire('change:key', { key });
        }
        return this;
    }
    /**
     * 设置底图可见性
     * @param visible 可见性
     */
    setVisible(visible) {
        this._visible = visible;
        this._layerGroup.setVisible(visible);
        this.fire('change:visible', { visible });
        return this;
    }
    /**
     * 创建自定义底图项
     * @param key 底图项Key
     * @param layers 图层
     */
    createCustomBasemap(key, layers) {
        const _layers = Array.isArray(layers) ? layers : [layers];
        this._basemapItemPool.set(key.toLowerCase(), createCollection(_layers));
        return this;
    }
    /**
     * 创建并选择自定义底图项
     * @param key 底图项Key
     * @param layers 图层
     */
    createCustomBasemapAndSelect(key, layers) {
        return this
            .createCustomBasemap(key, layers)
            .selectBasemap(key);
    }
}
