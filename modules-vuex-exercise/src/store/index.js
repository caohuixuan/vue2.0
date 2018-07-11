import Vue from 'vue'
import Vuex from 'vuex'
import modelone from './mudelone.js'
import modeltwo from './mudeltwo.js'
Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		count:0,
		show:"这是根节点的show"
	},
	mutations:{
		mulalert:(state)=>{
            console.log(state.one.show);
		}
	},
	modules:{
		one:modelone,
		two:modeltwo
	}
})