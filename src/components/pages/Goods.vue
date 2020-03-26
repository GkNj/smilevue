<template>
    <div>
        <div class="navBar">
            <van-nav-bar
                    title="商品详情"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div class="topImage">
            <img :src="goodsInfo.IMAGE1" alt="" width="100%">
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
        <div>
            <van-tabs>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.DETAIL">
                    </div>
                </van-tab>
                <van-tab title="评价">
                    正在制作中
                </van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">

            <div>
                <van-button size="large" type="primary">
                    加入购物车
                </van-button>
            </div>
            <div>
                <van-button size="large" type="danger">
                    直接购买
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import api from '../../serverApi.config.js'
    import {Toast} from "vant";
    import {toMoney} from '../filter/moneyFilter.js'

    export default {
        name: "Goods",
        data() {
            return {
                goodsId: '775e575ce28a4f89b1dfe2c99eb08ae7',
                goodsInfo: {}
            }
        },
        created() {
            this.getInfo()
        },
        methods: {
            getInfo() {
                axios({
                    url: api.getGoodsDetailInfo,
                    method: 'post',
                    data: {
                        goodsId: this.goodsId
                    }
                }).then((res) => {
                    // console.log(res)
                    if (res.data.code === 200 && res.data.message) {
                        this.goodsInfo = res.data.message
                    } else {
                        Toast.success('服务器错误，获取数据失败')
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            onClickLeft() {
                this.$router.go(-1)
            }
        },
        filters: {
            moneyFilter: function (money) {
                return toMoney(money)
            }
        },

    }
</script>

<style scoped>
    .detail {
        font-size: 0px;
    }

    .goods-name {
        background-color: #fff;
    }

    .goods-price {
        background-color: #fff;
    }

    .goods-bottom {
        /*
        fixed相对于浏览器窗口定位
        */
        position: fixed;
        bottom: 0px;
        left: 0px;
        background-color: #fff;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
    }

    .goods-bottom div {
        flex: 1;
        padding: 5px;
    }
</style>
