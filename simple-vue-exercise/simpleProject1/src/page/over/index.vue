<template>
  	<div class="over_container">
    <div class="over_title">
       感谢您的参与，您的建议是我们努力的方向！
    </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
	name: 'over',
  methods:{
    ...mapActions([
        'answerContainer' 
    ])
  },
  mounted(){
     this.answerContainer();
     //console.log('over');
  }
}
</script>

<style lang="less" scoped>
    .over_title{
        display:block;
        width:70%;
        height:70%;
        margin-top:30%;
        font-size:4rem;
        color:#0F7C4B;
        text-align:left;
        text-align:-webkit-left;
    }
    .over_container{
       width:100%;
       height:100%;
       text-align:center;
       text-align:-webkit-center;
    }
</style>
