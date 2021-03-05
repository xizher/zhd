export interface IDataExtension {
  /**
    * 日期格式化
    * @param fmt 格式化模板
    * @returns 日期格式化字符串
    */
  format (fmt: string) : string
  /**
    * 获取下一个增量日数的日期对象
    * @param nDays 天数，默认值为 1
    * @returns 新日期对象
    */
  getNextDate (nDays: number) : Date
  /**
    * 获取日期对象的月份
    * @returns 月份
    */
  getMonth () : number
}
