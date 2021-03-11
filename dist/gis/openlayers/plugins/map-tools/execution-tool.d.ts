import { IObject } from '../../../../global/interfaces.global';
import { IObserverCallbackParams } from '../../../../observer';
import { IMap, IView } from '../../web-map/web-map';
import { BaseTool } from './base-tool';
export declare type OnToolResetParams<T> = IObserverCallbackParams<'tool-reset', T>;
export declare type OnToolExecutingParams<T> = IObserverCallbackParams<'tool-executing', T>;
export declare type OnToolDoneParams<T> = IObserverCallbackParams<'tool-done', T>;
export declare type OnToolResetReture = boolean;
export declare type OnToolExecutingReture = boolean;
export declare type OnToolDoneReture = boolean;
/** 执行动作工具（弃用） */
export declare class ExcutionTool<T = IObject> extends BaseTool<T & {
    'tool-reset': void;
    'tool-executing': void;
    'tool-done': void;
}> {
    /**
     * 构造执行动作工具对象
     * @param map 地图对象
     * @param view 视图对象
     */
    constructor(map: IMap, view: IView);
    /** 重置工具 */
    resetTool(): this;
    /** 执行工具 */
    executeTool(): this;
    /** 完成执行工具 */
    doneTool(): this;
    /** 工具重置触发事件 */
    onToolReset(e: OnToolResetParams<this>): OnToolResetReture;
    /** 工具开始执行触发事件 */
    onToolExecuting(e: OnToolExecutingParams<this>): OnToolExecutingReture;
    /** 工具执行完成触发事件 */
    onToolDone(e: OnToolDoneParams<this>): OnToolDoneReture;
}
