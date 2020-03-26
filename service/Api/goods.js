const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');
let router = new Router();

/**
 * 把json数据存入数据库
 */
router.get('/insertAllGoodsInfo', async (ctx) => {
    fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
        let newData = JSON.parse(data);
        let Goods = mongoose.model('Goods');
        let saveCount = 0;
        newData.map((value, index) => {
            let goods = new Goods(value);
            goods.save().then(() => {
                saveCount++;
                console.log('成功' + saveCount)
            }).catch(error => {
                console.log('失败：' + error)
            })
        })
    });
    ctx.body = "数据导入"
});
/**
 * 获取商品详情信息接口
 */
router.post('/getDetailGoodsInfo', async (ctx) => {
    let goodsId = ctx.request.body.goodsId;
    console.log('-------------'+goodsId)
    const Goods = mongoose.model('Goods');
    await Goods.findOne({ID: goodsId}).exec().then((result) => {
        ctx.body = {
            code: 200,
            message: result
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })
})


module.exports = router;
