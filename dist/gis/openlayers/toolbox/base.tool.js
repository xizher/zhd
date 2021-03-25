import { Observer } from '../../../observer';
/** 执行动作工具（弃用） */
export class BaseTool extends Observer {
    //#endregion
    //#region 构造函数
    /**
     * 构造执行动作工具对象
     * @param map 地图对象
     * @param view 视图对象
     */
    constructor(webMap) {
        super();
        this._webMap = webMap;
        this.on('tool-reset', e => this.onToolReset(e));
        this.on('tool-executing', e => this.onToolExecuting(e));
        this.on('tool-done', e => this.onToolDone(e));
        this.on('tool-error', e => this.onToolError(e));
    }
    //#endregion
    //#region getter
    get webMap() {
        return this._webMap;
    }
    //#endregion
    //#region 公有方法
    /** 重置工具 */
    resetTool() {
        this.fire('tool-reset');
        return this;
    }
    /** 执行工具 */
    execute() {
        this.fire('tool-executing');
        return this;
    }
    /** 完成执行工具 */
    doneTool(success, errorMessage) {
        if (success) {
            this.fire('tool-done');
        }
        else {
            this.fire('tool-error', { message: errorMessage }); // eslint-disable-line
        }
        return this;
    }
    /** 工具重置触发事件 */
    onToolReset(e) {
        return true;
    }
    /** 工具开始执行触发事件 */
    onToolExecuting(e) {
        this._webMap.mapCursor.startWaitingCursor();
        return true;
    }
    /** 工具执行完成触发事件 */
    onToolDone(e) {
        this._webMap.mapCursor.stopWaitingCursor();
        return true;
    }
    /** 工具执行异常触发事件 */
    onToolError(e) {
        this._webMap.mapCursor.stopWaitingCursor();
        return true;
    }
}
