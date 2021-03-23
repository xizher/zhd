/* eslint-disable @typescript-eslint/ban-types */
/** 装饰器工具 */
export const descriptorUtils = {
    /** 自动绑定this上下文装饰器 */
    AutoBind(target, key, descriptor) {
        const fn = descriptor.value;
        const { configurable, enumerable } = descriptor;
        return {
            configurable,
            enumerable,
            get: function get() {
                const boundFn = fn.bind(this);
                Object.defineProperty(this, key, {
                    configurable: true,
                    writable: true,
                    enumerable: false,
                    value: boundFn
                });
                return boundFn;
            }
        };
    },
    /** 防抖 */
    Debounce(timeout) {
        const instanceMap = new Map();
        const ret = (target, key, descriptor) => {
            return Object.assign({}, descriptor, {
                value: function value(...args) {
                    clearTimeout(instanceMap.get(this));
                    instanceMap.set(this, setTimeout(() => {
                        descriptor.value.apply(this, args); // eslint-disable-line
                        instanceMap.set(this, null);
                    }, timeout));
                }
            });
        };
        return ret;
    },
    /** 防抖 */
    throttle(wait, options = { leading: true, trailing: true }) {
        let handle = null, previous = 0;
        const ret = (target, key, descriptor) => {
            return Object.assign({}, descriptor, {
                value: function value(...args) {
                    const now = Date.now();
                    if (!previous && !options.leading) {
                        previous = now;
                    }
                    const remaining = wait - (now - previous);
                    if (remaining <= 0 || remaining > wait) {
                        if (handle) {
                            clearTimeout(handle);
                            handle = null;
                        }
                        previous = now;
                        descriptor.value.apply(this, args); // eslint-disable-line
                    }
                    else if (!handle && options.trailing) {
                        handle = setTimeout(() => {
                            previous = !options.leading ? 0 : Date.now();
                            handle = null;
                            descriptor.value.apply(this, args); // eslint-disable-line
                        }, remaining);
                    }
                }
            });
        };
        return ret;
    },
};
export default descriptorUtils;
