const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
process.stdout.write('请输入两个数字：')
// 监听键入回车事件
rl.on('line', (str) => {
    // str即为输入的内容
    
    const [a, b] = str.split(' ')
    console.log('和为：', (+a) + (+b));
    
    // 关闭逐行读取流 会触发关闭事件
    rl.close()
})

// 监听关闭事件
rl.on('close', () => {
    console.log('触发了关闭事件');
})