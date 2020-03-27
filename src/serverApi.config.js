const baseUrl = '';
const LOCALURL = "http://localhost:8081/";
const URL = {
    getShoppingMall: baseUrl + '/index',
    getGoodsInfo: baseUrl + '/goodsInfo',
    getGoodsDetailInfo: LOCALURL + 'goods/getDetailGoodsInfo',//得到商品详细数据
    getCategoryList: LOCALURL + 'goods/getCategoryList',//得到大类信息
    getCategorySubList: LOCALURL + 'goods/getCategorySubList',//得到小类信息
    getGoodsListByCategorySubId: LOCALURL + 'goods/getGoodsListByCategorySubId',//得到小类商品信息
    registerUser: LOCALURL + 'user/register',//注册接口
    loginUser: LOCALURL + 'user/login',//登录接口
};

module.exports = URL;
