import { $Supermap } from '../init-modules/init-modules';
import Basemap from '../plugins/basemap/basemap';
import WebMapPlugin, { IPlugins } from './web-map-plugin';
import Map3dTile from '../plugins/map-3d-tile/map-3d-tile';
import { MapCamera } from '../plugins/map-camera/map-camera';
import { MapEntities } from '../plugins/map-entities/map-entities';
export interface IViewer extends $Supermap.__Viewer {
    $owner: WebMap;
}
export interface IEntities extends $Supermap.__EntityCollection {
    $owner: WebMap;
}
/** WebGIS应用程式类 */
export declare class WebMap implements IPlugins {
    basemap?: Basemap;
    map3dTile?: Map3dTile;
    mapCamera?: MapCamera;
    mapEntities?: MapEntities;
    /** 容器Id */
    private _container;
    /** 视图对象 */
    private _viewer;
    /** 实体对象 */
    private _entities;
    /** 配置项 */
    private _options;
    get viewer(): IViewer;
    get entities(): IEntities;
    /**
     * 构造WebGIS应用城市类
     * @param container 容器Id
     */
    constructor(container: string, options?: $Supermap.__Viewer.__ConstructorOptions);
    /** 初始化 */
    _init(): void;
    /**
     * 挂载插件
     * @param plugin WebMap插件对象
     */
    use<T>(plugin: WebMapPlugin<T>): this;
}
export default WebMap;
