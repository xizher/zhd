import { Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
import { WebMap } from '../../web-map/web-map';
import { BaseTool, OnToolDoneParams, OnToolDoneReture, OnToolExecutingParams, OnToolExecutingReture } from '../base.tool';
/** 裁剪工具类 */
export declare class ClipTool extends BaseTool<{}> {
    /** 裁剪对象 */
    private _features;
    /** 裁剪区域对象 */
    private _clipGeom;
    /** 裁剪结果 */
    private _resultFeatures;
    setTarget(features: Feature[]): this;
    setClipGeometry(geometry: Geometry): this;
    /**
     * 构造裁剪工具对象
     * @param webMap WebMap
     */
    constructor(webMap: WebMap);
    /** 工具执行时触发事件 */
    onToolExecuting(e: OnToolExecutingParams<this>): OnToolExecutingReture;
    /** 工具执行完成触发事件 */
    onToolDone(e: OnToolDoneParams<this>): OnToolDoneReture;
}
