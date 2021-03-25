import { BaseTool } from '../base.tool';
import trufHelper from '../../truf-helper/truf-helper';
/** 交集工具类 */
export class IntersectsTool extends BaseTool {
    /**
     * 构造裁剪工具对象
     * @param webMap WebMap
     */
    constructor(webMap) {
        super(webMap);
        /** 裁剪结果 */
        this._resultFeatures = [];
    }
    //#endregion
    //#region 构造函数
    setTarget(features) {
        this._features = features;
        return this;
    }
    setIntersectsGeometry(geometry) {
        this._instersectsGeom = geometry;
        return this;
    }
    getResult() {
        return this._resultFeatures;
    }
    clearResult() {
        this._resultFeatures = [];
        return this;
    }
    /** 工具执行时触发事件 */
    onToolExecuting(e) {
        if (!super.onToolExecuting(e)) {
            return false;
        }
        if (!this._instersectsGeom) {
            this.doneTool(false, '交集目标范围未确定');
            return true;
        }
        if (!this._features) {
            this.doneTool(false, '求交要素数据未确定');
            return true;
        }
        this.clearResult();
        let polygon = trufHelper.createGeoJSON(this._instersectsGeom);
        polygon = trufHelper.toWgs84(polygon);
        this._features.forEach(feat => {
            let geojson = trufHelper.createGeoJSON(feat);
            geojson = trufHelper.toWgs84(geojson);
            const intersection = trufHelper.booleanIntersects(geojson, polygon); // eslint-disable-line
            if (intersection) {
                this._resultFeatures.push(feat);
            }
        });
        this.doneTool(true);
        return true;
    }
    /** 工具执行完成触发事件 */
    onToolDone(e) {
        if (!super.onToolDone(e)) {
            return false;
        }
        return true;
    }
    onToolReset(e) {
        if (!super.onToolReset(e)) {
            return false;
        }
        this.clearResult();
        this._instersectsGeom = null;
        this._features = null;
        return true;
    }
}
