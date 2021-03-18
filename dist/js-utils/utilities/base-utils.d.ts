/** 基础工具集 */
export declare const baseUtils: {
    /**
     * 深度复制（采用JSON解析方式）
     * @param obj 复制对象
     */
    deepCopyJSON<T>(obj: T): T;
    /**
     * 深度复制（采用递归式）
     * @param obj 复制对象
     */
    deepCopy<T_1>(obj: T_1): T_1;
    /** 创建GUID */
    createGuid(): string;
    /**
     * 创建指定范围的随机整数
     * @param minInt 最小整数
     * @param maxInt 最大整数
     */
    createIntRandom(minInt: number, maxInt: number): number;
    /** 判断网页是否通过移动端设备打开 */
    isFromMobileBrowser(): boolean;
    /**
     * 复制文本
     * @param text 文本
     */
    copyText(text: string): Promise<string>;
    /**
     * 对象扩展（JQuery $.extend 实现代码）
     * @param _ 深度复制
     * @param sourceObj 源对象
     * @param targetObj 目标对象
     */
    $extend<T_2, K extends T_2>(_deep: boolean, sourceObj: T_2, targetObj: K): T_2;
    /**
     * 防抖
     * （当持续触发事件时，
     * 一定时间段内没有再触发事件，
     * 事件处理函数才会执行一次，
     * 如果设定的时间到来之前，
     * 又一次触发了事件，
     * 就重新开始延时）
     * @param fn 函数
     * @param wait 延时毫秒数
     * @param immediate 是否立即执行
     */
    debounce<T_3 extends Function>(fn: T_3, wait: number, immediate?: boolean): T_3 & {
        cancle(): void;
    };
    /**
     * 节流
     * （当持续触发事件时，
     * 保证一定时间段内只调用一次事件处理函数）
     * @param fn 函数
     * @param wait 间隔毫秒数
     * @param options 配置项
     */
    throttle<T_4 extends Function>(fn: T_4, wait: number, options?: {
        leading: boolean;
        trailing: boolean;
    }): T_4 & {
        cancle(): void;
    };
    /**
     * 加载css
     * @param cssUrl CSS路径
     */
    loadCss(cssUrl: string): void;
    /**
     * 加载js
     * @param jsUrl JS路径
     */
    loadJs(jsUrl: string): void;
};
