import Vue from 'vue'
import VueRouter from 'vue-router'
import Daohangbefore from './vue/daohangbefore.vue'
import Daohangafter from './vue/daohangafter.vue'
new Vue({
	el:'#five',
	template:'<div><h1>数据获取</h1><Daohangbefore></Daohangbefore><hr/><Daohangafter></Daohangafter></div>',
	components:{
		Daohangafter,
		Daohangbefore
	}
})