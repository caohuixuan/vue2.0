<template>
<div class="orderDetail">
<header>
<section class="goback" @click="goback()">
        <svg class="goback_icon" width="1.6rem" height="1.6rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
           <polyline points="12,18 4,9 12,0" style="fill:none;stroke:#FFFFFF;stroke-width:1"/>
        </svg>
</section>
<div class="order_state">
     <span>{{orderDetail.status_bar.title}}</span>
     <svg class="arrow_right">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
     </svg>
</div>
</header>
<section class="order_container">
     <p class="order_name">
         <img :src="imgBaseUrl+orderDetail.restaurant_image_url">
         <span>{{orderDetail.restaurant_name}}</span>
     </p>
     <ul>
         <li v-for="(item,index) in orderDetail.basket.group[0]">
             <span>{{item.name}}</span>
             <span>×{{item.quantity}}</span>
             <span>￥{{item.price}}</span>
         </li>
     </ul>
     <div class="otherPay">
     <p class="baozhuang">
         <span>包装费</span>
         <span>×{{orderDetail.basket.packing_fee.quantity}}</span>
         <span>￥{{orderDetail.basket.packing_fee.price}}</span>
     </p>
     <p class="peisong">
         <span>配送费</span>
         <span>×{{orderDetail.basket.deliver_fee.quantity}}</span>
         <span>￥{{orderDetail.basket.deliver_fee.price}}</span>
     </p>
     </div>
     <p class="allPay"><span>合计</span><span>￥{{orderDetail.total_amount}}</span></p>
</section>
<section class="order_peisong">
   <div class="peisong_title">
         <span>配送信息</span>
   </div>
   <p>
      <span>配送服务</span>
      <span>蜂鸟转送</span>
   </p>
   <p>
      <span>期望时间</span>
      <span>立即送达</span>
   </p>
   <p>
      <span>配送地址</span>
      <span></span>
   </p>
</section>
<section class="order_xinxi">
   <div class="peisong_title">
         <span>订单信息</span>
   </div>
   <p>
      <span>订单号码</span>
      <span>{{orderDetail.id}}</span>
   </p>
   <p>
      <span>下单时间</span>
      <span>{{orderDetail.formatted_created_at}}</span>
   </p>
   <p>
      <span>支付方式</span>
      <span>在线支付</span>
   </p>
</section>
<transition name="loading"> 
          <loading v-show="showLoading"></loading>
</transition>
</div>
</template>
<script>
import {mapState} from 'vuex';
import {imgBaseUrl} from '../../config/env.js';
import {getOrderDetail} from '../../service/getData.js';
import loading from '../../components/common/loading1.vue';
export default{
	name:'signin',
	data(){
	   return{
	      imgBaseUrl,
	      orderData:null,
	      showLoading:true,
	   }
	},
	computed:{
	   ...mapState([
         'orderDetail','userInfo'
	   ]),
	},
	components:{
	  loading
	},
	mounted(){
	    console.log(this.orderDetail);
	    this.init();
	},
	methods:{
	   async init(){
           this.orderData=await getOrderDetail(this.userInfo.user_id, this.orderDetail.unique_id);
           this.showLoading=false;
           if(this.orderData.status==0){
               
           }
           //console.log(this.orderData);
	   },
	   goback(){
	       this.$router.go(-1);
	   }
	}
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.orderDetail{
	 position:absolute;
	 top:0;
	 left:0;
	 @include wh(100%,100%);
	 header{
	    position:fixed;
	    top:0;
	    left:0;
	    background:$grew3;
	    @include wh(100%,6rem);
	    .goback{
            background:rgba(10,10,10,.6);
            @include wh(1.5rem,1.5rem);
            margin:.5rem;
            border-radius:50%;
            .goback_icon{
                 padding:.15rem;
            }
	    }
	    .order_state{
	       @include wh(100%,3.5rem);
	       line-height:3.5rem;
	       padding-left:.8rem;
	       span{
	           @include fontstyle2(1.5rem,$black,600);
	       }
	       .arrow_right{
               stroke-width:1;
	           fill:$grew1;
	           @include wh(1.1rem,1.1rem);
	       }
	    }
	 }
	 .order_container{
	    min-height:14rem;
	    background:$white;
	    margin:6.5rem .8rem 0 .8rem;
        border-radius:.3rem;
        padding:.8rem;
        .order_name{
           @include wh(100%,2.5rem);
           border-bottom:.02rem solid $grew4;
           img{
              @include wh(2rem,2rem);
              margin-top:.25rem;
              float:left;
           }
           span{
               line-height:2.5rem;
               padding-left:.5rem;
               @include fontstyle2(1.3rem,$black,600);
           }
        }
        ul{
           border-bottom:.02rem solid $grew4;
           li{
              list-style-type:none;
              margin:.5rem 0;
              height:1.5rem;
              line-height:1.5rem;
              text-align:right;
              span:nth-of-type(1){
                  float:left;
                  @include fontstyle2(1.2rem,$black,400);
              }
              span:nth-of-type(2){
                  padding-right:.8rem;
                  @include fontstyle2(.9rem,$grew2,400);
              }
              span:nth-of-type(3){
                  @include fontstyle2(1.1rem,$black,400);
              }
           }
        }
        .otherPay{
            border-bottom:.02rem solid $grew4;
        .baozhuang{
              margin:.8rem 0;
              padding-bottom:.5rem;
              height:1.5rem;
              line-height:1.5rem;
              text-align:right;
              span:nth-of-type(1){
                  float:left;
                  @include fontstyle2(1.2rem,$black,400);
              }
              span:nth-of-type(2){
                  padding-right:.8rem;
                  @include fontstyle2(.9rem,$grew2,400);
              }
              span:nth-of-type(3){
                  @include fontstyle2(1.1rem,$black,400);
              }
        }
        .peisong{
              margin:.8rem 0;
              padding-bottom:.5rem;
              height:1.5rem;
              line-height:1.5rem;
              text-align:right;
              span:nth-of-type(1){
                  float:left;
                  @include fontstyle2(1.2rem,$black,400);
              }
              span:nth-of-type(2){
                  padding-right:.8rem;
                  @include fontstyle2(.9rem,$grew2,400);
              }
              span:nth-of-type(3){
                  @include fontstyle2(1.1rem,$black,400);
              }
        }
        }
        .allPay{
           margin:.5rem 0 0 0;
           text-align:right;
           line-height:2.5rem;
           @include wh(100%,2.5rem); 
           @include fontstyle2(1rem,$black,400);
           span:nth-of-type(2){
               @include fontstyle2(1.3rem,$red,400);
           }
        }
	 }
	 .order_peisong,.order_xinxi{
	    min-height:12rem;
	    background:$white;
	    margin:.8rem .8rem .8rem .8rem;
        border-radius:.3rem;
        padding:.8rem;
        p{
           @include wh(100%,2.5rem);
           margin:.5rem 0;
           line-height:2.5rem;
           span:nth-of-type(1){
              @include fontstyle2(1.1rem,$grew1,400);
           }
           span:nth-of-type(2){
              float:right;
              @include fontstyle2(1rem,$black,400);
           }
        }
        .peisong_title{
            @include wh(100%,2.5rem);
            border-bottom:.02rem solid $grew4;
            padding-bottom:.5rem;
            span{
               line-height:2.5rem;
               padding-left:.5rem;
               @include fontstyle2(1.3rem,$black,600);
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