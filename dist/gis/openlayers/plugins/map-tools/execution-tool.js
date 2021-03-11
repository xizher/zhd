import { BaseTool } from './base-tool';
/** 执行动作工具（弃用） */
export class ExcutionTool extends BaseTool {
    //#region 构造函数
    /**
     * 构造执行动作工具对象
     * @param map 地图对象
     * @param view 视图对象
     */
    constructor(map, view) {
        super(map, view, true);
        this.on('tool-reset', e => this.onToolReset(e));
        this.on('tool-executing', e => this.onToolExecuting(e));
        this.on('tool-done', e => this.onToolDone(e));
    }
    //#endregion
    //#region 公有方法
    /** 重置工具 */
    resetTool() {
        this.fire('tool-reset');
        return this;
    }
    /** 执行工具 */
    executeTool() {
        this.fire('tool-done');
        return this;
    }
    /** 完成执行工具 */
    doneTool() {
        this.fire('tool-done');
        return this;
    }
    /** 工具重置触发事件 */
    onToolReset(e) {
        return true;
    }
    /** 工具开始执行触发事件 */
    onToolExecuting(e) {
        this.map.$owner.mapCursor.startWaitingCursor();
        return true;
    }
    /** 工具执行完成触发事件 */
    onToolDone(e) {
        this.map.$owner.mapCursor.stopWaitingCursor();
        return true;
    }
}
