<template>
<div>
<button @click="four">触发async actthree</button>
<button @click="five">触发async actfour</button>
</div>
</template>
<script>
export default{
	name:"actiontwo",
	methods:{
	 four(){
        this.$store.dispatch('actthree')
	 },
	 five(){
        this.$store.dispatch('actfour')
	 }
	}
}
</script>