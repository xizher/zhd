import { Observer } from '../../../observer';
/** WebMap插件类 */
export class WebMapPlugin extends Observer {
    //#endregion
    //#region 构造函数
    /**
     * 构造WebMap插件
     * @param pluginName 插件名
     */
    constructor(pluginName) {
        super();
        this._pluginName = pluginName;
    }
    //#endregion
    //#region getter
    get viewer() {
        return this._viewer;
    }
    get entities() {
        return this._entities;
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
        this._viewer = webMap.viewer;
        this._entities = webMap.entities;
        return this;
    }
}
