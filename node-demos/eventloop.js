const fs = require('fs');
setTimeout(() => { // 新的事件循环的起点
    console.log('1'); // 3
}, 0);
setImmediate( () => {
    console.log('setImmediate 1'); // 4
});
/// 将会在 poll 阶段执行
fs.readFile('./test.txt', {encoding: 'utf-8'}, (err, data) => {
    if (err) throw err;
    console.log('read file success'); // 5
});

/// 该部分将会在首次事件循环中执行
Promise.resolve().then(()=>{
    console.log('poll callback'); // 2
});
// process.nextTick(()=>{
//     console.log('next tick');
// })
// 首次事件循环执行
console.log('2'); // 1