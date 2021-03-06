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
};
