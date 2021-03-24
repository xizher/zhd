import { Supermap } from '../../../../init-modules/init-modules';
import BaseTool from '../../base-tool';
export var ClampModeType;
(function (ClampModeType) {
    ClampModeType[ClampModeType["Space"] = 0] = "Space";
    ClampModeType[ClampModeType["Ground"] = 1] = "Ground";
})(ClampModeType || (ClampModeType = {}));
/** 测量工具 */
export class MeasureTool extends BaseTool {
    //#endregion
    //#region 构造函数
    /** 构造测量工具对象 */
    constructor(viewer, entities) {
        super(viewer, entities);
        //#region 私有方法
        /** 量算方式 */
        this._clampMode = ClampModeType.Space;
        /** 测量类型 */
        this._measureType = 'distance';
        this._distanceHandler = null;
        this._areaHandler = null;
        this._heightHandler = null;
        this._init();
    }
    //#endregion
    //#region 私有方法
    _init() {
        this
            ._initDistanceHandler()
            ._initAreaHandler()
            ._initHeightHandler();
    }
    _initDistanceHandler() {
        this._distanceHandler = new Supermap.MeasureHandler(this.viewer, Supermap.MeasureMode.Distance, this._clampMode);
        this._distanceHandler.measureEvt.addEventListener(result => {
            const dis = Number(result.distance);
            const distance = dis > 1000 ? `${(dis / 1000).toFixed(2)}km` : `${dis.toFixed(2)}m`;
            this._distanceHandler.disLabel.text = `距离:${distance}`;
        });
        this._distanceHandler.activeEvt.addEventListener(isActive => {
            console.log(isActive);
            if (isActive) {
                /* eslint-disable @typescript-eslint/no-explicit-any */
                this.viewer.enableCursorStyle = false;
                this.viewer._element.style.cursor = '';
            }
            else {
                this.viewer.enableCursorStyle = true;
                this.viewer.$owner.mapTools.setMapTool('default');
                /* eslint-enable */
            }
        });
        return this;
    }
    _initAreaHandler() {
        this._areaHandler = new Supermap.MeasureHandler(this.viewer, Supermap.MeasureMode.Area, this._clampMode);
        this._areaHandler.measureEvt.addEventListener(result => {
            const mj = Number(result.area);
            const area = mj > 1000000 ? `${(mj / 1000000).toFixed(2)}km²` : `${mj.toFixed(2)}m²`;
            this._areaHandler.areaLabel.text = `面积:${area}`;
        });
        this._areaHandler.activeEvt.addEventListener(isActive => {
            if (isActive) {
                /* eslint-disable @typescript-eslint/no-explicit-any */
                this.viewer.enableCursorStyle = false;
                this.viewer._element.style.cursor = '';
            }
            else {
                this.viewer.enableCursorStyle = true;
                this.viewer.$owner.mapTools.setMapTool('default');
                /* eslint-enable */
            }
        });
        return this;
    }
    _initHeightHandler() {
        this._heightHandler = new Supermap.MeasureHandler(this.viewer, Supermap.MeasureMode.DVH);
        this._heightHandler.measureEvt.addEventListener(result => {
            const distance = result.distance > 1000 ? (result.distance / 1000).toFixed(2) + 'km' : result.distance + 'm';
            const vHeight = result.verticalHeight > 1000 ? (result.verticalHeight / 1000).toFixed(2) + 'km' : result.verticalHeight + 'm';
            const hDistance = result.horizontalDistance > 1000 ? (result.horizontalDistance / 1000).toFixed(2) + 'km' : result.horizontalDistance + 'm';
            this._heightHandler.disLabel.text = '空间距离:' + distance;
            this._heightHandler.vLabel.text = '垂直高度:' + vHeight;
            this._heightHandler.hLabel.text = '水平距离:' + hDistance;
        });
        this._heightHandler.activeEvt.addEventListener(isActive => {
            if (isActive) {
                /* eslint-disable @typescript-eslint/no-explicit-any */
                this.viewer.enableCursorStyle = false;
                this.viewer._element.style.cursor = '';
            }
            else {
                this.viewer.enableCursorStyle = true;
                this.viewer.$owner.mapTools.setMapTool('default');
                /* eslint-enable */
            }
        });
        return this;
    }
    _deactiveAllHandler() {
        this._distanceHandler.deactivate();
        this._areaHandler.deactivate();
        this._heightHandler.deactivate();
        return this;
    }
    _clearMeasureResult() {
        this._distanceHandler.clear();
        this._areaHandler.clear();
        this._heightHandler.clear();
        return this;
    }
    _updateClampMode() {
        switch (this._clampMode) {
            case ClampModeType.Space:
                this._areaHandler.clampMode = 0;
                this._distanceHandler.clampMode = 0;
                break;
            case ClampModeType.Ground:
                this._areaHandler.clampMode = 1;
                this._distanceHandler.clampMode = 1;
                break;
            default:
                break;
        }
        return this;
    }
    _activeMeasure() {
        this
            ._deactiveAllHandler()
            ._updateClampMode();
        switch (this._measureType) {
            case 'distance':
                this._distanceHandler.activate();
                break;
            case 'area':
                this._areaHandler.activate();
                break;
            case 'height':
                this._heightHandler.activate();
                break;
            default:
                break;
        }
        return this;
    }
    //#endregion
    //#region 公有方法
    /** 设置量算方式 */
    setClampMode(mode) {
        this._clampMode = mode;
        return this._updateClampMode();
    }
    /** 设置测量类型 */
    setMeasureType(type) {
        this._measureType = type;
        if (this.actived) {
            this._activeMeasure();
        }
        return this;
    }
    /** 清理测量结果 */
    clearMeasureResult() {
        return this._clearMeasureResult();
    }
    onToolActived(e) {
        if (!super.onToolActived(e)) {
            return false;
        }
        this._activeMeasure();
        return true;
    }
    onToolDeActived(e) {
        if (!super.onToolDeActived(e)) {
            return false;
        }
        this._deactiveAllHandler();
        return true;
    }
}
export default MeasureTool;
