import { IEntities, IViewer } from '../../../../web-map/web-map';
import BaseTool, { OnToolActivedParams, OnToolActivedReture, OnToolDeActivedParams, OnToolDeActivedReture } from '../../base-tool';
export declare enum ClampModeType {
    Space = 0,
    Ground = 1
}
export declare type MeasureType = 'distance' | 'area' | 'height';
/** 测量工具 */
export declare class MeasureTool extends BaseTool<{
    'change:type': {
        type: MeasureType;
    };
    'change:mode': {
        mode: ClampModeType;
    };
}> {
    /** 量算方式 */
    private _clampMode;
    /** 测量类型 */
    private _measureType;
    private _distanceHandler;
    private _areaHandler;
    private _heightHandler;
    get measureType(): MeasureType;
    get clampMode(): ClampModeType;
    /** 构造测量工具对象 */
    constructor(viewer: IViewer, entities: IEntities);
    private _init;
    private _initDistanceHandler;
    private _initAreaHandler;
    private _initHeightHandler;
    private _deactiveAllHandler;
    private _clearMeasureResult;
    private _updateClampMode;
    private _activeMeasure;
    /** 设置量算方式 */
    setClampMode(mode: ClampModeType): this;
    /** 设置测量类型 */
    setMeasureType(type: MeasureType): this;
    /** 清理测量结果 */
    clearMeasureResult(): this;
    onToolActived(e: OnToolActivedParams<this>): OnToolActivedReture;
    onToolDeActived(e: OnToolDeActivedParams<this>): OnToolDeActivedReture;
}
export default MeasureTool;
