import Layer from 'ol/layer/Layer';
import { OgcServerString } from '../../../../global/types.global';
import { WebMap } from '../../web-map/web-map';
import { WebMapPlugin } from '../../web-map/web-map-plugin';
import { Extent } from 'ol/extent';
import { IObject } from '../../../../global/interfaces.global';
export interface ILayerItemOptions {
    name?: string;
    type?: OgcServerString;
    url?: string;
    params?: IObject;
}
export interface ILayerOperationOptions {
    layerItems?: ILayerItemOptions[];
}
/** 插件：图层控制类 */
export declare class LayerOperation extends WebMapPlugin<{}> {
    /** 配置项 */
    private _options;
    /** 图层池 */
    private _layerPool;
    /** 图层组 */
    private _layerGroup;
    /** 构造图层控制对象 */
    constructor(options: ILayerOperationOptions);
    /** 初始化 */
    private _init;
    /**
     * 创建图层
     * @param layerItemOptions 配置项
     */
    private _initLayer;
    /** 初始化WFS图层 */
    private _initWfsLayer;
    /** 初始化WMS图层 */
    private _initWmsLayer;
    /** 获取指定图层范围 */
    private _getLayerExtent;
    /** 安装插件 */
    installPlugin(webMap: WebMap): this;
    /** 获取所有图层的综合范围 */
    getFullExtent(): Extent | null;
    /** 通过图层名获取图层对象 */
    getLayerByName(name: string): Layer;
}
