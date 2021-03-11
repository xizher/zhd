/** 矩阵类 */
export class Matrix {
    //#region 私有方法
    /** 二维数字数组（矩阵元素存储） */
    #_array;
    /** 矩阵行数 */
    #_rowCount;
    /** 矩阵列数 */
    #_colCount;
    //#endregion
    //#region getter
    get rowCount() {
        return this.#_rowCount;
    }
    get colCount() {
        return this.#_colCount;
    }
    //#endregion
    //#region 公有方法
    //#endregion
    //#region 公有静态方法
    /**
     * 解释一维数字数组为二维数字数组
     * @param numArr 一维数字数组
     * @param rowCount 行数
     * @param colCount 列数
     * @param noData 默认值
     */
    static parseSingleNumberArrayTo2D(numArr, rowCount, colCount, noData = 0) {
        const ret = Array.from({ length: rowCount }, () => Array.from({ length: colCount }, () => noData));
        for (let row = 0; row < rowCount; row++) {
            for (let col = 0; col < colCount; col++) {
                ret[row][col] = numArr[row * colCount + col];
            }
        }
        return ret;
    }
}
