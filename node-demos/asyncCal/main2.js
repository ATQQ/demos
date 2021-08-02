const http = require('http');
const c_process = require('child_process')
/**
 * 创建 http 服务，简单返回
 */
const server = http.createServer((req, res) => {
    Promise.all([getMaxNum(),getMaxNum(),getMaxNum(), getMaxNum()]).then((values) => {
        let sum = values.reduce(function (prev, curr, idx, arr) {
            return parseInt(prev) + parseInt(curr);
        })
        res.write(`${sum}`);
        res.end();
    })
});

function getMaxNum() {
    return new Promise(res => {
        c_process.exec('node asyncCal/child.js',function (err,stdout){
            res(+stdout)
        })
    })
}

/**
 * 启动服务
 */
server.listen(4000, () => {
    console.log('server start http://127.0.0.1:4000');
});