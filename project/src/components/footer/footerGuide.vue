<template>
<div class="footer_one">
     <section id="footer_list">
          <div @click="gotoPage({path:'/mHome',query:{myPoint}})">
              <img v-if="home" src='../../images/home_two.svg' />
              <img v-else src='../../images/home_one.svg' />
              <p style="display:none;">使用class判断没有起作用！！！</p>
              <span  style="display:none;" v-bind:class="{home}!==-1?'mActive':'unActive'">首页</span>
              <span v-if="home" class="mActive">首页</span>
              <span v-else class="unActive">首页</span>
          </div>
          <div @click="gotoPage({path:'/mHome'})">
              <img v-if="fujin" src='../../images/fujin_two.svg' />
              <img v-else src='../../images/fujin_one.svg' />
              <span v-if="fujin" class="mActive">附近</span>
              <span v-else class="unActive">附近</span>
          </div>
          <div @click="gotoPage({path:'/mHome'})">
              <img v-if="find" src='../../images/find_two.svg' />
              <img v-else src='../../images/find_one.svg' />
              <span v-if="find" class="mActive">发现</span>
              <span v-else class="unActive">发现</span>
          </div>
          <div @click="gotoPage({path:'/order'})">
              <img v-if="ding" src='../../images/ding_two.svg' />
              <img v-else src='../../images/ding_one.svg' />
              <span v-if="ding" class="mActive">订单</span>
              <span v-else class="unActive">订单</span>
          </div>
          <div @click="gotoPage({path:'/mine',query:{myPoint}})">
              <img v-if="mine" src='../../images/mine_two.svg' />
              <img v-else src='../../images/mine_one.svg' />
              <span v-if="mine" class="mActive">我的</span>
              <span v-else class="unActive">我的</span>
          </div>
     </section>
</div>
</template>
<script>
import {mapState} from 'vuex';
export default{
	name:"dibu",
	data(){
	    return{
	    }
	},
	computed:{
        ...mapState([
            'myPoint'
        ])
	},
    props:['home','fujin','find','ding','mine',],
    methods:{
          gotoPage(p){
             //console.log(p);
             if(this.myPoint){
             this.$router.push(p);
             }
             
        
          }
    }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.footer_one{
    position:fixed;
    bottom:0;
    background-color:$white;
	@include wh(100%,5rem);
	box-shadow: 0 -0.016667rem 0.053333rem rgba(0,0,0,.1);
	section{
	    div{
	        float:left;
            @include wh(20%,3rem);
            text-align:center;
            img{
               padding-top:0.5rem;
               @include wh(60%,2.5rem);
            }
            span{
               display:block;
            }
	    }
	}
}
.unActive{
	 @include fontstyle2(1rem,$grew1,normal)
}
.mActive{
	 @include fontstyle2(1rem,$green,normal)
}
</style>