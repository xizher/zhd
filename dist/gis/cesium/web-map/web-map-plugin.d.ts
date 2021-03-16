import { Observer } from '../../../observer';
import { IViewer, WebMap } from './web-map';
export interface IPlugins {
    t: void;
}
/** WebMap插件类 */
export declare class WebMapPlugin<T> extends Observer<T> {
    /** 视图对象 */
    private _viewer;
    /** 插件名 */
    private _pluginName;
    get viewer(): IViewer;
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
