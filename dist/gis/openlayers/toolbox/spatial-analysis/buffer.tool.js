import { BaseTool } from '../base.tool';
export class BufferTool extends BaseTool {
    //#endregion
    //#region 构造函数
    /**
     * 构造缓冲区对象
     * @param webMap WebMap
     */
    constructor(webMap) {
        super(webMap);
    }
    //#endregion
    //#region 公有方法
    /** 工具重置触发事件 */
    onToolReset(e) {
        if (!super.onToolReset(e)) {
            return false;
        }
        this._geometry = null;
        this.fire('change:buffer-targets');
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
