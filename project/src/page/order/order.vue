<template>
<div class="myorder">
<header>
我的订单
</header>
<section class="tabble_type">
    <div><img src="../../images/qb1.svg"><p>全部订单</p></div>
    <div><img src="../../images/qb2.svg"><p>待付款</p></div>
    <div><img src="../../images/qb3.svg"><p>待评价</p></div>
    <div><img src="../../images/qb4.svg"><p>退款/售后</p></div>
    <div><img src="../../images/qb1.svg"><p>待使用</p></div>
</section>
<ul v-load-more="loaderMore" v-if="">
    <li class="order_li" v-for="item in myOrder">
         <div class="order_con" @click="orderDetail(item)">
          <img :src="imgBaseUrl+item.restaurant_image_url">
          <div class="order_c">
          <p class="order_name">
               <span class="name">{{item.restaurant_name}}</span>
               <svg class="arrow_right">
                   <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
               </svg>
               <span class="stateName">{{item.status_bar.title}}</span>
           </p>
           <p class="order_time">
               <span>下单时间：</span>
               <span>{{item.formatted_created_at}}</span>
           </p>
           <p class="order_price">¥{{item.total_amount.toFixed(2)}}</p>
           </div>
         </div>
         <div class="oneMore">
           <time-count v-if="item.status_bar.title == '等待支付'" :time="item.time_pass"></time-count>
           <span v-else>再来一单</span>
         </div>
    </li>
</ul>
<foot-guide :ding="true"></foot-guide>
<transition name="loading"> 
          <loading v-show="showLoading"></loading>
</transition>
</div>
</template>
<script>
import footGuide from '../../components/footer/footerGuide.vue';
import {loadMore} from '../../components/common/loadermore.js'
import {mapState,mapMutations} from 'vuex';
import loading from '../../components/common/loading1.vue';
import {getOrderList} from '../../service/getData.js'
import {imgBaseUrl} from '../../config/env.js';
import timeCount from '../../components/common/timeCount.vue';
export default{
	name:'order',
	data(){
	  return{
	     showLoading:true,
	     offset:0,//请求订单起始位置
	     myOrder:null,//请求的订单列表
	     imgBaseUrl,
	     preventRepeat:false,//防止重复获取
	  }
	},
	components:{
	  footGuide,loading,timeCount
	},
	mounted(){
	   this.init();
	},
	mixins:[loadMore],
	computed:{
	    ...mapState([
             'myPoint','userInfo'
	    ])
	},

	methods:{
	     ...mapMutations([
             'setOrderDetail'
	     ]),
	     async init(){
	         if(this.userInfo&&this.userInfo.user_id){
                    let res=await getOrderList(this.userInfo.user_id,this.offset);
                    this.myOrder=[...res];
                    this.showLoading=false;
                    console.log(this.myOrder);
	         }else{
	             this.$router.push({path:'/login'});
	         }
	     },
	     async loaderMore(){
	         // console.log("loadermore");
	         if(this.preventRepeat){
	              return;
	         }
	         this.preventRepeat=true;
	         this.showLoading=true;
	         this.offset+=10;
	         let res=await getOrderList(this.userInfo.user_id,this.offset);
	         this.myOrder=[...this.myOrder,...res];
	         this.showLoading=false;
	         if(res.length<10){
	            return
	         }
	         this.preventRepeat=false;
	     },
	     orderDetail(item){
            this.setOrderDetail(item);
            this.preventRepeat=false;
            this.$router.push('/orderDetail')
	     }
	}
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.myorder{
	position:absolute;
	top:0;
	left:0;
	padding-bottom:4rem;
	@include wh(100%,100%);
	overflow-y:auto;
header{
    position:fixed;
    top:0;
	@include wh(100%,2.5rem);
	background:$grew4;
	@include fontstyle2(1.1rem,$black,600);
	line-height:2.5rem;
	text-align:center;
}
.tabble_type{
	@include wh(100%,5rem);
	margin-top:2.5rem;
	display:flex;
	div{
	   text-align:center;
       flex:1;
	   img{
	       padding-top:.8rem;
	       @include wh(2rem,2rem);
	   }
	   p{
	       @include fontstyle2(.9rem,$grew1,500);
	   }
	}
}
ul{
    overflow:hidden;
	.order_li{
      background:$white;
      box-shadow:0 1rem 1.5rem rgba(255,215,10,.2);
      margin:2rem .8rem;
      list-style-type:none;
      border-radius:.8rem;
      padding:.5rem;
      .order_con{
        position:relative;
        @include wh(100%,8rem);
        border-radius:.8rem;
        img{
           position:absolute;
           @include wh(2rem,2rem);
           border-radius:50%;
        } 
        .order_c{
           padding-left:2.5rem;
           .order_name{
                @include wh(100%,2rem);
                line-height:2rem;
                .name{
                   @include fontstyle2(1.2rem,$black,600);
                }
                .arrow_right{
                    @include wh(1rem,1rem);
                    fill:$grew1;
                }
                .stateName{
                    float:right;
                    @include fontstyle2(.9rem,$grew1,300);
                }
           }
           .order_time{
                @include wh(100%,2rem);
                line-height:2rem;
                @include fontstyle2(1.1rem,$grew1,300);
           }
           .order_price{
                @include wh(100%,2rem);
                line-height:2rem;
                @include fontstyle2(1.1rem,$grew1,300);
           }
        }
      }
      .oneMore{
        @include wh(100%,2rem);
        line-height:2rem;
        text-align:right;
        span{
            border:.03rem solid $grew2;
            padding:.2rem .5rem;
            border-radius:.8rem;
            @include fontstyle2(1.1rem,$black,300);
        }
      }
	}
}
}
.loading-enter-active,.loading-leave-active{
	transition:opacity 1s;
}
.loading-enter,.loading-leave-active{
	opacity:0;
}
</style>