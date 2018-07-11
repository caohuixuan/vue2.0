import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './vue/home.vue'
import Pageone from './vue/pageone.vue'
Vue.use(VueRouter);
const routes=[
    {path:'/home',component:Home},
    {path:'/pageone',component:Pageone,alias:'/page'},//别名
    {path:'/tohome',redirect:'/home'}//重定向
];
const router=new VueRouter({
/*	mode:'history',*/
	routes
})
const app=new Vue({
	router
}).$mount('#app')

