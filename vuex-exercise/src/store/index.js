import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'

import myPlugin from './plugins/myPlugin.js'
Vue.use(Vuex)
export default new Vuex.Store({
	//严格模式:在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。
	//不要在发布环境下启用严格模式以避免性能损失。
	strict:process.env.NODE_ENV !== 'production',
	state:{
		qq:{},//qq对象
    myPosition:{},//我的位置
    myAddress:'',//我的位置信息
    ZIndex:10,
    myMap:{},//我的地图
	},
	mutations:mutations,
	actions:actions,
	plugins:[myPlugin]
})

//热重载
if (module.hot) {
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
}