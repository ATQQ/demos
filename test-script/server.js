const http = require('http')

const fs = require('fs')
const app = http.createServer((req, res) => {
    res.writeHead(200,
        {
            'Content-Type': 'application/javascript; charset=UTF-8',
            "cache-control": "no-cache"
        }
    )
    res.write(fs.readFileSync('./index.js',{encoding:'utf-8'}))
    res.end()
})

app.listen(3000)
