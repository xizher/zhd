export interface IStringExtension {
  /**
   * 检查字符串是否包含在给定字符串数组内
   * @param strArr 字符串数组
   * @returns 检查结果
   */
  contain (strArr: string[]) : true | false
  /**
   * 获取无空格状态的字符串
   * @return 无空格字符串
   */
  trimAll () : string
  /**
   * 替换所有符串查询的字符串，并返回替换后结果
   * @param searchValue 查询字符串
   * @param replaceValue 替换字符串
   * @returns 替换后字符串
   */
  replaceAll (searchValue: string, replaceValue: string) : string
}
