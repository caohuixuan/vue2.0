<template>
  	<div class="home_container">
    <div class="home_title">
       我的APP用户体验调查
    </div>
    <div class="home_line"></div>
    <timucontainer father-component="home"></timucontainer>
    </div>
</template>

<script>
import timucontainer from '../../components/timucontainer.vue'

export default {
	name: 'home',
  components:{
    timucontainer
  }
}
</script>

<style lang="less" scoped>
    .home_title{
       width:100%;
       height:5rem;
       background-color:#0F7C4B;
       text-align: center;
       box-shadow: 0 0 4px 0 rgba(0,0,0,0.12);
       color:#FFFFFF;
       line-height:5rem;
       font-size:2rem;
    }
    .home_line{
      width:100%;
      height:0.3rem;
      background: #F8CA1C;
      box-shadow: 0 0 4px 0 rgba(0,0,0,0.12);
    }
</style>
