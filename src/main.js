import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vant from 'vant'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'vant/lib/index.css'
import {Lazyload} from "vant";

Vue.use(Lazyload);
Vue.use(vant).use(VueAwesomeSwiper);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router
}).$mount('#app');
