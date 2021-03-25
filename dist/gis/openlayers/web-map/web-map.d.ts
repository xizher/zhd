import OLMap from 'ol/Map';
import { MapOptions } from 'ol/PluggableMap';
import View, { ViewOptions } from 'ol/View';
import { Observer } from '../../../observer/observer';
import Basemap from '../plugins/basemap/basemap';
import LayerOperation from '../plugins/layer-operation/layer-operation';
import MapCursor from '../plugins/map-cursor/map-cursor';
import MapElementDisplay from '../plugins/map-element-display/map-element-display';
import MapTools from '../plugins/map-tools/map-tools';
import WebMapPlugin from './web-map-plugin';
/** 地图接口 */
export interface IMap extends OLMap {
    $owner: WebMap;
}
/** 视图接口 */
export interface IView extends View {
    $owner: WebMap;
}
/** WebMap配置项接口 */
export interface IWebMapOptions {
    mapOptions?: MapOptions;
    viewOptions?: ViewOptions;
}
/** WebMap类 */
export declare class WebMap extends Observer<{
    'loaded': void;
}> {
    basemap?: Basemap;
    mapCursor?: MapCursor;
    mapTools?: MapTools;
    mapElementDisplay?: MapElementDisplay;
    layerOperation?: LayerOperation;
    /** 目标容器ID */
    private _targetDiv;
    /** 地图对象 */
    private _map;
    /** 视图对象 */
    private _view;
    /** 配置项 */
    private _options;
    get targetDiv(): string;
    get map(): IMap;
    get view(): IView;
    /**
     * 构造WebMap对象
     * @param targetDiv 地图容器ID
     * @param options 配置项
     */
    constructor(targetDiv: string, options?: IWebMapOptions);
    /** 初始化 */
    private _init;
    /**
     * 挂载插件
     * @param plugin WebMap插件对象
     */
    use<T>(plugin: WebMapPlugin<T>): WebMap;
    /**
     * 挂载WebMap
     */
    mount(): WebMap;
}
export default WebMap;
