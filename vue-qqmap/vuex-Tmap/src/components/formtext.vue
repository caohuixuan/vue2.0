<template>
<div>
<div class="listCount"><span>个查询结果</span><button>count++</button></div>
<h3>方式二</h3>
<div></div>
</div>
</template>
<script>
export default{
	name:'formtext',
	data(){
	  return {
	   points:[],

	  }
	 
	},
	
	
}
</script>
<style lang="less" scoped>
.listCount{
  height:20px;
  padding-left:5px;
  padding-right:5px;
  background:#F2F2F2;
  font-size:14px;
  font-weight:normal;
  color:#454553;
  line-height:20px;
  white-space:nowrap;
}
</style>