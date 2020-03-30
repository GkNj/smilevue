<template>
    <div>
        <div class="navBar">
            <van-nav-bar title="类别列表"/>
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li @click="clickCategory(index,item.ID)" :class="{cateGoryActive:categoryIndex==index}"
                                v-for="(item,index) in category" :key="index">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="onClickCateGorySub">
                            <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                            </van-tab>
                        </van-tabs>
                    </div>
                    <div id="list-div">
                        <van-pull-refresh @refresh="onRefresh" v-model="isRefresh">
                            <van-list v-model="loading" :finished="finished" @load="onload">
                                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodsList"
                                     :key="index">
                                    <div class="list-item-img">
                                        <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
                                    </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div class="">￥{{item.ORI_PRICE|toMoney}}</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import api from '../../serverApi.config'
    import {Toast} from 'vant'
    import {toMoney} from '../filter/moneyFilter.js'

    export default {
        name: "CategoryList",
        data() {
            return {
                category: [],
                categoryIndex: 0,
                categorySub: [],
                active: 0,
                loading: false,//上拉加载使用
                finished: false,//上拉加载是否没有数据了
                isRefresh: false,//下拉刷新
                page: 1,//商品列表的页数
                goodsList: [],//商品信息
                categorySubId: '',//商品子类的id
                errorImg: 'this.src= "' + require('../../assets/images/errorimg.png') + '"'
            }
        },
        created() {
            this.getCategoryList();
        },
        mounted() {
            let windowHeight = document.documentElement.clientHeight;
            document.getElementById('leftNav').style.height = windowHeight - 46 + 'px';
            document.getElementById('list-div').style.height = windowHeight - 90 + 'px'
        },
        filters: {
            toMoney(money) {
                return toMoney(money)
            }
        },
        methods: {
            /**
             * 获取商品大类列表
             */
            getCategoryList() {
                axios({
                    url: api.getCategoryList,
                    method: 'get'
                }).then((res) => {
                    console.log(res);
                    if (res.data.code === 200 && res.data.message) {
                        this.category = res.data.message;
                        this.getCategoryById(this.category[0].ID)
                    } else {
                        Toast.fail('服务器错误')
                    }
                }).catch((err) => {
                    Toast.fail('服务器错误');
                    console.log(err);
                })
            },
            /**
             * 通过大类ID读取小类列表
             * @param categoryId
             */
            getCategoryById(categoryId) {
                axios({
                    url: api.getCategorySubList,
                    method: 'post',
                    data: {categoryId: categoryId}
                }).then(res => {
                    if (res.data.code === 200 && res.data.message) {
                        this.categorySub = res.data.message;
                        this.categorySubId = this.categorySub[0].ID;
                        this.onload()
                    } else {
                        Toast.fail('服务器错误')
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            /**
             * 获得子类商品信息
             * */
            getGoodList() {
                axios({
                    url: api.getGoodsListByCategorySubId,
                    method: 'post',
                    data: {
                        page: this.page,
                        categorySubId: this.categorySubId
                    }
                }).then(res => {
                    console.log(res);
                    if (res.data.code === 200 && res.data.message.length) {
                        this.page++;
                        this.goodsList = this.goodsList.concat(res.data.message)
                    } else {
                        this.finished = true
                    }
                    this.loading = false
                }).catch(err => {
                    console.log(err)
                })
            },
            /**
             * 点击子类获取对应类别商品信息
             * */
            onClickCateGorySub(index) {
                this.categorySubId = this.categorySub[index].ID;
                console.log(this.categorySubId);
                this.goodsList = [];
                this.finished = false;
                this.page = 1;
                this.onload();
            },
            /**
             * 点击大类的方法
             * */
            clickCategory(index, categoryId) {
                this.categoryIndex = index;
                this.goodsList = [];
                this.finished = false;
                this.page = 1;
                this.getCategoryById(categoryId);
                this.active = 0;
            },
            /**
             *
             * */
            goGoodsInfo(id) {
                this.$router.push({name: 'goods', params: {goodsId: id}})
            },
            /**
             * 上拉加载的方法
             */
            onload() {
                setTimeout(() => {
                    this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID;
                    this.getGoodList()
                }, 1000)
            },
            /**
             * 上拉刷新
             */
            onRefresh() {
                setTimeout(() => {
                    this.isRefresh = false;
                    this.finished = false;
                    this.goodsList = [];
                    this.page = 1;
                    this.onload()
                }, 500)
            }
        }
    }
</script>

<style scoped>
    #leftNav {
        background-color: aliceblue;
    }

    #leftNav ul li {
        line-height: 2rem;
        border-bottom: 1px solid #E4E7Ed;
        padding: 3px;
        font-size: 0.8rem;
        text-align: center;
    }

    .cateGoryActive {
        background-color: #fff;
    }

    #list-div {
        overflow: scroll;
    }

    .list-item {
        display: flex;
        flex-direction: row;
        font-size: 0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding: 5px;
    }

    .list-item-img {
        flex: 8;
    }

    .list-item-text {
        flex: 16;
        margin-top: 10px;
        margin-left: 10px;
    }
</style>
