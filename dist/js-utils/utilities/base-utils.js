/*
 * 描述：基础工具集
 * 作者：ngheizit on 2021年3月4日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */
/** 基础工具集 */
export const baseUtils = {
    /**
     * 深度复制（采用JSON解析方式）
     * @param obj 复制对象
     */
    deepCopyJSON(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    /**
     * 深度复制（采用递归式）
     * @param obj 复制对象
     */
    deepCopy(obj) {
        const newObj = (Array.isArray(obj) ? [] : {});
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                newObj[key] = typeof obj[key] === 'object' && obj[key] !== null
                    ? baseUtils.deepCopy(obj[key])
                    : obj[key];
            }
        }
        return newObj;
    },
    /** 创建GUID */
    createGuid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
    },
    /**
     * 创建指定范围的随机整数
     * @param minInt 最小整数
     * @param maxInt 最大整数
     */
    createIntRandom(minInt, maxInt) {
        return minInt + Math.round(Math.random() * (maxInt - minInt));
    },
    /** 判断网页是否通过移动端设备打开 */
    isFromMobileBrowser() {
        return !!navigator
            .userAgent
            .match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    },
    /**
     * 复制文本
     * @param text 文本
     */
    async copyText(text) {
        await navigator.clipboard.writeText(text);
        return text;
    },
    /**
     * 对象扩展（JQuery $.extend 实现代码）
     * @param _ 深度复制
     * @param sourceObj 源对象
     * @param targetObj 目标对象
     */
    $extend(_deep, sourceObj, targetObj) {
        function isPlainObject(obj) {
            const class2type = {};
            const getProto = Object.getPrototypeOf;
            const toString = class2type.toString;
            const hasOwn = class2type.hasOwnProperty;
            const fnToString = hasOwn.toString;
            const ObjectFunctionString = fnToString.call(Object);
            if (!obj || toString.call(obj) !== '[object Object]') {
                return false;
            }
            const proto = getProto(obj);
            if (!proto) {
                return true;
            }
            const Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
            return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
        }
        let options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, // eslint-disable-line
        i = 1, length = arguments.length, // eslint-disable-line
        deep = false; // eslint-disable-line
        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[1] || {}; // eslint-disable-line
            i = 2;
        }
        if (typeof target !== 'object' && typeof target !== 'function') {
            target = {};
        }
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) !== null) { // eslint-disable-line
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        }
                        else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        target[name] = baseUtils.$extend(deep, clone, copy); // eslint-disable-line
                    }
                    else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    },
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
    debounce(fn, wait, immediate = false) {
        let handle = null, ret = null;
        const debounced = function () {
            clearTimeout(handle);
            if (immediate === true) {
                if (!handle) {
                    ret = fn(...arguments); // eslint-disable-line
                }
                handle = setTimeout(() => fn(...arguments), wait); // eslint-disable-line
            }
            else {
                handle = setTimeout(() => fn(...arguments), wait); // eslint-disable-line
            }
            return ret;
        };
        debounced.cancal = function () {
            clearTimeout(handle);
            handle = null;
        };
        return debounced; // eslint-disable-line @typescript-eslint/no-explicit-any
    },
    /**
     * 节流
     * （当持续触发事件时，
     * 保证一定时间段内只调用一次事件处理函数）
     * @param fn 函数
     * @param wait 间隔毫秒数
     * @param options 配置项
     */
    throttle(fn, wait, options = { leading: true, trailing: true }) {
        let handle = null, previous = 0;
        const throttled = function () {
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
                fn(...arguments); // eslint-disable-line
            }
            else if (!handle && options.trailing) {
                handle = setTimeout(() => {
                    previous = !options.leading ? 0 : Date.now();
                    handle = null;
                    fn(...arguments); // eslint-disable-line
                }, remaining);
            }
        };
        throttled.cancle = function () {
            clearTimeout(handle);
            previous = 0;
            handle = null;
        };
        return throttled; // eslint-disable-line @typescript-eslint/no-explicit-any
    },
    /**
     * 加载css
     * @param cssUrl CSS路径
     */
    loadCss(cssUrl) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = cssUrl;
        link.media = 'all';
        document.head.appendChild(link);
    },
    /**
     * 加载js
     * @param jsUrl JS路径
     */
    loadJs(jsUrl) {
        const script = document.createElement('script');
        script.src = jsUrl;
        document.head.appendChild(script);
    },
};
