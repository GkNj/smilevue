import Vue from 'vue'
import Router from 'vue-router'
import shoppingMall from '@/components/pages/ShoppingMall.vue'
import register from '@/components/pages/Register.vue'
import login from '@/components/pages/Login.vue'
import goods from '@/components/pages/Goods.vue'
import categoryList from '@/components/pages/CategoryList.vue'
import cart from '@/components/pages/Cart.vue'
import main from '@/components/pages/Main.vue'
import member from '@/components/pages/Member.vue'

Vue.use(Router);

const routes = (
    [
        {
            path: '/main', name: 'main', component: main,
            children: [
                {path: '/', name: 'shoppingMall', component: shoppingMall},
                {path: '/categoryList', name: 'categoryList', component: categoryList},
                {path: '/cart', name: 'cart', component: cart},
                {path: '/member', name: 'member', component: member},
            ]
        },
        {path: '/register', name: 'register', component: register},
        {path: '/login', name: 'login', component: login},
        {path: '/goods', name: 'goods', component: goods},

    ]
)

const router = new Router({
    mode: 'history',
    routes
});
export default router
