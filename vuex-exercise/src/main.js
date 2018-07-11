import Vue from 'vue'
import store from './store/index.js'
import Clickalert from './components/buttons.vue'
import Formtext from './components/formtext.vue'
import myMap from './components/myMap.vue'
new Vue({
	template:`
      <div>
       <myMap></myMap>
      </div>
	`,
	components:{
         myMap
	},
    store
}).$mount('#app')