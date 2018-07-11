import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './vue/home.vue'
import Pageone from './vue/pageone.vue'
Vue.use(VueRouter)
const One={
	template:'<div><h2>user {{$route.params.id}}</h2><router-view></router-view></div>',
	watch:{
	'$route'(to,from){
		console.log(this.$route.params.id);
	}
	}
}
const oneNone={template:'<div>没有子路径</div>'};
const twoOne={template:'<div>twoOne</div>'};
const twoTwo={template:'<div>twoTwo</div>'};
const router=new VueRouter({
/*  mode:'history',*/
	routes:[
       {path:'/user/:id',
        name:'user',
        component:One,
        children:[
            {path:'',component:oneNone},
            {path:'one',component:twoOne},
            {path:'two',component:twoTwo}
        ]
   }
	]
})
const one=new Vue({
 router
}).$mount('#one')