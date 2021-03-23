/** 装饰器工具 */
export declare const descriptorUtils: {
    /** 自动绑定this上下文装饰器 */
    AutoBind<T extends Function>(target: Object, key: string | symbol, descriptor: TypedPropertyDescriptor<T>): PropertyDescriptor;
    /** 防抖 */
    Debounce(timeout: number): MethodDecorator;
    /** 防抖 */
    throttle(wait: number, options?: {
        leading: boolean;
        trailing: boolean;
    }): MethodDecorator;
};
export default descriptorUtils;
