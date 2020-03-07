import Vue from 'vue'
import Router from 'vue-router'
import shoppingmall from '@/components/pages/ShoppingMall.vue'
Vue.use(Router)

const routes = (
    [{
        path: '/',
        name: 'shoppingmall',
        component: shoppingmall
    }]
)

const router = new Router({
    mode: 'history',
    routes
})
export default router