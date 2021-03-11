/** 矩阵类 */
export declare class Matrix {
    #private;
    get rowCount(): number;
    get colCount(): number;
    /**
     * 解释一维数字数组为二维数字数组
     * @param numArr 一维数字数组
     * @param rowCount 行数
     * @param colCount 列数
     * @param noData 默认值
     */
    static parseSingleNumberArrayTo2D(numArr: number[], rowCount: number, colCount: number, noData?: number): number[][];
}
