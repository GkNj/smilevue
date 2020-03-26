const baseUrl = '';
const LOCALURL = "http://localhost:8081/"
const URL = {
    getShoppingMall: baseUrl + '/index',
    getGoodsInfo: baseUrl + '/goodsInfo',
    getGoodsDetailInfo: LOCALURL + 'goods/getDetailGoodsInfo',
    registerUser: LOCALURL + 'user/register',
    loginUser: LOCALURL + 'user/login',
}

module.exports = URL;
