import { Viewer, EntityCollection } from 'cesium';
import Basemap from '../plugins/basemap/basemap';
import WebMapPlugin, { IPlugins } from './web-map-plugin';
export interface IViewer extends Viewer {
    $owner: WebMap;
}
export interface IEntities extends EntityCollection {
    $owner: WebMap;
}
/** WebGIS应用程式类 */
export declare class WebMap implements IPlugins {
    basemap?: Basemap;
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
    constructor(container: string, options?: Viewer.ConstructorOptions);
    /** 初始化 */
    private _init;
    /**
     * 挂载插件
     * @param plugin WebMap插件对象
     */
    use<T>(plugin: WebMapPlugin<T>): this;
}
export default WebMap;
