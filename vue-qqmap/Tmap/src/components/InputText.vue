<template>
<div class="searchAddress">
<span>地址</span>
<div><input type='text' v-bind:placeholder='inputText' v-model="text"></div>
<button @click="search">查询</button>
</div>
</template>
<script>
export default{
	name:'Input',
	props:['inputText'],
	data(){
	return{
	text:''
	}
	},
	methods:{
	  search:function(){
	      console.log(this.text);
	      this.$parent.searchKeyword(this.text)
	  }
	}
}
</script>
<style lang="less" scoped>
.searchAddress{
    position:relative;
    width:100%;
    height:40px;
    span{
        position:absolute;
        left:0px;
        width: 70px;
        height: 29px;
        margin:5px 5px;
        text-align:center;
        line-height:30px;
        border:1px solid #ccc; 
    }
    div{
       padding:3px 10px;
       margin:0px 80px;
       height: 30px;
       line-height:30px;
       input{
          height:26px;
          width:100%;
         }
    }
    button{
        position:absolute;
        right:0px;
        top:0px;
        width: 70px;
        height:32px;
        margin:4px 5px;
    }
}
</style>