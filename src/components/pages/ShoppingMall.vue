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
                            <span>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</span>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!--        休闲食品楼层-->
        <floor-component :floorData="floor1" :floorName="floor1_name"></floor-component>
        <!--        新鲜水果楼层-->
        <floor-component :floorData="floor2" :floorName="floor2_name"></floor-component>
        <!--        营养奶品楼层-->
        <floor-component :floorData="floor3" :floorName="floor3_name"></floor-component>
        <!--热销商品-->
        <div class="hotGoods">
            <div class="hootGoods_title">
                热销商品
            </div>
            <div class="hootGoods_body">
                <van-list>
                    <!--                    列与列之间的间距为20px-->
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index"
                                 @click="gotoGoodsInfo(item.goodsId)">
                            <goods-info :goodsImage="item.image" :goodsName="item.name"
                                        :goodsPrice="item.price">
                            </goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios'
    import floorComponent from "../component/floorComponent";
    import goodsInfo from "../component/goodInfoComponent";
    import {toMoney} from '../filter/moneyFilter'

    export default {
        data() {
            return {
                swiperOption: {
                    slidesPerView: 3
                },
                locationIcon: require('../../assets/images/location.png'),
                bannerImg: [],
                category: [],
                adBanner: "",
                recommend: [],
                floor1: [],
                floor2: [],
                floor3: [],
                floor1_name: {},
                floor2_name: {},
                floor3_name: {},
                floor1_0: {},
                floor1_1: {},
                floor1_2: {},
                hotGoods: []
            };
        },
        filters: {
            moneyFilter: function (money) {
                return toMoney(money)
            }
        },
        methods: {
            gotoGoodsInfo(id) {
                this.$router.push({name: 'goods', params: {goodsId: id}})
            }
        },
        components: {
            floorComponent,
            goodsInfo
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
                    this.floor1 = res.data.floor1;
                    this.floor2 = res.data.floor2;
                    this.floor3 = res.data.floor3;
                    this.floor1_name = res.data.floorName.floor1;
                    this.floor2_name = res.data.floorName.floor2;
                    this.floor3_name = res.data.floorName.floor3;
                    this.floor1_0 = res.data.floor1[0];
                    this.floor1_1 = res.data.floor1[1];
                    this.floor1_2 = res.data.floor1[2];
                    this.hotGoods = res.data.hotGoods;

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

    .recommend-body {
        border-bottom: 1px solid #eee;
    }

    .swiper-item {
        width: 99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
    }


    .hotGoods {
        background-color: #fff;
        height: 130rem;
        overflow: hidden;
        font-size: 14px;
    }

    .hotGoods .hootGoods_title {
        font-size: 14px;
        text-align: center;
        background-color: #ddd;
        line-height: 1.8rem;
        height: 1.8rem;
    }

</style>
