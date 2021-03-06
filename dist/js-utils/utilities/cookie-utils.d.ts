export interface ICookieExpiredOptions {
    days?: number;
    hours?: number;
    minutes?: number;
}
/** Cookie工具集 */
export declare const cookieUtils: {
    /**
     * 设置Cookie
     * @param key Cookie Key值
     * @param value Cookie Value值（对象类型会使用JSON解析成字符串）
     * @param options 配置项
     */
    set<T>(key: string, value: T, options?: ICookieExpiredOptions): void;
    /**
     * 删除Cookie
     * @param key Cookie Key值
     */
    del(key: string): void;
    /**
     * 获取Cookie
     * @param key Cookie Key值
     */
    get(key: string): string | null;
    /**
     * 获取Cookie（结果为经过JSON解析的对象）
     * @param key Cookie Key值
     */
    getUseJSON<T_1>(key: string): T_1;
};
