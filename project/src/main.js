import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router.js'
import store from './store/index.js'
import {routerMode} from './config/env.js'
import FastClick from 'fastclick'
import './style/common.scss'
//移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件，使用FastClick即可立即触发点击事件
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
Vue.use(VueRouter)
const router=new VueRouter({
	routes,
	mode:routerMode,
	//严格模式设置
	strict: process.env.NODE_ENV !== 'production',
	//作用：例如一个列表页，滑动了很多，点进去、再返回记录刚刚的位置
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})
new Vue({
	router,
	store
}).$mount('#app')