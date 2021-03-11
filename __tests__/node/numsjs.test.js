import {
  ave,
  sum,
  max,
  min,
  mid,
  mode,
  variance,
  standardDeviation,
  extremum,
} from '../../dist/numsjs/statistics.nums.js'
{
  const numArr = [1, 2, 3, 4]
  console.log(sum(numArr))
  console.log(ave(numArr))
  console.log(max(numArr))
  console.log(min(numArr))
}
{
  const numArr = [1, 4, 3, 4]
  const numArr2 = [1, 5, 3, 4, 6]
  console.log(mid(numArr))
  console.log(mid(numArr2))
  console.log(mode(numArr))
  console.log(variance(numArr))
  console.log(standardDeviation(numArr))
  console.log(extremum(numArr))
}
