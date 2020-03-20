import Vue from 'vue'
import Router from 'vue-router'
import shoppingmall from '@/components/pages/ShoppingMall.vue'
import register from '@/components/pages/Register.vue'
Vue.use(Router)

const routes = (
    [
        { path: '/', name: 'shoppingmall',component: shoppingmall },
        { path: '/register', name: 'register',component: register },
]
)

const router = new Router({
    mode: 'history',
    routes
})
export default router