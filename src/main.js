import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


// 全局引入wow,animate
import "animate.css"
import "wowjs/css/libs/animate.css"
import wow from 'wowjs'
// 作为一个$参数
Vue.prototype.$wow = wow
    // 引入jquery


Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')