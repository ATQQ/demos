// const readline = require('./readline')
// const {readNumber} = require('./utils')
// async function main(){
//     process.stdout.write('第一个单词：')
//     const a = await readline()
//     process.stdout.write('第二个单词：')
//     const b = await readline()
//     console.log(a , b);
// }

// main()

// async function main(){
//     const a = await readline()
//     const b = await readNumber()

//     console.log('a',typeof a);
//     console.log('b',typeof b);
// }

// main()

const { print, readline, readNumber } = require('./index')

async function main(){
    print('hello world:')
    const a = await readline()
    const b = await readNumber()
    console.log(a,b);
}

main()