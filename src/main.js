import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios)
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.baseURL="http://127.0.0.1:8000/";
axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = JSON.parse(sessionStorage.getItem("token")).token_num;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


// 全局引入wow,animate
import "animate.css"
import "wowjs/css/libs/animate.css"
import wow from 'wowjs'
// 作为一个$参数
Vue.prototype.$wow = wow
    // 引入jquery
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')