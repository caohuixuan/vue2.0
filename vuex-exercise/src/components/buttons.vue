<template>
<div>
<button @click="stateone">获取全局state</button>
<button @click="statetwo">获取module的state</button>
<button @click="mutationone">触发mutation同步方法</button>
<button @click="actionone">触发action异步方法</button>
<button @click="jiajia">count+++</button>
</div>
</template>
<script>
export default{
	name:'shujuceshi',
	methods:{
      stateone(){
          console.log(this.$store.state.show)
      },
      statetwo(){
          console.log(this.$store.state.one.firstname)
      },
      mutationone(){
           this.$store.commit('alerttext',{message:"这是全局mutation"})
      },
      actionone(){
           this.$store.dispatch('actone')
      },
      jiajia(){
          this.$store.commit('jiajia');
      }
	}
}
</script>