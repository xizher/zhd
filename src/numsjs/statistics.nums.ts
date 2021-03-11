/** 求和 */
export function sum (numArr: number[]) : number {
  return numArr.reduce((pre, cur) => {
    return pre + cur
  }, 0)
}

/** 均值 */
export function ave (numArr: number[]) : number {
  return sum(numArr) / numArr.length
}

/** 最小值 */
export function min (numArr: number[]) : number {
  return Math.min(...numArr)
}

/** 最大值 */
export function max (numArr: number[]) : number {
  return Math.max(...numArr)
}

/** 中位数 */
export function mid (numArr: number[]) : number {
  const len = numArr.length
  const _numArr = numArr.sort((i, j) => i - j)
  if (len % 2 === 0) {
    return (_numArr[len / 2 - 1] + _numArr[len / 2]) / 2
  }
  return _numArr[Math.floor(len / 2)]
}

/** 众数 */
export function mode (numArr: number[]) : number {
  const group = numArr.reduce((pre, cur) => {
    cur in pre ? pre[cur]++ : pre[cur] = 1
    return pre
  }, {})
  let maxVal = Number.MIN_VALUE
  for (const key in group) {
    if (group[key] > maxVal) {
      maxVal = Number(key)
    }
  }
  return maxVal
}

/** 方差 */
export function variance (numArr: number[]) : number {
  const aveVal = ave(numArr)
  return numArr.reduce((pre, cur) => {
    pre += (aveVal - cur) ** 2
    return pre
  }, 0)
}

/** 标准差 */
export function standardDeviation (numArr: number[]) : number {
  return variance(numArr) ** .5
}

/** 极值 */
export function extremum (numArr: number[]) : number {
  return max(numArr) - min(numArr)
}

