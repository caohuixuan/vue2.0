<template>
<div id="top">
<p>
{{msg}}
</p>
</div>
</template>
<script>
export default{
	name:'top',
	data(){
	return{
	msg:"这是顶部"
	}
	}
}
</script>
<style src='../less/firstLess.less' lang='less'></style>