const rdl = require('readline')

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

module.exports = readline