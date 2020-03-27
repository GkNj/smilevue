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
                        <van-tabs v-model="active">
                            <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                            </van-tab>
                        </van-tabs>
                    </div>
                    <div id="list-div">
                        <van-pull-refresh @refresh="onRefresh" v-model="isRefresh">
                            <van-list v-model="loading" :finished="finished" @load="onload">
                                <div class="list-item" v-for="(item,index) in list" :key="index">
                                    {{item}}
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

    export default {
        name: "CategoryList",
        data() {
            return {
                category: [],
                categoryIndex: 0,
                categorySub: [],
                active: 0,
                list: [],
                loading: false,//上拉加载使用
                finished: false,//上拉加载是否没有数据了
                isRefresh: false//下拉刷新
            }
        },
        created() {
            this.getCategoryList();
        },
        mounted() {
            let windowHeight = document.documentElement.clientHeight;
            document.getElementById('leftNav').style.height = windowHeight - 46 + 'px'
            document.getElementById('list-div').style.height = windowHeight - 90 + 'px'
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
                    Toast.fail('服务器错误')
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
                        this.categorySub = res.data.message
                    } else {
                        Toast.fail('服务器错误')
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            clickCategory(index, categoryId) {
                this.categoryIndex = index;
                this.getCategoryById(categoryId);
                this.active = 0;
            },
            /**
             * 上拉加载的方法
             */
            onload() {
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1)
                    }
                    this.loading = false;
                    if (this.list.length >= 40) {
                        this.finished = true
                    }
                }, 500)
            },
            onRefresh() {
                setTimeout(() => {
                    this.isRefresh = false;
                    this.list = [];
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

    .list-item {
        text-align: center;
        line-height: 80px;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
    }

    #list-div {
        overflow: scroll;
    }
</style>
