import { IObject } from '../../../../global/interfaces.global';
import Observer, { IObserverCallbackParams } from '../../../../observer/observer';
import { IViewer, IEntities } from '../../web-map/web-map';
export declare type OnToolActivedParams<T> = IObserverCallbackParams<'tool-actived', T>;
export declare type OnToolDeActivedParams<T> = IObserverCallbackParams<'tool-deactived', T>;
export declare type OnToolActivedReture = boolean;
export declare type OnToolDeActivedReture = boolean;
/** 基础工具类 */
export declare class BaseTool<T = IObject> extends Observer<T & {
    'tool-actived': void;
    'tool-deactived': void;
}> {
    /** 地图对象 */
    private _viewer;
    /** 视图对象 */
    private _entities;
    /** 是否为一次性工具 */
    private _isOnceTool;
    /** 工具是否为激活状态 */
    private _actived;
    get viewer(): IViewer;
    get entities(): IEntities;
    get isOnceTool(): boolean;
    get actived(): boolean;
    /**
     * 构造基础工具对象
     * @param viewer 地图对象
     * @param entities 视图对象
     * @param isOnceTool 是否为一次性工具，默认为否
     */
    constructor(viewer: IViewer, entities: IEntities, isOnceTool?: boolean);
    /** 激活工具 */
    active(): this;
    /** 接触工具激活状态 */
    deactive(): this;
    /** 工具激化处理事件 */
    onToolActived(e: OnToolActivedParams<this>): OnToolActivedReture;
    /** 工具失活处理事件 */
    onToolDeActived(e: OnToolDeActivedParams<this>): OnToolDeActivedReture;
}
export default BaseTool;
