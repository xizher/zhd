/**
 * 监听者类
 * @example
 * class TestClass extends Observer<{
 *   'inc': { value: number },
 *   'dev': { val: number }
 * }> {
 *   private _value = 1
 *   constructor () {
 *     super()
 *   }
 *   inc () {
 *     this._value++
 *     this.fire('inc', {
 *       value: this._value
 *     })
 *   }
 *   dec () {
 *     this._value--
 *     this.fire('dev', {
 *       val: this._value
 *     })
 *   }
 * }
 * const testObj = new TestClass()
 * let count = 0
 * testObj.on('inc', e => {
 *   count++
 * })
 * testObj.on('dev', e => {
 *   count++
 * })
 * testObj.inc() // +1
 * testObj.inc() // +1
 * testObj.inc() // +1
 * testObj.dec() // +1
 * testObj.dec() // +1
 * expect(count).toBe(5)
 */
export class Observer {
    constructor() {
        /** 监听处理函数存储池 */
        this._eventPool = new Map();
    }
    /**
     * 绑定监听函数
     * @param name 监听类型名
     * @param callback 监听回调函数
     */
    on(name, callback) {
        const key = name.toLowerCase();
        if (!this._eventPool.has(key)) {
            this._eventPool.set(name, []);
        }
        this._eventPool.get(key).push(callback);
        return {
            remove: () => this.off(name, callback)
        };
    }
    /**
     * 移除监听函数
     * @param name 监听类型名
     * @param callback 监听回调函数（不指定者移除所有）
     */
    off(name, callback) {
        const key = name.toLowerCase();
        if (!this._eventPool.has(key)) {
            return;
        }
        const eventList = this._eventPool.get(key);
        if (eventList.length === 0) {
            return;
        }
        if (!callback) {
            eventList.splice(0, eventList.length);
            return;
        }
        for (let i = 0; i < eventList.length; i++) {
            if (callback === eventList[i]) {
                eventList.splice(i--, 1); // i-- 预防遍历丢失情况
            }
        }
    }
    /**
     * 触发监听函数
     * @param name 监听函数名
     * @param data 数据
     */
    fire(name, data) {
        const key = name.toLowerCase();
        if (!this._eventPool.has(key)) {
            return;
        }
        const eventList = this._eventPool.get(key);
        let len = eventList.length;
        if (len === 0) {
            return;
        }
        const params = Object.assign({
            name: key,
            origin: this
        }, data || {});
        for (let i = 0; i < len; i++) {
            const callback = eventList[i];
            callback(params);
            if (eventList.length < len) {
                i--;
                len = eventList.length;
            }
        }
    }
}
export default Observer;
