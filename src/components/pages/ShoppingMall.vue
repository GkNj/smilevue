<template>
    <div>
        <!--    搜索区域-->
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" width="80%">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <!--    轮播区域-->
        <div class="swipe-area">
            <van-swipe :autoplay="2000">
                <van-swipe-item v-for="(item,index) in bannerImg" :key="index">
                    <img v-lazy="item.image" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--    类型区域  type-bar-->
        <div class="type-bar">
            <div v-for="(item,index) in category" :key="index">
                <img v-lazy="item.image" width="90%">
                <span>{{item.mallCategoryName}}</span>
            </div>
        </div>
        <!--        广告小栏-->
        <div class="adBanner">
            <img v-lazy="adBanner" width="100%">
        </div>
        <!--        商品推荐-->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommend" :key="index">
                        <div class="swiper-item">
                            <img :src="item.image" width="80%">
                            <span>{{item.goodsName}}</span>
                            <span>￥{{item.price}}(￥{{item.mallPrice}})</span>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                locationIcon: require('../../assets/images/location.png'),
                bannerImg: [],
                category: [],
                adBanner: "",
                recommend: [],
                swiperOption: {
                    slidesPerView: 3
                }
            };
        },
        created() {
            axios({
                url: ' http://localhost:3000/data',
                method: 'get',
            }).then(res => {
                console.log(res);
                if (res.status == '200') {
                    this.bannerImg = res.data.slides;
                    this.category = res.data.category;
                    this.adBanner = res.data.advertesPicture.PICTURE_ADDRESS;
                    this.recommend = res.data.recommend;
                }
            }).catch(error => {
                console.log(error)
            })
        }
    };
</script>

<style scoped>
    .search-bar {
        height: 2.2rem;
        background-color: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }

    .search-input {
        width: 100%;
        line-height: 1.3rem;
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
        border-bottom: 1px solid #fff !important;
        background-color: #e5017d;
        color: #fff;
    }

    .swipe-area {
        clear: both;
        max-height: 15rem;
        overflow: hidden;
    }

    .type-bar {
        background-color: #fff;
        margin: 0 .3rem .3rem .3rem;
        border-radius: .3rem;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .type-bar div {
        padding: .3rem;
        font-size: 12px;
        text-align: center;
    }

    .recommend-area {
        background-color: #fff;
        margin-top: 0.3rem;
    }

    .recommend-title {
        color: #e5017d;
        font-size: 14px;
        border-bottom: 1px solid #eee;
        padding: .2rem;
    }
    .recommend-body{
        border-bottom: 1px solid #eee;
    }
    .swiper-item {
        width: 99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
    }

</style>
