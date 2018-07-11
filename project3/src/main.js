import Vue from 'vue'
import App from './vue/App.vue'
import '!style-loader!css-loader!./css/firseCss.css';
new Vue({
  el: '#app',
  render: h => h(App)
})
