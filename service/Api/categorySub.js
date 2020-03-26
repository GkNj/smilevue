const mongoose = require('mongoose');
const Router = require('koa-router');
const fs = require('fs');
let router = new Router();

router.get('/insertAllCategorySub', async (ctx) => {

    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        // console.log(data);
        let CategorySub = mongoose.model('CategorySub');
        data.RECORDS.map((value,index) => {
            let newCategorySub = new CategorySub(value);
            newCategorySub.save().then(() => {
                console.log('添加成功')
            }).catch((err) => {
                console.log(err)
            })
        })
    });
    ctx.body = "正在导入数据"
});
module.exports = router;
