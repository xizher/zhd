import { Cartesian3, Cartographic, Matrix4, Cesium3DTileset, Cesium3DTileStyle, } from 'cesium';
import { baseUtils } from '../../../../js-utils';
import WebMapPlugin from '../../web-map/web-map-plugin';
/** 地图三维模型控制插件 */
export class Map3dTile extends WebMapPlugin {
    //#endregion
    //#region 构造函数
    constructor(options) {
        super('map3dTile');
        //#region 私有属性
        /** 配置项 */
        this._options = {
            tilesetItems: []
        };
        /** 模型池 */
        this._tilesetPool = new Map();
        baseUtils.$extend(true, this._options, options);
    }
    //#endregion
    //#region getter
    get tilesetNames() {
        return [...this._tilesetPool.keys()];
    }
    //#endregion
    //#region 私有方法
    /** 初始化 */
    _init() {
        this._options.tilesetItems.forEach(item => this._createTileset(item));
    }
    /** 创建模型数据集 */
    _createTileset(tileItemOptions) {
        const { name, url, offsetHeight } = tileItemOptions;
        const tileset = new Cesium3DTileset({ url });
        tileset.readyPromise.then(() => {
            offsetHeight ?? Map3dTile.SetTilesetOffsetHeight(tileset, offsetHeight);
            this.viewer.scene.primitives.add(tileset);
            if (name === this._options.defaultZoomItemName) {
                this.zoomToTileset(tileset);
            }
        });
        this._tilesetPool.set(name, [tileset, tileItemOptions]);
        return this;
    }
    //#endregion
    //#region 公有方法
    /** 重写插件安装方法 */
    installPlugin(webMap) {
        super.installPlugin(webMap);
        this._init();
        return this;
    }
    /**
     * 获取模型对象（通过名称检索方式）
     * @param name 模型名
     */
    getTilesetByName(name) {
        if (!this._tilesetPool.has(name)) {
            return null;
        }
        return this._tilesetPool.get(name)[0];
    }
    /** 缩放至模型 */
    zoomToTileset(...args) {
        let tileset = args[0];
        if (typeof tileset === 'string') {
            tileset = this.getTilesetByName(tileset);
        }
        tileset && this.viewer.flyTo(tileset, { duration: .5, offset: {
                heading: 0, pitch: -90, range: 0
            } });
        return this;
    }
    /** 设置模型可见性 */
    setTilesetVisible(arg0, visible) {
        let tileset = arg0;
        if (typeof tileset === 'string') {
            tileset = this.getTilesetByName(tileset);
        }
        if (tileset) {
            tileset.show = visible;
            this.fire('change:visible', { tileset, visible });
        }
        return this;
    }
    /** 设置模型透明度 */
    setTilesetOpacity(arg0, opacity) {
        let tileset = arg0;
        if (typeof tileset === 'string') {
            tileset = this.getTilesetByName(tileset);
        }
        tileset.style = new Cesium3DTileStyle({
            color: `color('rgba(255, 255, 255, ${opacity})')`
        });
        return this;
    }
    //#endregion
    //#region 静态公有方法
    /**
     * 设置模型偏移高度
     * @param tileset 模型
     * @param height 模型偏移高度
     */
    static SetTilesetOffsetHeight(tileset, height) {
        const cartographic = Cartographic.fromCartesian(tileset.boundingSphere.center);
        const surface = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        const offset = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height);
        const translation = Cartesian3.subtract(offset, surface, new Cartesian3());
        tileset.modelMatrix = Matrix4.fromTranslation(translation);
    }
}
export default Map3dTile;
