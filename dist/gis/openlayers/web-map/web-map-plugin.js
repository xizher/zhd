import { Observer } from '../../../observer/observer';
/** WebMap插件类 */
export class WebMapPlugin extends Observer {
    //#endregion
    //#region 构造函数
    /**
     * 构造WebMap插件对象
     * @param pluginName 插件名
     */
    constructor(pluginName) {
        super();
        this._pluginName = pluginName;
    }
    //#endregion
    //#region getter
    get map() {
        return this._map;
    }
    get view() {
        return this._view;
    }
    get pluginName() {
        return this._pluginName;
    }
    //#endregion
    //#region 公有方法
    /**
     * 安装WebMap插件
     * @param webMap WebMap对象
     */
    installPlugin(webMap) {
        this._map = webMap.map;
        this._view = webMap.view;
        return this;
    }
}
