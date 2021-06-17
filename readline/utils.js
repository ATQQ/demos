const readline = require('./readline')

function print(str){
    process.stdout.write(str)
}

async function readNumber(){
    return +(await readline())
}

module.exports = {
    print,
    readNumber
}