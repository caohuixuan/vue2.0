<template>
<div>
<h2>路由组件传参-使用prop取代$route 解除高耦合</h2>
<ul>
  <li><router-link to="/">/</router-link></li>
  <li><router-link to="/chuancan1/a">/chuancan1/a</router-link></li>
  <li><router-link to="/chuancan2">/chuancan2</router-link></li>
  <li><router-link to="/chuancan3/a">/chuancan3/a</router-link></li>
  <li><router-link to="/chuancan4">/chuancan4</router-link></li>
</ul>
<router-view></router-view>
</div>
</template>
<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Chuancanhello from './chuancanhello'
Vue.use(VueRouter);
function getNowtime (route) {
  const now = new Date()
  return {
    name: now.toString() + '!'
  }
}
const router=new VueRouter({
	mode:'history',
	base:__dirname,
	routes:[
	  {path:'/',component:Chuancanhello},
	  {path:'/chuancan1/:name',component:Chuancanhello,props:true},
	  {path:'/chuancan2',component:Chuancanhello,props:{name:'world'}},
	  {path:'/chuancan3/:time',component:Chuancanhello,props:getNowtime},
	  {path:'/chuancan4',component:Chuancanhello,props:{name:'attrs'}}
	]
})
export default{
	name:'chuancan',
	router
}
</script>