import Vue from 'vue'
import VueRouter from 'vue-router'
const Lanone=()=>import(/* webpackChunkName: "Lanone" */ './vue/lanone.vue')
const Lantwo=()=>import(/* webpackChunkName: "Lantwo" */ './vue/lantwo.vue')
const Lanthree=()=>import(/* webpackChunkName: "Lanthree" */ './vue/lanthree.vue')
Vue.use(VueRouter)

const router=new VueRouter({
	mode:'history',
	base:__dirname,
	routes:[
      {path:'/lanone',component:Lanone},
      {path:'/lantwo',component:Lantwo},
      {path:'/lanthree',component:Lanthree}
	]
})
new Vue({
	router,
	template:`
     <div>
      <h1>懒加载</h1>
      <ul>
     <li><router-link to='/lanone'>/lanone</router-link></li>
     <li><router-link to='/lantwo'>/lantwo</router-link></li>
     <li><router-link to='/lanthree'>/lanthree</router-link></li>
      </ul>
      <router-view></router-view>
     </div>
	`
}).$mount("#seven")