import { IMap, IView } from '../../../../web-map/web-map';
import { DrawTool, OnDrawEndParams, OnDrawEndReture } from '../draw/draw-tool';
/** 拉框缩小工具类 */
export declare class ZoomOutRectTool extends DrawTool {
    /**
     * 构造拉框缩小工具对象
     * @param map 地图对象
     * @param view 视图对象
     */
    constructor(map: IMap, view: IView);
    /** 重写：绘图过程处理事件 */
    onDrawEnd(e: OnDrawEndParams<this>): OnDrawEndReture;
}
