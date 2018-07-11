import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router.js'
import store from './store/index.js'
import './style/common.less'
Vue.use(VueRouter)
const router=new VueRouter({
	routes
})

new Vue({
   router,
   store
}).$mount('#app')