const express = require('express')
const { privDecrypt } = require('./utils/crypto')

const server = express()

server.use(express.urlencoded({ extended: false }))
server.use(express.json({ strict: true }))

// 首先进入的路由
server.route('*').all((req, res, next) => {
    console.log(`${req.method}--${req.url}`)
    req.body = JSON.parse(privDecrypt(req.body.value))
    next()
})

server.post('/test/demo',(req,res)=>{
    res.json(req.body)
})

// 启动
server.listen(3000, err => {
    console.log(`listen 3000 success`);
})