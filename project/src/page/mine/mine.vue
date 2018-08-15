<template>
<div class="mine_page">
<header>
    <img class="shezhi" src="../../images/shezhi.svg">
</header>
<div class="mine_container">
    <router-link :to="userInfo&&userInfo.user_id? '/userInfo' : '/login'" tag="div" class="mine_login">      
          <img v-if="userInfo&&userInfo.user_id" src="">
          <img v-else src="../../images/touxiang.svg">
          <div class="mine_name">请点击登录</div>
    </router-link>
    <div class="mine_P">
          <div class="p_one">
               <div><img src="../../images/shoucang.svg"><p>收藏</p></div>
               <div><img src="../../images/pingjia.svg"><p>评价</p></div>
               <div><img src="../../images/liulan.svg"><p>最近浏览</p></div>
          </div>
          <div class="p_two">
             <p>美团钱包</p>
             <div class="qb">
               <div><img src="../../images/qb1.svg"><p>我的钱包</p></div>
               <div><img src="../../images/qb2.svg"><p>红包/卡券</p></div>
               <div><img src="../../images/qb3.svg"><p>闪付</p></div>
               <div><img src="../../images/qb4.svg"><p>手机充值</p></div>
             </div>
          </div>
          <div class="p_two">
             <p>美团钱包</p>
             <div class="qb">
               <div><img src="../../images/qb1.svg"><p>我的钱包</p></div>
               <div><img src="../../images/qb2.svg"><p>红包/卡券</p></div>
               <div><img src="../../images/qb3.svg"><p>闪付</p></div>
               <div><img src="../../images/qb4.svg"><p>手机充值</p></div>
               <div><img src="../../images/qb1.svg"><p>我的钱包</p></div>
               <div><img src="../../images/qb2.svg"><p>红包/卡券</p></div>
               <div><img src="../../images/qb3.svg"><p>闪付</p></div>
               <div><img src="../../images/qb4.svg"><p>手机充值</p></div>
             </div>
          </div>
    </div>
</div>
<foot-guide :mine="true" :point="myPoint"></foot-guide>
</div>
</template>
<script>
import footGuide from '../../components/footer/footerGuide.vue';
import {mapState} from 'vuex';
export default{
	name:'mine',
	components:{
	footGuide,
	},
	computed:{
        ...mapState([
            'myPoint','userInfo'
        ])
	},

}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.mine_page{
	position:absolute;
	top:0;
	left:0;
	@include wh(100%,100%);
	background:$green;
	header{
	   .shezhi{
	     @include wh(2rem,2rem);  
	     padding:.8rem;
	   }
	}
	.mine_container{
	   position:relative;
	   top:1.8rem;
	   left:0;
       .mine_login{
           position:relative;
	       top:0;
	       left:0;
	       @include wh(100%,4rem);
	       background:$white;
	       border-radius:50%;
	       img{
	           position:absolute;
	           top:-2.8rem;
	           left:50%;
	           @include wh(4rem,4rem);
	           border:.3rem solid $white;
	           border-radius:50%;
	           padding-top:-0.2rem;
	           transform:translateX(-50%);
	       }
	       .mine_name{
	          position:relative;
	          top:2rem;
	          left:0;
	          @include wh(100%,2rem);
	          background:$white;
              text-align:center;
              @include fontstyle2(1rem,$black,600);
	       }
       }
       .mine_P{
	       width:100%;
	       background:$white;
	       overflow:hidden;
           .p_one{
              margin: 0 .8rem;
              background:$white;
              display:flex;
              padding:1rem 0;
              border-bottom:.02rem solid $grew4;
              div{
                 flex:1;
                 text-align:center;
                 @include fontstyle2(.9rem,$black,500);
                 img{
                    @include wh(1.8rem,1.8rem);
                    margin-bottom:.3rem;
                 }
              }
           }
           .p_two{
              margin:0 .8rem;
              background:$white;
              padding:1rem 0;
              border-bottom:.02rem solid $grew4;
              p{
               @include fontstyle2(.9rem,$black,600);
              }
              .qb{
                display:flex;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                div{
                 flex:1;
                 text-align:center;
                 min-width:25%;
                 margin:.8rem 0;
                 @include fontstyle2(.9rem,$black,400);
                 img{
                    @include wh(1.8rem,1.8rem);
                    margin-bottom:.5rem;
                 }
              }
              }
           }
       }
 	}
}

</style>