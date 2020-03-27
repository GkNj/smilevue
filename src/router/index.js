import Vue from 'vue'
import Router from 'vue-router'
import shoppingMall from '@/components/pages/ShoppingMall.vue'
import register from '@/components/pages/Register.vue'
import login from '@/components/pages/Login.vue'
import goods from '@/components/pages/Goods.vue'
import categoryList from '@/components/pages/CategoryList.vue'
Vue.use(Router);

const routes = (
    [
        { path: '/', name: 'shoppingMall',component: shoppingMall },
        { path: '/register', name: 'register',component: register },
        { path: '/login', name: 'login',component: login },
        { path: '/goods', name: 'goods',component: goods },
        { path: '/categoryList', name: 'categoryList',component: categoryList },
]
)

const router = new Router({
    mode: 'history',
    routes
})
export default router
