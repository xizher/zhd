import { IObserverCallbackParams, Observer } from '../../../observer';
import { WebMap } from '../web-map/web-map';
export declare type OnToolResetParams<T> = IObserverCallbackParams<'tool-reset', T>;
export declare type OnToolExecutingParams<T> = IObserverCallbackParams<'tool-executing', T>;
export declare type OnToolDoneParams<T> = IObserverCallbackParams<'tool-done', T>;
export declare type OnToolErrorParams<T> = IObserverCallbackParams<'tool-error', T>;
export declare type OnToolResetReture = boolean;
export declare type OnToolExecutingReture = boolean;
export declare type OnToolDoneReture = boolean;
export declare type OnToolErrorReture = boolean;
/** 执行动作工具（弃用） */
export declare class BaseTool<T> extends Observer<T & {
    'tool-reset': void;
    'tool-executing': void;
    'tool-done': void;
    'tool-error': {
        message: string;
    };
}> {
    private _webMap;
    get webMap(): WebMap;
    /**
     * 构造执行动作工具对象
     * @param map 地图对象
     * @param view 视图对象
     */
    constructor(webMap: WebMap);
    /** 重置工具 */
    resetTool(): this;
    /** 执行工具 */
    execute(): this;
    doneTool(success: true): this;
    doneTool(success: false, errorMessage: string): this;
    /** 工具重置触发事件 */
    onToolReset(e: OnToolResetParams<this>): OnToolResetReture;
    /** 工具开始执行触发事件 */
    onToolExecuting(e: OnToolExecutingParams<this>): OnToolExecutingReture;
    /** 工具执行完成触发事件 */
    onToolDone(e: OnToolDoneParams<this>): OnToolDoneReture;
    /** 工具执行异常触发事件 */
    onToolError(e: OnToolErrorParams<this>): OnToolErrorReture;
}
