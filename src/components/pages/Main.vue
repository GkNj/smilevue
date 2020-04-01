<template>
    <div>
        <div class="main-div">
            <keep-alive>
                <router-view/>
            </keep-alive>

        </div>

        <van-tabbar v-model="active" @change="change(active)">
            <van-tabbar-item icon="shop">主页</van-tabbar-item>
            <van-tabbar-item icon="records">列表页</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>

</template>

<script>
    export default {
        name: "Main",
        data() {
            return {
                active: 0
            }
        },
        created() {
            this.changeActive()
        },
        methods: {
            /**
             * 判断路径来让导航栏跟随变化
             */
            changeActive() {
                let nowPath = this.$route.path;
                if (nowPath == '/cart') {
                    this.active = 2
                }
            },
            change(active) {
                console.log(active);
                switch (active) {
                    case 0:
                        this.$router.push({name: 'shoppingMall'})
                        break;
                    case 1:
                        this.$router.push({name: 'categoryList'})
                        break;
                    case 2:
                        this.$router.push({name: 'cart'})
                        break;
                    case 3:
                        this.$router.push({name: 'member'})
                        break;
                }
            }
        }
    }
</script>

<style scoped>

</style>
