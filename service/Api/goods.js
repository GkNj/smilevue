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
});
/**
 * 获取商品列表
 */
router.get('/getCategoryList', async (ctx) => {
    try {
        let category = mongoose.model('Category');
        let result = await category.find().exec();
        ctx.body = {
            code: 200,
            message: result
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
});
/**
 * 获取商品子类列表
 */
router.post('/getCategorySubList', async (ctx) => {
    try {
        let categoryId = ctx.request.body.categoryId;
        let CateGorySub = mongoose.model('CategorySub');
        let result = await CateGorySub.find({MALL_CATEGORY_ID: categoryId});
        ctx.body = {
            code: 200,
            message: result
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
});
/**
 * 通过商品子类id得到小类商品信息
 */
router.post('/getGoodsListByCategorySubId', async (ctx) => {
    try {
        let categorySubId = ctx.request.body.categorySubId;//小类别
        let num = 10;//每页的数据条数
        let page = ctx.request.body.page;//前台传的页数
        let start = (page - 1) * num;//后台查询开始位置
        const Goods = mongoose.model('Goods');
        let result = await Goods.find({SUB_ID: categorySubId}).skip(start).limit(num).exec();
        ctx.body = {
            code: 200,
            message: result
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
});

module.exports = router;
