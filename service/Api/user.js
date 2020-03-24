const Router = require('koa-router');
const mongoose = require('mongoose')

let router = new Router();

router.get('/', async (ctx) => {
    ctx.body = "这是个啥"
});

router.post('/register', async (ctx) => {
    //取得Model
    const User = mongoose.model('User')
    //把从前端接收的POST数据封装成一个新的user对象
    let newUser = new User(ctx.request.body)
    //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUser.save().then(() => {
        //成功返回code=200，并返回成功信息
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(error => {
        //失败返回code=500，并返回错误信息
        ctx.body = {
            code: 500,
            message: error
        }
    })
});

router.post('/login', async (ctx) => {
    let loginUser = ctx.request.body
    console.log(loginUser);

    const user = mongoose.model('User')
    let userName = loginUser.userName
    let password = loginUser.password
    //查找用户名，如果用户名存在然后比较密码
    await user.findOne({ userName: userName}).exec().then(async (result) => {
        console.log(result);
        if (result) {
            //当用户名存在时，开始比对密码
            let newUser = new user()
            await newUser.comparePassword(password, result.password).then((isMatch) => {
                ctx.body = {code: 200,message: isMatch  }
            }).catch((err) => {
                console.log(err);
                ctx.body = { code: 500, message: err }
            })
        } else {
            ctx.body = {code: 200,message: '用户不存在' }
        }
    }).catch(err => {
        ctx.body = {code: 500, message: err }
    })
})

module.exports = router;