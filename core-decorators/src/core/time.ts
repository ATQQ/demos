const labels = {}

const myTime = (label) => {
    // 记录开始时间
    labels[label] = new Date().getTime()
}

const myTimeEnd = (label) => {
    const timeNow = new Date().getTime();
    // 当前时间与开始时间做差
    const timeTaken = timeNow - labels[label];
    // 删除无用的标志
    delete labels[label];
    // 打印耗时
    console.log(`${label}: ${timeTaken}ms`);
}

// 首先是console.time的polyfill
// 当没定义time与timeEnd的时候，利用labels变量实现类似的效果
const defaultConsole = {
    time: console.time ? console.time.bind(console) : myTime,
    timeEnd: console.timeEnd ? console.timeEnd.bind(console) : myTimeEnd
}
// 用于label生成
let count = 0
export default function time(prefix: null | string = null, console = defaultConsole) {
    return function (target, key, descriptor) {
        const fn = descriptor.value
        // 如果没有传参
        // 使用构造函数的名称与装饰对象的属性名作为key
        if (prefix === null) {
            prefix = `${target.constructor.name}.${key}`;
        }

        // 校验装饰对象是否为函数
        if (typeof fn !== 'function') {
            throw new SyntaxError(`@time can only be used on functions, not: ${fn}`);
        }

        return {
            ...descriptor,
            value() {
                const label = `${prefix}-${count}`
                count++
                console.time(label)
                try {
                    return fn.apply(this, arguments)
                } finally {
                    console.timeEnd(label)
                }
            }
        }
    }
}