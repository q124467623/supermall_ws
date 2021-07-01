import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'

import Fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import toast from '@/components/common/toast'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//安装vue-lazyload:
Vue.use(VueLazyload, {
    loading: require('@/assets/img/common/placeholder.png')
})

//解决移动端300ms延迟
Fastclick.attach(document.body)

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')