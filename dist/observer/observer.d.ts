import { IObject } from '../global/interfaces.global';
/** 监听处理函数接口 */
export interface IObserverHandler {
    /** 移除监听处理函数 */
    remove(): void;
}
/** 监听回调函数参数接口 */
export interface IObserverCallbackParams<T extends string, K> {
    /** 监听类型名 */
    name: T;
    /** 监听源对象 */
    origin: K;
}
/** 监听回调函数接口 */
export interface IObserverCallback<T, K extends string, U> {
    (e: T & IObserverCallbackParams<K, U>): void;
}
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
export declare class Observer<T extends IObject> {
    /** 监听处理函数存储池 */
    private _eventPool;
    /**
     * 绑定监听函数
     * @param name 监听类型名
     * @param callback 监听回调函数
     */
    on<K extends keyof T & string>(name: K, callback: IObserverCallback<T[K], K, this>): IObserverHandler;
    /**
     * 移除监听函数
     * @param name 监听类型名
     * @param callback 监听回调函数（不指定者移除所有）
     */
    off<K extends keyof T & string>(name: K, callback?: IObserverCallback<T[K], K, this>): void;
    /**
     * 触发监听函数
     * @param name 监听函数名
     * @param data 数据
     */
    fire<K extends keyof T & string>(name: K, data?: T[K]): void;
}
export default Observer;
