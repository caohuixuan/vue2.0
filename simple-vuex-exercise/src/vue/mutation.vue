<template>
<div>
<h1>mutation实例</h1>
<span>{{count}}</span>
<button v-on:click="jiashi">+</button>
</div>
</template>
<script>
export default{
	name:'simpleone',
	computed:{
	count(){
	    return this.$store.state.count
	}
	},
	methods:{
	jiashi(){
	   this.$store.commit('jiashi',{a:10})
	}
	}
}
</script>