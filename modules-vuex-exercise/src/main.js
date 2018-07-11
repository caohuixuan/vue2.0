import Vue from 'vue'
import store from './store/index.js'
import One from './vue/one.vue'
new Vue({
	template:`
      <div>
       <h1>modules进行store分离</h1>
        <One></One>
      </div>
	`,
	components:{
      One
	},
    store
}).$mount('#app')