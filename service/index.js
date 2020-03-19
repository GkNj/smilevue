const Koa = require('koa')
const mongoose = require('mongoose')
const app = new Koa();
const {
    connect,
    initSchemas
} = require('./database/init');

;
(async () => {
    await connect()
    initSchemas()
    const User = mongoose.model('User')
    let OneUser = new User({
        userName: 'gaokai',
        password: '123456'
    })
    OneUser.save().then(() => {
        console.log('插入成功！');
    })
})()

app.use(async (ctx) => {
    ctx.body = "hahah"
})


app.listen(3000, () => {
    console.log("[service] is at starting at port 3000");

})