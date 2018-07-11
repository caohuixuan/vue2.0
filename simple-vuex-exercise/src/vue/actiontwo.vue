<template>
<div>
<h2>组合action</h2>
<button @click="one">触发actone</button>
<button @click="two">触发acttwo</button>
<button @click="three">触发actone后本组件操作</button>
</div>
</template>
<script>
export default{
	name:"actiontwo",
	methods:{
	 one(){
        this.$store.dispatch('actone')
	 },
	 two(){
        this.$store.dispatch('acttwo')
	 },
	 three(){
	    this.$store.dispatch('actone').then(()=>{
	      console.log("本组件的three")
	    })
	 }
	}
}
</script>