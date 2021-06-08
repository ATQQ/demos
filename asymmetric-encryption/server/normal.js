const http = require('http')
const { privDecrypt } = require('./utils/crypto')

const server = http.createServer((req, res) => {
    res.setHeader('content-type','application/json')
    let buffer = Buffer.alloc(0)
    req.on('data',(chunk)=>{
        buffer = Buffer.concat([buffer, chunk])
    })
    req.on('end',()=>{
        try {
            const data = privDecrypt(JSON.parse(buffer.toString('utf-8')).value)
            res.end(JSON.stringify(data))
        } catch (error) {
            console.log(error);
            res.end('error')            
        }
    })
})

// 启动
server.listen(3000, err => {
    console.log(`listen 3000 success`);
})