<template>
<div>
<h1>Action</h1>
<input type="text" v-model="msg">
<button @click="alertmsg">记录并输出</button>
</div>
</template>
<script>
export default{
	name:'actionone',
	data(){
      return{
        msg:'默认信息'
      }
	},
	methods:{
	alertmsg(){
	   this.$store.dispatch('threemin',{message:this.msg})
	}
	}
}
</script>