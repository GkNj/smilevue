<template>
    <div class="goods_info">
        <div class="goods_image">
            <img :src="goodsImage" width="100%">
        </div>
        <div class="goods_name">{{goodsName}}</div>
        <div class="goods_price">￥{{goodsPrice | moneyFilter}}</div>

    </div>
</template>

<script>
    import {toMoney} from '../filter/moneyFilter'

    export default {
        props: ['goodsImage', "goodsName", 'goodsPrice'],
        name: "goodInfoComponent",
        filters: {
            moneyFilter: function (money) {
                return toMoney(money)
            }
        }
    }
</script>

<style scoped>
    .goods_info {
        text-align: center;
    }

    .goods_name {
        padding: 0 8px;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        /*规定不换行*/
        white-space: nowrap;
    }
</style>
