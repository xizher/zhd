import { Supermap } from '../init-modules/init-modules';
import { baseUtils } from '../../../js-utils';
/** WebGIS应用程式类 */
export class WebMap {
    //#endregion
    //#region 构造函数
    /**
     * 构造WebGIS应用城市类
     * @param container 容器Id
     */
    constructor(container, options = {}) {
        /** 配置项 */
        this._options = {
            animation: false,
            infoBox: false,
            timeline: false,
            baseLayerPicker: false,
            fullscreenButton: false,
            vrButton: false,
            homeButton: false,
            navigationHelpButton: false,
            navigationInstructionsInitiallyVisible: false,
            geocoder: false,
            sceneModePicker: false,
            selectionIndicator: false,
            creditContainer: 'credit-container',
            mapProjection: new Supermap.GeographicProjection()
            // imageryProvider: new UrlTemplateImageryProvider({
            //   url : 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}'
            // })
        };
        this._container = container;
        baseUtils.$extend(true, this._options, options);
        this._init();
    }
    //#endregion
    //#region getter
    get viewer() {
        return this._viewer;
    }
    get entities() {
        return this._entities;
    }
    get camera() {
        return this._camera;
    }
    //#endregion
    //#region 私有方法
    /** 初始化 */
    _init() {
        const div = document.createElement('div');
        div.setAttribute('id', this._options.creditContainer);
        div.style.display = 'none';
        document.body.append(div);
        this._viewer = Object.assign(new Supermap.Viewer(this._container, this._options), { $owner: this });
        this._viewer.imageryLayers.removeAll();
        this._viewer.scene.globe.baseColor = new Supermap.Color(0, 0, 0, 0);
        this._entities = Object.assign(this._viewer.entities, { $owner: this });
        this._camera = Object.assign(this._viewer.camera, { $owner: this });
    }
    //#endregion
    //#region 公有方法
    /**
     * 挂载插件
     * @param plugin WebMap插件对象
     */
    use(plugin) {
        this[plugin.pluginName] = plugin.installPlugin(this);
        return this;
    }
}
export default WebMap;
