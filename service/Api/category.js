const mongoose = require('mongoose');
const Router = require('koa-router');
const fs = require('fs');
let router = new Router();

router.get('/insertAllCategory', async (ctx) => {

    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let Category = mongoose.model('Category');
        data.RECORDS.map((value, index) => {
            let newCategory = new Category(value);
            newCategory.save().then(() => {
                console.log('添加成功')
            }).catch((err) => {
                console.log(err)
            })
        })

    });
    ctx.body = "导数据"
});
module.exports = router;
