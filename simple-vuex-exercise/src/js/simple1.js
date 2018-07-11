import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
Vue.use(Vuex)
const store1=new Vuex.Store({
	state:{
		count:0
	},
	mutations:{
		incremet(state){
			state.count++
		}
	}
})
console.log(store1.state.count)
store1.commit('incremet')
console.log(store1.state.count)