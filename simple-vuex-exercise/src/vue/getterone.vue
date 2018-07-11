<template>
<div>
<h2>通过属性访问</h2>
<h3>lists的所有数据</h3>
<ul>
<li v-for='list in lists'>{{list.id}}++{{list.content}}</li>
</ul>
<h3>show为true的是</h3>
<ul>
<li v-for="show in shows">{{show.id}}++{{show.content}}</li>
</ul>
<p>个数是{{getLength}}</p>
</div>
</template>
<script>
export default{
	name:'getterone',
	computed:{
	  lists(){
         return this.$store.state.lists
	  },
	  shows(){
	     return this.$store.getters.showList
	  },
	  getLength(){
	     return this.$store.getters.getLength
	  }
	}
}
</script>