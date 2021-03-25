import { Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
import { WebMap } from '../../web-map/web-map';
import { BaseTool, OnToolDoneParams, OnToolDoneReture, OnToolExecutingParams, OnToolExecutingReture, OnToolResetParams, OnToolResetReture } from '../base.tool';
/** 交集工具类 */
export declare class IntersectsTool extends BaseTool<{}> {
    /** 裁剪对象 */
    private _features;
    /** 裁剪区域对象 */
    private _instersectsGeom;
    /** 裁剪结果 */
    private _resultFeatures;
    setTarget(features: Feature[]): this;
    setIntersectsGeometry(geometry: Geometry): this;
    getResult(): Feature[];
    clearResult(): this;
    /**
     * 构造裁剪工具对象
     * @param webMap WebMap
     */
    constructor(webMap: WebMap);
    /** 工具执行时触发事件 */
    onToolExecuting(e: OnToolExecutingParams<this>): OnToolExecutingReture;
    /** 工具执行完成触发事件 */
    onToolDone(e: OnToolDoneParams<this>): OnToolDoneReture;
    onToolReset(e: OnToolResetParams<this>): OnToolResetReture;
}
