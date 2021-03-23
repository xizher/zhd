import { $Supermap } from '../../init-modules/init-modules';
import WebMap from '../../web-map/web-map';
import WebMapPlugin from '../../web-map/web-map-plugin';
export interface ITilesetItem {
    name?: string;
    url?: string;
    offsetHeight?: number;
}
export interface IMap3dTileOptions {
    tilesetItems: ITilesetItem[];
    zoomItemName?: string;
}
/** 插件：3dTile工具类 */
export declare class Map3dTile extends WebMapPlugin<{
    'change:visible': {
        tilesetName: string;
        tileset: $Supermap.__Cesium3DTileset;
        visible: boolean;
    };
}> {
    private _tilesetPool;
    /** 配置项 */
    private _options;
    get tilesetNames(): string[];
    constructor(options: IMap3dTileOptions);
    private _init;
    private _createTileset;
    /** 安装插件 */
    installPlugin(webMap: WebMap): this;
    /**
     * 获取tileset通过名称方式
     * @param name tileset名称
     */
    getTilesetByName(name: string): $Supermap.__Cesium3DTileset | null;
    /**
     * 设置tileset可见性
     * @param name tileset名称
     * @param visible tileset可见性
     */
    setTilesetVisible(name: string, visible: boolean): this;
    /**
     * 缩放至指定tileset
     * @param name tileset名称
     */
    zoomToTileset(name: string): this;
    static setTilesetOffsetHeight(tileset: $Supermap.__Cesium3DTileset, height: number): void;
}
export default Map3dTile;
