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
        <div class="goods-price">价格：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
        <div>
            <van-tabs swipeable sticky>
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
                <van-button size="large" type="primary" @click="addGoodsToCart">
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
                goodsId: '',
                goodsInfo: {}
            }
        },
        created() {
            this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId;
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
                        Toast.fail('服务器错误，获取数据失败')
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            /**
             * 添加商品到购物车
             */
            addGoodsToCart() {
                // localStorage.removeItem('cartInfo');
                //取出购物车的商品数据
                console.log(localStorage.cartInfo + '--------------')
                let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : [];
                console.log(cartInfo);
                //判断购物车内是否有当前商品，如果有显示已有此商品，如果没有，则添加
                let isHaveGoodsInfo = cartInfo.find(cart => cart.goodsId === this.goodsId);
                console.log(isHaveGoodsInfo);
                if (!isHaveGoodsInfo) {
                    let newGoodsInfo = {
                        goodsId:this.goodsInfo.ID,
                        Name:this.goodsInfo.NAME,
                        price:this.goodsInfo.PRESENT_PRICE,
                        image:this.goodsInfo.IMAGE1,
                        count:1
                    };
                    cartInfo.push(newGoodsInfo);//添加到购物车
                    localStorage.cartInfo = JSON.stringify(cartInfo);//操作本地数据库
                    Toast.success('添加成功')
                } else {
                    Toast.fail('已有此商品')
                }
                this.$router.push('/cart')
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
