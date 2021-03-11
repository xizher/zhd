import { WebMapPlugin } from '../../web-map/web-map-plugin';
export declare type MapCursorType = 'default' | 'pan' | 'panning' | 'wait' | 'draw' | 'zoomin' | 'zoomout' | 'clear';
/** 插件：地图鼠标样式控制类 */ export declare class MapCursor extends WebMapPlugin<{
    'change': {
        type: string;
    };
}> {
    /** 鼠标样式存储池 */
    private static _MAP_CURSOR_TYPE;
    private _cursorType;
    /** 构造地图鼠标样式控制对象 */
    constructor();
    /**
     * 设置鼠标样式
     * @param type 样式
     */
    setMapCursor(type?: MapCursorType): MapCursor;
    startWaitingCursor(): this;
    stopWaitingCursor(): this;
}
