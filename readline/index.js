const rdl = require('readline')

function print(str){
    process.stdout.write(str)
}

/**
 * 读入一行
 */
function readline() {
    const rl = rdl.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    return new Promise(resolve => {
        rl.on('line', (str) => {
            resolve(str)
            rl.close()
        })
    })
}


async function readNumber(){
    return +(await readline())
}


module.exports = {
    print,
    readline,
    readNumber
}