import Vue from 'vue'
import VueRouter from 'vue-router'
import Mingming from './vue/mingming.vue'
Vue.use(VueRouter);
new Vue({
	el:'#two',
	render:h=>h(Mingming)
})