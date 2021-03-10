import { createCircle, createLineString, createPoint, createPolygon } from '../../../../utilities/geom.utilities';
import { BaseTool } from '../../base-tool';
import { Drawer } from './drawer';
import { ext } from '../../../../../../js-exts';
import { distanceByTwoPoint } from '../../../../../spatial-analysis/base.sa';
/** 绘图工具 */
export class DrawTool extends BaseTool {
    //#endregion
    //#region 构造函数
    /**
     * 构造绘图工具对象
     * @param map 地图对象
     * @param view 视图对象
     * @param drawType 绘图类型
     * @param cursorType 鼠标类型
     */
    constructor(map, view, drawType, cursorType = 'draw') {
        super(map, view, false);
        this._drawer = new Drawer(map.$owner.mapElementDisplay);
        this._drawType = drawType;
        this._cursorType = cursorType;
        this.on('draw-start', e => this.onDrawStart(e));
        this.on('draw-move', e => this.onDrawMove(e));
        this.on('draw-end', e => this.onDrawEnd(e));
        this.on('draw-clear', e => this.onDrawClear(e));
    }
    //#endregion
    //#region getter
    get drawer() {
        return this._drawer;
    }
    //#endregion
    //#region 公有方法
    /** 清理绘制图形 */
    clearDrawed() {
        this.fire('draw-clear');
        return this;
    }
    /** 绘图开始处理事件 */
    onDrawStart(e) {
        if (!this.actived) {
            return false;
        }
        return e.coordinate;
    }
    /** 绘图过程处理事件 */
    onDrawMove(e) {
        if (!this.actived) {
            return false;
        }
        const features = this._drawer.setTemp(e.geometry, true);
        return features;
    }
    /** 绘图结束处理事件 */
    onDrawEnd(e) {
        if (!this.actived) {
            return false;
        }
        const features = this._drawer.add(e.geometry, {}, true);
        return features;
    }
    /** 绘图清除处理事件 */
    onDrawClear(e) {
        this._drawer.clear();
        if (!this.actived) {
            return false;
        }
        return true;
    }
    /** 重写：工具激化处理事件 */
    onToolActived(e) {
        if (!super.onToolActived(e)) {
            return false;
        }
        this.map.$owner.mapCursor.setMapCursor(this._cursorType);
        DrawTool[`_${this._drawType}`](this);
        return true;
    }
    /** 重写：工具失活处理事件 */
    onToolDeActived(e) {
        if (!super.onToolDeActived(e)) {
            return false;
        }
        this.map.$owner.mapCursor.setMapCursor('default');
        DrawTool._clearDrawHandlers();
        return true;
    }
    //#endregion
    //#region 私有静态方法
    /** 清理绘制动作响应事件 */
    static _clearDrawHandlers() {
        Object.entries(this._handlerPool).forEach(([key, item]) => {
            if (item) {
                item.remove();
                this._handlerPool[key] = null;
            }
        });
        return this;
    }
    /** 绘制点 */
    static _point(drawTool) {
        this._clearDrawHandlers();
        const handler = drawTool.map.on('singleclick', ({ coordinate }) => {
            const geometry = createPoint(coordinate);
            drawTool.fire('draw-start', { coordinate });
            drawTool.fire('draw-end', { geometry });
        });
        const remove = () => drawTool.map.un('singleclick', handler.listener);
        this._handlerPool['singleclick'] = { remove };
    }
    /** 绘制直线段 */
    static '_line'(drawTool) {
        this._clearDrawHandlers();
        let drawing = false, startCoordinate = null;
        const handlerStartAndEnd = drawTool.map.on('singleclick', ({ coordinate }) => {
            if (drawing) {
                drawing = false;
                const geometry = createLineString([startCoordinate, coordinate]);
                startCoordinate = null;
                drawTool.fire('draw-end', { geometry });
            }
            else {
                drawing = true;
                startCoordinate = coordinate;
                drawTool.fire('draw-start', { coordinate });
            }
        });
        const handlerMove = drawTool.map.on('pointermove', e => {
            if (drawing && startCoordinate) {
                const geometry = createLineString([startCoordinate, e.coordinate]);
                drawTool.fire('draw-move', { geometry });
            }
        });
        {
            const remove = () => drawTool.map.un('singleclick', handlerStartAndEnd.listener);
            this._handlerPool['singleclick'] = { remove };
        }
        {
            const remove = () => drawTool.map.un('pointermove', handlerMove.listener);
            this._handlerPool['pointermove'] = { remove };
        }
    }
    /** 快速绘制直线段 */
    static '_line-faster'(drawTool) {
        this._clearDrawHandlers();
        let drawing = false, startCoordinate = null;
        const handlerMove = drawTool.map.on('pointermove', (e) => {
            if (drawing) {
                const geometry = createLineString([startCoordinate, e.coordinate]);
                drawTool.fire('draw-move', { geometry });
            }
            e.stopPropagation();
        });
        function handlerMousedown(e) {
            if (e.button !== 0) {
                return;
            }
            drawing = true;
            startCoordinate = drawTool.map.getEventCoordinate(e);
            drawTool.fire('draw-start', { coordinate: startCoordinate });
        }
        function handlerMouseup(e) {
            if (e.button !== 0) {
                return;
            }
            drawing = false;
            const coordinate = drawTool.map.getEventCoordinate(e);
            const geometry = createLineString([startCoordinate, coordinate]);
            drawTool.fire('draw-end', { geometry });
        }
        drawTool.map.getTargetElement().addEventListener('mousedown', handlerMousedown);
        drawTool.map.getTargetElement().addEventListener('mouseup', handlerMouseup);
        {
            const remove = () => drawTool.map.un('pointermove', handlerMove.listener);
            this._handlerPool['pointermove'] = { remove };
        }
        {
            const remove = () => drawTool.map.getTargetElement().removeEventListener('mousedown', handlerMousedown);
            this._handlerPool['mousedown'] = { remove };
        }
        {
            const remove = () => drawTool.map.getTargetElement().removeEventListener('mouseup', handlerMouseup);
            this._handlerPool['mouseup'] = { remove };
        }
    }
    /** 绘制多段线 */
    static '_polyline'(drawTool) {
        this._clearDrawHandlers();
        let drawing = false;
        const coordinates = [];
        const handlerSingleClick = drawTool.map.on('singleclick', ({ coordinate }) => {
            coordinates.push(coordinate);
            if (!drawing) {
                drawing = true;
                drawTool.fire('draw-start', { coordinate });
            }
        });
        {
            const remove = () => drawTool.map.un('singleclick', handlerSingleClick.listener);
            this._handlerPool['singleclick'] = { remove };
        }
        const handlerDbClick = drawTool.map.on('dblclick', e => {
            if (drawing) {
                e.stopPropagation();
                coordinates.push(e.coordinate);
                const geometry = createLineString(coordinates);
                drawing = false;
                ext(coordinates).clear();
                drawTool.fire('draw-end', { geometry });
            }
        });
        {
            const remove = () => drawTool.map.un('dblclick', handlerDbClick.listener);
            this._handlerPool['dbclick'] = { remove };
        }
        const handlerPointermove = drawTool.map.on('pointermove', ({ coordinate }) => {
            if (drawing) {
                const geometry = createLineString([...coordinates, coordinate]);
                drawTool.fire('draw-move', { geometry });
            }
        });
        {
            const remove = () => drawTool.map.un('pointermove', handlerPointermove.listener);
            this._handlerPool['pointermove'] = { remove };
        }
    }
    /** 绘制面 */
    static '_polygon'(drawTool) {
        this._clearDrawHandlers();
        let drawing = false;
        const coordinates = [];
        const handlerSingleClick = drawTool.map.on('singleclick', ({ coordinate }) => {
            coordinates.push(coordinate);
            if (!drawing) {
                drawing = true;
                drawTool.fire('draw-start', { coordinate });
            }
        });
        {
            const remove = () => drawTool.map.un('singleclick', handlerSingleClick.listener);
            this._handlerPool['singleclick'] = { remove };
        }
        const handlerDbClick = drawTool.map.on('dblclick', e => {
            if (drawing) {
                e.stopPropagation();
                coordinates.push(e.coordinate);
                const geometry = createPolygon([coordinates]);
                drawing = false;
                ext(coordinates).clear();
                drawTool.fire('draw-end', { geometry });
            }
        });
        {
            const remove = () => drawTool.map.un('dblclick', handlerDbClick.listener);
            this._handlerPool['dbclick'] = { remove };
        }
        const handlerPointermove = drawTool.map.on('pointermove', ({ coordinate }) => {
            if (drawing) {
                const geometry = createPolygon([[...coordinates, coordinate]]);
                drawTool.fire('draw-move', { geometry });
            }
        });
        {
            const remove = () => drawTool.map.un('pointermove', handlerPointermove.listener);
            this._handlerPool['pointermove'] = { remove };
        }
    }
    /** 绘制矩形 */
    static '_rectangle'(drawTool) {
        this._clearDrawHandlers();
        let drawing = false, startX, startY;
        const handlerStartAndEnd = drawTool.map.on('singleclick', ({ coordinate }) => {
            if (drawing) {
                drawing = false;
                const [endX, endY] = coordinate;
                const coordinates = [[
                        [startX, startY], [startX, endY],
                        [endX, endY], [endX, startY],
                    ]];
                const geometry = createPolygon(coordinates);
                [startX, startY] = [null, null];
                drawTool.fire('draw-end', { geometry });
            }
            else {
                drawing = true;
                [startX, startY] = coordinate;
                drawTool.fire('draw-start', { coordinate });
            }
        });
        const handlerMove = drawTool.map.on('pointermove', e => {
            if (drawing) {
                const [endX, endY] = e.coordinate;
                const coordinates = [[
                        [startX, startY], [startX, endY],
                        [endX, endY], [endX, startY],
                    ]];
                const geometry = createPolygon(coordinates);
                drawTool.fire('draw-move', { geometry });
            }
        });
        {
            const remove = () => drawTool.map.un('singleclick', handlerStartAndEnd.listener);
            this._handlerPool['singleclick'] = { remove };
        }
        {
            const remove = () => drawTool.map.un('pointermove', handlerMove.listener);
            this._handlerPool['pointermove'] = { remove };
        }
    }
    /** 快速绘制矩形 */
    static '_rectangle-faster'(drawTool) {
        this._clearDrawHandlers();
        let drawing = false, startX, startY;
        const handlerMove = drawTool.map.on('pointermove', (e) => {
            if (drawing) {
                const [endX, endY] = e.coordinate;
                const coordinates = [[
                        [startX, startY], [startX, endY],
                        [endX, endY], [endX, startY],
                    ]];
                const geometry = createPolygon(coordinates);
                drawTool.fire('draw-move', { geometry });
            }
            e.stopPropagation();
        });
        function handlerMousedown(e) {
            if (e.button !== 0) {
                return;
            }
            drawing = true;
            [startX, startY] = drawTool.map.getEventCoordinate(e);
            drawTool.fire('draw-start', { coordinate: [startX, startY] });
        }
        function handlerMouseup(e) {
            if (e.button !== 0) {
                return;
            }
            drawing = false;
            const [endX, endY] = drawTool.map.getEventCoordinate(e);
            const coordinates = [[
                    [startX, startY], [startX, endY],
                    [endX, endY], [endX, startY],
                ]];
            const geometry = createPolygon(coordinates);
            drawTool.fire('draw-end', { geometry });
        }
        drawTool.map.getTargetElement().addEventListener('mousedown', handlerMousedown);
        drawTool.map.getTargetElement().addEventListener('mouseup', handlerMouseup);
        {
            const remove = () => drawTool.map.un('pointermove', handlerMove.listener);
            this._handlerPool['pointermove'] = { remove };
        }
        {
            const remove = () => drawTool.map.getTargetElement().removeEventListener('mousedown', handlerMousedown);
            this._handlerPool['mousedown'] = { remove };
        }
        {
            const remove = () => drawTool.map.getTargetElement().removeEventListener('mouseup', handlerMouseup);
            this._handlerPool['mouseup'] = { remove };
        }
    }
    /** 绘制圆 */
    static '_circle'(drawTool) {
        this._clearDrawHandlers();
        let drawing = false, startCoordinate = null;
        const handlerStartAndEnd = drawTool.map.on('singleclick', ({ coordinate }) => {
            if (drawing) {
                drawing = false;
                const radius = distanceByTwoPoint(startCoordinate, coordinate);
                const geometry = createCircle(startCoordinate, radius);
                startCoordinate = null;
                drawTool.fire('draw-end', { geometry });
            }
            else {
                drawing = true;
                startCoordinate = coordinate;
                drawTool.fire('draw-start', { coordinate });
            }
        });
        const handlerMove = drawTool.map.on('pointermove', e => {
            if (drawing && startCoordinate) {
                const radius = distanceByTwoPoint(startCoordinate, e.coordinate);
                const geometry = createCircle(startCoordinate, radius);
                drawTool.fire('draw-move', { geometry });
            }
        });
        {
            const remove = () => drawTool.map.un('singleclick', handlerStartAndEnd.listener);
            this._handlerPool['singleclick'] = { remove };
        }
        {
            const remove = () => drawTool.map.un('pointermove', handlerMove.listener);
            this._handlerPool['pointermove'] = { remove };
        }
    }
    /** 快速绘制圆 */
    static '_circle-faster'(drawTool) {
        this._clearDrawHandlers();
        let drawing = false, startCoordinate = null;
        const handlerMove = drawTool.map.on('pointermove', (e) => {
            if (drawing) {
                const radius = distanceByTwoPoint(startCoordinate, e.coordinate);
                const geometry = createCircle(startCoordinate, radius);
                drawTool.fire('draw-move', { geometry });
            }
            e.stopPropagation();
        });
        function handlerMousedown(e) {
            if (e.button !== 0) {
                return;
            }
            drawing = true;
            startCoordinate = drawTool.map.getEventCoordinate(e);
            drawTool.fire('draw-start', { coordinate: startCoordinate });
        }
        function handlerMouseup(e) {
            if (e.button !== 0) {
                return;
            }
            drawing = false;
            const coordinate = drawTool.map.getEventCoordinate(e);
            const radius = distanceByTwoPoint(startCoordinate, coordinate);
            const geometry = createCircle(startCoordinate, radius);
            drawTool.fire('draw-end', { geometry });
        }
        drawTool.map.getTargetElement().addEventListener('mousedown', handlerMousedown);
        drawTool.map.getTargetElement().addEventListener('mouseup', handlerMouseup);
        {
            const remove = () => drawTool.map.un('pointermove', handlerMove.listener);
            this._handlerPool['pointermove'] = { remove };
        }
        {
            const remove = () => drawTool.map.getTargetElement().removeEventListener('mousedown', handlerMousedown);
            this._handlerPool['mousedown'] = { remove };
        }
        {
            const remove = () => drawTool.map.getTargetElement().removeEventListener('mouseup', handlerMouseup);
            this._handlerPool['mouseup'] = { remove };
        }
    }
}
//#endregion
//#region 私有静态属性
/** 绘制动作响应事件池 */
DrawTool._handlerPool = {
    'click': null,
    'dblclick': null,
    'moveend': null,
    'movestart': null,
    'pointerdrag': null,
    'pointermove': null,
    'singleclick': null,
    'mousedown': null,
    'mouseup': null,
};
