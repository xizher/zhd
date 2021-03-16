import { Viewer } from 'cesium';
import { WebMapPlugin } from './web-map-plugin';
export interface IViewer extends Viewer {
    $owner: WebMap;
}
/** WebGIS应用程式类 */
export declare class WebMap {
    /** 容器Id */
    private _container;
    /** 视图对象 */
    private _viewer;
    /** 配置项 */
    private _options;
    get viewer(): IViewer;
    /**
     * 构造WebGIS应用城市类
     * @param container 容器Id
     */
    constructor(container: string, options?: Viewer.ConstructorOptions);
    /** 初始化 */
    _init(): void;
    /**
     * 挂载插件
     * @param plugin WebMap插件对象
     */
    use<T>(plugin: WebMapPlugin<T>): this;
}
