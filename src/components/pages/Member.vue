<template>
    <div>
        <div>
            <van-nav-bar title="个人中心"></van-nav-bar>
        </div>
        <div class="top">
            <img class="top-image"
                 src="https://user-gold-cdn.xitu.io/2019/12/25/16f3b46adf98ff6c?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
                 alt="">
        </div>
        <div class="login">
            <div>
                <van-button type="warning">我要登录</van-button>
            </div>
            <div>
                <van-button type="primary">我要注册</van-button>
            </div>
        </div>
        <div>
            <van-cell-group>
                <van-cell title="会员卡" is-link></van-cell>
                <van-cell title="地址管理" is-link></van-cell>
                <van-cell title="我的订单" is-link></van-cell>
                <van-cell title="会员权益" is-link></van-cell>
                <van-cell title="连续我们" is-link></van-cell>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Member"
    }
</script>

<style scoped>
    .top {
        height: 5rem;
        text-align: center;
        padding-top: 2rem;
        background-color:  darkseagreen;
    }

    .top-image {
        height: 70px;
        width: 70px;
        border-radius: 50px;

    }

    .login {
        display: flex;
        flex-direction: row;
        background-color: #fff;
        padding: 10px;
    }

    .login div {
        flex: 1;
        text-align: center;
    }
</style>
