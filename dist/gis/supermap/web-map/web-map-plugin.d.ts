import { Observer } from '../../../observer';
import Basemap from '../plugins/basemap/basemap';
import Map3dTile from '../plugins/map-3d-tile/map-3d-tile';
import { MapCamera } from '../plugins/map-camera/map-camera';
import { MapEntities } from '../plugins/map-entities/map-entities';
import MapTools from '../plugins/map-tools/map-tools';
import { ICamera, IEntities, IViewer, WebMap } from './web-map';
export interface IPlugins {
    basemap?: Basemap;
    map3dTile?: Map3dTile;
    mapEntities?: MapEntities;
    mapCamera?: MapCamera;
    mapTools?: MapTools;
}
/** WebMap插件类 */
export declare class WebMapPlugin<T> extends Observer<T> {
    /** 视图对象 */
    private _viewer;
    /** 实体对象 */
    private _entities;
    private _camera;
    /** 插件名 */
    private _pluginName;
    get viewer(): IViewer;
    get entities(): IEntities;
    get camera(): ICamera;
    get pluginName(): string;
    /**
     * 构造WebMap插件
     * @param pluginName 插件名
     */
    constructor(pluginName: string);
    /**
     * 安装WebMap插件
     * @param webMap WebMap对象
     */
    installPlugin(webMap: WebMap): this;
}
export default WebMapPlugin;
