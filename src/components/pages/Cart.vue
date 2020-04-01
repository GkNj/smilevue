<template>
    <div>
        <div class="navBar">
            <van-nav-bar title="购物车"/>
        </div>
        <!--        清空购物车-->
        <div class="cart-title">
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
        <!--        购物车列表-->
        <div class="cart-list">
            <div class="row" v-for="(item,index) in cartInfo" :key="index">
                <div class="img">
                    <img :src="item.image" width="100%">
                </div>
                <div class="text">
                    <div class="goods-name">{{item.Name}}</div>
                    <div class="control">
                        <van-stepper v-model="item.count"/>
                    </div>
                </div>
                <div class="price">
                    <div>￥{{item.price|moneyFilter}}</div>
                    <div>x{{item.count}}</div>
                    <div class="allMoney">￥{{item.price*item.count|moneyFilter}}</div>
                </div>
            </div>
        </div>
        <div class="totalMoney">
            商品总价：￥{{totalMoney | moneyFilter}}
        </div>
    </div>
</template>

<script>
    import {toMoney} from "../filter/moneyFilter";

    export default {
        name: "Cart",
        data() {
            return {
                cartInfo: [],
                isEmpty: false
            }
        },
        computed: {
            /**
             * 计算商品总价格
             * @returns {number}
             */
            totalMoney() {
                let allMoney = 0;
                this.cartInfo.forEach((item) => {
                    allMoney += item.price * item.count;
                });
                localStorage.cartInfo = JSON.stringify(this.cartInfo);
                return allMoney
            }
        },
        filters: {
            /**
             * 价格过滤器
             * @param money
             * @returns {*}
             */
            moneyFilter(money) {
                return toMoney(money)
            }
        },
        created() {
            this.getCartInfo()
        },
        methods: {
            getCartInfo() {
                if (localStorage.cartInfo) {
                    this.cartInfo = JSON.parse(localStorage.cartInfo)
                }
                console.log('this.cartInfo:' + JSON.stringify(this.cartInfo));
                this.isEmpty = this.cartInfo.length > 0 ? true : false
            },
            clearCart() {
                localStorage.removeItem('cartInfo');
                this.cartInfo = [];
            }
        }
    }
</script>

<style scoped>
    .cart-title {
        background-color: #fff;
        height: 2rem;
        line-height: 2rem;
        padding: 5px;
        border-bottom: 1px solid #E4E7Ed;
        text-align: right;

    }

    .cart-list {
        background-color: #fff;
    }

    .row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 0.5rem;
        font-size: 0.85rem;
    }

    .img {
        flex: 6;
    }

    .text {
        flex: 14;
        padding-left: 10px;
    }

    .control {
        padding-top: 10px;
    }

    .price {
        flex: 4;
        text-align: right;
    }

    .allMoney {
        color: red;
    }

    .totalMoney {
        text-align: right;
        background-color: #fff;
        border-bottom: 1px solid #E4E7ED;
        padding: 5px;
    }
</style>
