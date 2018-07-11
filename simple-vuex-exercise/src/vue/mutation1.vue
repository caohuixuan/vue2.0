<template>
<div>
<h1>mapMutstions</h1>
<button v-on:click="jiajia">+</button>
<span>{{count}}</span>
<button v-on:click="jian">-</button>
<button v-on:click="jia">+10</button>
</div>
</template>
<script>
import {mapMutations} from 'vuex'
export default{
	name:'simpleone',
	computed:{
	count(){
	    return this.$store.state.count
	}
	},
	methods:{
	...mapMutations([
         'jiajia',
	]),
	...mapMutations({
	      jian:'jianjian'
	}),
	jia(){
	    this.$store.commit('jiashi',{a:10})
	}
	}
}
</script>