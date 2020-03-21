const baseUrl = '';
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMall: baseUrl + '/index',
    getGoodsInfo: baseUrl + '/goodsInfo',
    registerUser: LOCALURL + 'user/register'
}

module.exports = URL;