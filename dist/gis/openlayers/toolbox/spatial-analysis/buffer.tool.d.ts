import Geometry from 'ol/geom/Geometry';
import { UnitString } from '../../../../global/types.global';
import { WebMap } from '../../web-map/web-map';
import { BaseTool, OnToolDoneReture, OnToolDoneParams, OnToolResetParams, OnToolResetReture } from '../base.tool';
export interface IBufferToolOptions {
    distance: number;
    unit: UnitString;
    isDissolve: boolean;
}
export declare class BufferTool<T> extends BaseTool<T & {
    'change:buffer-targets': {
        geometries: Geometry[];
    };
    'change:buffer-options': {
        options: IBufferToolOptions;
    };
}> {
    /** 缓冲目标 */
    private _geometries;
    /** 缓冲结果 */
    private _bufferResult;
    /** 缓冲配置项 */
    private _options;
    /**
     * 构造缓冲区对象
     * @param webMap WebMap
     */
    constructor(webMap: WebMap);
    /** 工具重置触发事件 */
    onToolReset(e: OnToolResetParams<this>): OnToolResetReture;
    /** 工具执行完成触发事件 */
    onToolDone(e: OnToolDoneParams<this>): OnToolDoneReture;
}
