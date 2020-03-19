const mongoose = require('mongoose')
const db = 'mongodb://localhost/smile-db'
const glob=require('glob')
const {resolve} = require('path')

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db)
        let maxConnectTimes = 0
        //监听事件
        mongoose.connection.on('disconnected', () => {
            if (maxConnectTimes < 3) {
                maxConnectTimes++;
                mongoose.connect(db);
            } else {
                reject();
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......');
            }

        })
        mongoose.connection.on('error', err => {
            console.log('***********数据库错误***********')
            if (maxConnectTimes < 3) {
                maxConnectTimes++;
                mongoose.connect(db);
            } else {
                reject(err);
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......');
            }
        })

        mongoose.connection.once('open', () => {
            console.log('mongodb is connected successfuly');
            resolve();
        })
    })

}