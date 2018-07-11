<template>
<div>
<h1>路由的过渡动效</h1>
<ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/parent">/parent</router-link></li>
        <li><router-link to="/parent/foo">/parent/foo</router-link></li>
        <li><router-link to="/parent/bar">/parent/bar</router-link></li>
      </ul>
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
</div>
</template>
<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './home.vue'
import Parent from './parent.vue'
Vue.use(VueRouter)
const Default = { template: '<div class="default">default</div>' }
const Foo = { template: '<div class="foo">foo</div>' }
const Bar = { template: '<div class="bar">bar</div>' }
const router=new VueRouter({
	mode:'history',
	base:__dirname,
	routes:[
       {
           path:'/',component:Home
       },
       {
           path:'/parent',component:Parent,
           children:[
             {path:'',component:Default},
             {path:'foo',component:Foo},
             {path:'bar',component:Bar}
           ]
       }
	]
})
export default{
	name:'dongxiao',
	router
}
</script>
<style src='../css/transition.css' lang='css'></style>