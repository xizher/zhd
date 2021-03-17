export interface IArrayExtension<T> {
  insert (index: number, item: T) : void
  /**
   * 移除
   * @param index 移除位置索引
   */
  removeIndex (index: number) : void
  /**
   * 清空数组
   */
  clear () : void
  /**
   * 重置数组
   * @param items 新子集
   */
  reset (...items: T[]) : void
  /**
   * 移除符合要求的子集
   * @param value 移除的值
   * @param removeMany 是否移除所有，默认为否
   */
  removeValue (value: T, removeMany?: true | false) : void
  /**
   * 数组去重
   */
  unique () : void
  /**
   * 获取数组去重后的结果
   */
  getUnique () : T[]
  /**
   * 对比数组值是否相等
   * @param arr 对比数组
   * @returns 对比结果
   */
  equal (arr: T[]) : true | false
  /**
   * 寻找所有符合要求的对象数组子集
   * @param propName 属性名
   * @param propValue 属性值
   */
  findItem<U extends keyof T> (propName: U, propValue: T[U]) : T
  /**
   * 寻找符合要求的第一个对象数组子集
   * @param propName 属性名
   * @param propValue 属性值
   */
  findItems<U extends keyof T> (propName: U, propValue: T[U]) : T[]
  /**
   * 提取对象数组属性
   * @param propName 属性名
   */
  propToArr<U extends keyof T> (propName: U) : T[U][]
  /**
   * 获取数字数组值总和
   */
  last () : T
}
