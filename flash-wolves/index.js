const { Fw, Router } = require('flash-wolves')
const app = new Fw()

app.get('/a/b', (req, res) => {
    console.log(req.query)
    res.success()
})

// 不带公共前缀Router
const user = new Router()

// GET /user/login
user.get('/user/login',(req,res)=>{
    res.success()
})

app.addRoutes(user.getRoutes())

// 带前缀Router
const task = new Router('task')

// GET /task/list
task.get('/list',(req,res)=>{
    res.success()
})
app.addRoutes(task.getRoutes())

app.get('/',(req,res)=>{
    res.json(app.getRoutes())
})
app.listen(3000)