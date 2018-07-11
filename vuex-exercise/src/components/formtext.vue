<template>
<div>
<h2>表单处理</h2>
<p>当使用v-model绑定一个state，那么在修改的时候就会出现state的修改不是通过mutation，在严格模式下就报错，所以可以绑定value，监听input事件</p>
<h3>方式一</h3>
<div>vdvdvd{{message}}</div>
<h3>方式二</h3>
<input v-model="message1">
</div>
</template>
<script>
export default{
	name:'formtext',
	computed:{ 
	  message(){
	     return this.$store.state.count
	  },
	  message1:{
	     get:function() {
          return this.$store.state.msg1
           },
         set:function(value) {
          this.$store.commit('updateMessage1', value)
           }
      }
	},
	methods:{
	  updateMessage(e){
	  this.$store.commit('updateMessage',e.target.value)
	  }
	}
	
}
</script>