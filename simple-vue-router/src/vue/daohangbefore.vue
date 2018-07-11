<template>
<div>
<h2>导航完成前过去数据</h2>
<div>
<router-link to="/beforeone">beforeone</router-link>
<router-link to="/beforetwo">beforetwo</router-link>
<router-link to="/beforethree">beforethree</router-link>
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
import Beforeone from './beforeone.vue'
import Beforetwo from './beforetwo.vue'
import Beforethree from './beforethree.vue'
Vue.use(VueRouter)

const router=new VueRouter({
	routes:[
       {
          path:'/beforeone',
          component:Beforeone,
          props:{id:'one'}
       },
       {
          path:'/beforetwo',
          component:Beforetwo,
          props:{id:'two'}
       },
       {
          path:'/beforethree',
          component:Beforethree,
          props:{id:'three'}
       }
	]
})
export default{
	name:'daohangbefore',
	data(){
	  return{
	   loading:true,
	   post:null
	}
	},
	router,
	beforeRouteEnter(to,from,next){
	console.log(to.params.id)
        next()
	},
	beforeRouteUpdate(to,from,next){
        console.log(to.params.id)
        next()
	},
	beforeRouteLeave(to, from, next) {
    console.log(' beforeRouteLeave !', this)
    const answer = window.confirm('确认离开？')
    answer ? next() : next(false)
    },
    watch:{
       '$route'(to,from){
           console.log(to.path);
           this.getPost(to.path);
       }
    },
	methods:{
	   getPost(id){
	   let vm=this;
	      vm.loading=false;
	       if(id=='/beforeone'){
                vm.post={title:'one',body:'这是one'}
	       }else if(id=='/beforetwo'){
                 vm.post={title:'two',body:'这是two'}
	       }else{
               vm.post={title:'three',body:'这是three'}
	       }
	     }
	}
}
</script>