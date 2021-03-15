import { BaseTool } from '../base.tool';
import * as turf from '@turf/turf';
/** 裁剪工具类 */
export class ClipTool extends BaseTool {
    /**
     * 构造裁剪工具对象
     * @param webMap WebMap
     */
    constructor(webMap) {
        super(webMap);
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
    /** 工具执行时触发事件 */
    onToolExecuting(e) {
        if (!super.onToolExecuting(e)) {
            return false;
        }
        let polygon = turf.polygon(this._clipGeom.getCoordinates()[0]); // eslint-disable-line
        polygon = turf.toWgs84(polygon);
        this._features.forEach(feat => {
            const coordinates = feat.getGeometry().getCoordinates(); // eslint-disable-line
            let point = turf.point(coordinates);
            point = turf.toWgs84(point);
            const intersection = turf.booleanIntersects(point, polygon); // eslint-disable-line
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
