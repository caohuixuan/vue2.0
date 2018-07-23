import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions'
import getters from './getters.js'
Vue.use(Vuex)
const state={
	userState:null,//用户登录状态
	searchHistoryLists:[],//地点搜索历史
	myCity:'',//所在城市
	myPoint:null,//搜索的位置
	myCard:{},//购物车
};
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})