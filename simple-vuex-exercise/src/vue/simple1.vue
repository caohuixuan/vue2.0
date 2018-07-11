<template>
<div>
<button v-on:click="jiajia">+</button>
<span>{{count}}</span>
<button v-on:click="jianjian">-</button>
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
	jiajia(){
	   this.$store.commit('jiajia')
	},
	jianjian(){
	    this.$store.commit('jianjian')
	}
	}
}
</script>