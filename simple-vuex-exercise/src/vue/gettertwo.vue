<template>
<div>
<h2>通过方法访问</h2>
获得id是复数的list
<ul>
<li v-for="list in lists">{{list.id}}++{{list.content}} </li>
</ul>
</div>
</template>
<script>
export default{
	name:'gettertwo',
	computed:{
	  lists(){
	     let l=this.$store.state.lists.length
	     let ll=[]
	     for(let i=1;i<=l;i++){
	        if(i%2==0){
              ll.push(this.$store.getters.getId(i))
	        }
	     }
	     return ll
	  }
	}
}
</script>