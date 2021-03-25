import { Observer } from '../../../observer/observer';
import { IMap, IView, WebMap } from './web-map';
/** WebMap插件类 */
export declare class WebMapPlugin<T> extends Observer<T> {
    /** 地图对象 */
    private _map;
    /** 视图对象 */
    private _view;
    /** 插件名 */
    private _pluginName;
    get map(): IMap;
    get view(): IView;
    get pluginName(): string;
    /**
     * 构造WebMap插件对象
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
