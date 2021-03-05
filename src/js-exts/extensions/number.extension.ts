export interface INumberExtension {
  /**
   * 整除
   * @param val 整除值
   */
  divide (val: number) : number
  /**
   * 向下取整
   */
  floor () : number
  /**
   * 向上取整
   */
  ceil () : number
  /**
   * 绝对值
   */
  abs () : number
  /**
   * 保留小数位
   * @param count 小数位
   */
  round (count: number) : number
  /**
   * 数字转日期字符串
   * @param fmt 日期格式化模板
   */
  toDateFormat (fmt: string) : string
  /**
   * 数字转现金字符串
   */
  toCashString () : string
  /**
   * 数字转中文数字
   */
  toChineseString () : string
}
