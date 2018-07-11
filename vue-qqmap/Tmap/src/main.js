// vue结合腾讯地图进行页面开发，实现网点查询，列表展示，路径规划等功能
// 根据单号实现轨迹查询，实时位置查询等功能
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
