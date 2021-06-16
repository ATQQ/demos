const express = require('express')
const path = require('path')
const app = express()

// Routes
app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/random/code',(req,res)=>{
  res.send({
    num:Math.random()
  })
})
app.post('/user/login', (req, res) => {
  res.send({
    code:0,
    data:{
      token:'test-token'
    },
    msg:'ok'
  })
})

app.get('/404', (req, res) => {
  res.status(404).send('Not found')
})

// Error handler
app.use(function(err, req, res, next) {
  console.error(err)
  res.status(500).send('Internal Serverless Error')
})

app.listen(8080)

module.exports = app
