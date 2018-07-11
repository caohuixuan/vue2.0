import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import first from './modules/first.js'
import second from './modules/second.js'
import myPlugin from './plugins/myPlugin.js'
Vue.use(Vuex)
export default new Vuex.Store({
	//严格模式:在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。
	//不要在发布环境下启用严格模式以避免性能损失。
	strict:process.env.NODE_ENV !== 'production',
	state:first,
  getters:{
    //getCount:(state)=>state.count==0?0:state.count
  },
	mutations:mutations,
	actions:actions,
/*	modules:{
		one:first,
		two:second
	}*/
  plugins:[myPlugin]
})

//热重载
/*if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./mutations.js', './actions.js','./modules/first.js','./modules/second.js'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newMutations = require('./mutations.js').default
    const newModuleA = require('./modules/first.js').default
    const newActions = require('./actions.js').default
    const newModuleB = require('./modules/second.js').default
    // 加载新模块
    store.hotUpdate({
      mutations: newMutations,
      actions:newActions,
      modules: {
        one: newModuleA,
        two:newModuleB
      }
    })
  })
}*/