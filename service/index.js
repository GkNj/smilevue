const Koa = require('koa')
const mongoose = require('mongoose')
const Router = require('koa-router')
const app = new Koa();
const bodyparser = require('koa-bodyparser')
const router = new Router();
//引入解决跨域问题
const cors = require('koa2-cors')
app.use(cors())
app.use(bodyparser())
const {
    connect,
    initSchemas
} = require('./database/init');

//引入user模块
let user = require('./Api/user')

//装载所有子路由
router.use('/user', user.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


;(async () => {
    await connect()
    initSchemas()
})()

app.use(async (ctx) => {
    ctx.body = "hahah"
})


app.listen(8081, () => {
    console.log("[service] is at starting at port 8081");
})