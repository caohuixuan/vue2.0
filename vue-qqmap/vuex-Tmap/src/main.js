import Vue from 'vue';
import store from './store/index.js';
import myMap from './components/mymap.vue';
import Formtext from './components/formtext.vue';
import '!style-loader!css-loader!less-loader!./css/main.less';
new Vue({
	template:`
      <div>
       <h1>网点查询</h1>
       <myMap></myMap>
      </div>
	`,
	components:{
      myMap
	},
  store
}).$mount('#app')