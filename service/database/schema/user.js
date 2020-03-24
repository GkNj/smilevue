const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
let ObjectId = Schema.Types.ObjectId
//创建用户的schema
const userSchema = new Schema({
    userId: {
        type: ObjectId
    },
    userName: {
        unique: true,
        type: String
    },
    password: String,
    createAt: {
        type: Date,
        default: Date.now()
    }
})
//剪头函数中this的指向要注意，箭头函数中this的指向是继承外层作用域的，如果使用箭头函数this和对象方法在调用时所处
//环境一致。

//每次存储数据时都要执行
userSchema.pre('save', function (next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            this.password = hash
            next()
        })
    })
})
//验证密码
userSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}


//发布模型
mongoose.model('User', userSchema)