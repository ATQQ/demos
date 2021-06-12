# 判断两个时间是否是同一周

## 实现如下
* [源代码](./index.js)

## [思路分析文章](https://juejin.cn/post/6972841520479076388)

## 实现
```js
const ONE_DAY = 1000 * 60 * 60 * 24

/**
 * 判断两个时间是否同一周
 * @param {Date} d1 
 * @param {Date} d2 
 */
function isSameWeek(d1, d2) {
    const difftime = Math.abs(d2 - d1)
    // 时间差大于等于7天
    if (difftime >= ONE_DAY * 7) {
        return false
    }
    // 前者存放小日期的星期，后者存放大日期的星期
    let smallDay, bigDay
    if (d1 > d2) {
        // 周日返回的是0，给它转为7
        bigDay = d1.getDay() || 7
        smallDay = d2.getDay() || 7
    } else {
        smallDay = d1.getDay() || 7
        bigDay = d2.getDay() || 7
    }

    // 大日期的星期 < 小日期的星期
    if (bigDay < smallDay) {
        return false
    }
    // 大日期的星期 == 小日期的星期，且时间差 >1 天
    if (bigDay === smallDay && difftime > ONE_DAY) {
        return false
    }

    return true
}
```
## 简化实现
```js
// 简化后
function isSameWeek(d1, d2) {
    const difftime = Math.abs(d2 - d1)
    let bigDay = (d1 > d2 ? d1.getDay() : d2.getDay()) || 7
    let smallDay = (d1 < d2 ? d1.getDay() : d2.getDay()) || 7
    return !(difftime >= ONE_DAY * 7 || bigDay < smallDay || (bigDay === smallDay && difftime > ONE_DAY))
}
```

## 测试用例
```js
console.log(isSameWeek(new Date('2021-06-12'), new Date('2021-06-12')));  // true  
console.log(isSameWeek(new Date('2021-06-13'), new Date('2021-06-12')));  // true  
console.log(isSameWeek(new Date('2021-06-12 23:59:59'), new Date('2021-06-07')));  // true  
console.log(isSameWeek(new Date('2021-06-12'), new Date('2021-06-07')));  // true  
console.log(isSameWeek(new Date('2021-06-06 23:59:59'), new Date('2021-06-12')));  // false  
console.log(isSameWeek(new Date('2021-06-12 23:59:59'), new Date('2021-06-19')));  // false  
console.log(isSameWeek(new Date('2021-06-20'), new Date('2021-06-12')));  // false  
```