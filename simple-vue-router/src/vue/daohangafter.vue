<template>
<div>
<h2>导航完成后过去数据</h2>
<div>
<router-link to="/shuju/one">/shuju/one</router-link>
<router-link to="/shuju/two">/shuju/two</router-link>
<router-link to="/shuju/three">/shuju/three</router-link>
</div>
<div v-if="loading">Loading...</div>
<div v-if="post">
<router-view :page="post">
</router-view>
</div>
</div>
</template>
<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import After from './after.vue'
Vue.use(VueRouter)
const router=new VueRouter({
	routes:[
       {
       path:'/shuju/:id',
        name:'shuju',
        component:After,
        props:true
   }
	]
})

export default{
	name:'daohangafter',
	data(){
	return{
	  loading:false,
	  post:null
	}
	},
	router,
	watch:{
	'$route':'fetchData'
	},
	methods:{
	  fetchData(){
	     let vm=this;
	     this.post=null;
	     this.loading=true;
	  setTimeout(()=>getPost(vm.$route.params.id),3000)
	  function getPost(id){
	     console.log(id);
	      vm.loading=false;
	       if(id=='one'){
                vm.post={title:'one',body:'这是one'}
	       }else if(id=='two'){
                 vm.post={title:'two',body:'这是two'}
	       }else{
               vm.post={title:'three',body:'这是three'}
	       }
	     }
	  }

	}
}
</script>