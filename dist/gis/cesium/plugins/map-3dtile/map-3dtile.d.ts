import { Cesium3DTileset } from 'cesium';
import WebMap from '../../web-map/web-map';
import WebMapPlugin from '../../web-map/web-map-plugin';
export interface I3dTileItemOptions {
    name: string;
    url: string;
    offsetHeight: number;
}
export interface IMap3dTileOptions {
    tilesetItems: I3dTileItemOptions[];
    defaultZoomItemName?: string;
}
/** 地图三维模型控制插件 */
export declare class Map3dTile extends WebMapPlugin<{
    'change:visible': {
        tileset: Cesium3DTileset;
        visible: boolean;
    };
}> {
    /** 配置项 */
    private _options;
    /** 模型池 */
    private _tilesetPool;
    get tilesetNames(): string[];
    constructor(options: IMap3dTileOptions);
    /** 初始化 */
    private _init;
    /** 创建模型数据集 */
    private _createTileset;
    /** 重写插件安装方法 */
    installPlugin(webMap: WebMap): this;
    /**
     * 获取模型对象（通过名称检索方式）
     * @param name 模型名
     */
    getTilesetByName(name: string): Cesium3DTileset | null;
    /**
     * 缩放至模型
     * @param name 模型名称
     */
    zoomToTileset(name: string): this;
    /**
     * 缩放至模型
     * @param tileset 模型对象
     */
    zoomToTileset(tileset: Cesium3DTileset): this;
    /**
     * 设置模型可见性
     * @param name 模型名
     * @param visible 可见性
     */
    setTilesetVisible(name: string, visible: boolean): this;
    /**
     * 设置模型可见性
     * @param tileset 模型对象
     * @param visible 可见性
     */
    setTilesetVisible(tileset: Cesium3DTileset, visible: boolean): this;
    /**
     * 设置模型透明度
     * @param name 模型名称
     * @param opacity 模型不可透明度
     */
    setTilesetOpacity(name: string, opacity: number): this;
    /**
     * 设置模型透明度
     * @param tileset 模型对象
     * @param opacity 模型不可透明度
     */
    setTilesetOpacity(tileset: Cesium3DTileset, opacity: number): this;
    /**
     * 设置模型偏移高度
     * @param tileset 模型
     * @param height 模型偏移高度
     */
    static SetTilesetOffsetHeight(tileset: Cesium3DTileset, height: number): void;
}
export default Map3dTile;
