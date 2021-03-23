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
    setClipGeometry(geometry) {
        this._clipGeom = geometry;
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
        this.clearResult();
        let polygon = trufHelper.createGeoJSON(this._clipGeom);
        polygon = trufHelper.toWgs84(polygon);
        this._features.forEach(feat => {
            let geojson = trufHelper.createGeoJSON(feat);
            geojson = trufHelper.toWgs84(geojson);
            const intersection = trufHelper.booleanIntersects(geojson, polygon); // eslint-disable-line
            if (intersection) {
                this._resultFeatures.push(feat);
            }
        });
        this.doneTool();
        return true;
    }
    /** 工具执行完成触发事件 */
    onToolDone(e) {
        if (!super.onToolDone(e)) {
            return false;
        }
        return true;
    }
}
