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
export interface ILayerItem {
    id: string;
    name: string;
    target: Layer;
    visible: boolean;
    opacity: number;
    level: number;
    type: OgcServerString;
}
/** 插件：图层控制类 */
export declare class LayerOperation extends WebMapPlugin<{
    'change:visible': {
        layerName: string;
        layer: Layer;
        visible: boolean;
    };
    'change:opacity': {
        layerName: string;
        layer: Layer;
        opacity: number;
    };
    'change:level': {
        layerName: string;
        layer: Layer;
        level: number;
    };
}> {
    /** 配置项 */
    private _options;
    /** 图层池 */
    private _layerPool;
    /** 图层组 */
    private _layerGroup;
    get layerPool(): Map<string, ILayerItem>;
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
    /**
     * 获取图层层级
     * @param layer 图层对象
     */
    private _getLayerLevel;
    /** 安装插件 */
    installPlugin(webMap: WebMap): this;
    /** 获取所有图层的综合范围 */
    getFullExtent(): Extent | null;
    /** 通过图层名获取图层对象 */
    getLayerByName(name: string): Layer;
    /**
     * 设置图层可见性
     * @param name 图层名
     * @param visible 图层可见性，默认true
     */
    setLayerVisible(name: string, visible?: boolean): this;
    /**
     * 设置图层透明度
     * @param name 图层名
     * @param opacity 不可透明度
     */
    setLayerOpacity(name: string, opacity: number): this;
    setLayerLevel(name: string, level: number): this;
}
