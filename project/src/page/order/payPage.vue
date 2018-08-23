<template>
<div>
<header>
 <section class="goback" @click="goback()">
        <svg class="goback_icon" width="1.6rem" height="1.6rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
           <polyline points="12,18 4,9 12,0" style="fill:none;stroke:#7A8185;stroke-width:2"/>
        </svg>
 </section>
 <span>支付订单</span>
</header>
<section class="time_count">
   <p>支付剩余时间{{timingCount}}</p>
   <p><span>￥</span> {{allPay}}</p>
   <p v-if="getData">{{shop.name}}</p>
</section>
<section class="pay_way">
   <p>
     <img src="../../images/weixinzhifu.svg">
     <span>微信支付</span>
     <svg class="address_empty_right" @click="payway=1" width="1.8rem" height="1.8rem" :class="{choosed: payway== 1}">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
     </svg>
   </p>
   <p>
     <img src="../../images/zhifubao.svg">
     <span>支付宝支付</span>
     <svg class="address_empty_right" @click="payway=2" width="1.8rem" height="1.8rem" :class="{choosed: payway== 2}">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
      </svg>
   </p>
</section>
<section class="pay" @click="alertTip=!alertTip">
    确认支付
</section>
<section class="alert_tip" v-if="alertTip">
假的，不能支付，点击确定进入订单
<button @click="gotoList()">确定</button>
</section>
</div>
</template>
<script>
export default{
	name:'payPage',
	data(){
	    return{
	       allPay:0,//
	       shop:null,
	       allTime:900,//900秒计时
	       getData:false,//是否获取数据
	       timeer:null,//定时器
	       payway:1,
	       alertTip:false,//提示信息
	    }
	},
	mounted(){
       this.allPay=this.$route.query.allpay;
       this.shop=this.$route.query.resdetail;
       console.log(this.shop);
       this.getData=true;
       this.startTime();
	},
	beforeDestroy(){
	   clearInterval(this.timeer);
	},
	computed:{
        timingCount:function(){
            let minute=parseInt(this.allTime/60);
            if(minute<10){
                 minute='0'+minute;
            } 
            let second = parseInt(this.allTime%60);
            if (second < 10) {
                    second = '0' + second;
            }        
            return '00 : ' + minute + ' : ' + second;     
        }
	},
	methods:{
	   goback(){
	      let myPoint=this.$route.query.myPoint;
         let shopid=this.$route.query.shopid;
         let resdetail=this.$route.query.resdetail;
         this.$router.push({path:'/myCart',query:{shopid,myPoint,resdetail}})
	   },
	   startTime(){
	        if(!this.timeer){
	             clearInterval(this.timeer);
	             this.timeer=setInterval(()=>{
                     this.allTime--;
                     if(this.allTime==0){
                          clearInterval(this.timeer);
                          alert("支付超时");
                     }
	             },1000)
	        }
	   },
	   gotoList(){
	       this.alertTip=false;
	       this.$router.push('/order');
	   }
	}
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
header{
    position:relative;
	@include wh(100%,2.5rem);
	border-bottom:.1rem solid $grew4;
	.goback{
        position:absolute;
        top:.65rem;
        left:.8rem;
	}
	span{
	   line-height:2.5rem;
	   margin-left:2.5rem;
	   @include fontstyle2(1rem,$grew1,500);
	}
}
.time_count{
	@include wh(100%,8rem);
	background:$white;
	text-align:center;
	p:nth-of-type(1){
	   line-height:3rem;
	   @include fontstyle2(1rem,$grew2,500);
	}
	p:nth-of-type(2){
	   span{
	       @include fontstyle2(1.1rem,$black,500);
	   }
	   line-height:2.5rem;
	   @include fontstyle2(1.8rem,$black,500);
	}
	p:nth-of-type(3){
	   line-height:1rem;
	   @include fontstyle2(.9rem,$grew1,500);
	}
}
.pay_way{
	p{
	  position:relative;
	  @include wh(100%,8rem);
	  background:$white;
	  margin-top:.8rem;
	  img{ 
        @include wh(4rem,4rem);
        padding:2rem .8rem;
	  }
	  span{
        position:absolute;
        line-height:8rem;
	  }
	  .address_empty_right{
	    float:right;
	    margin-top:3rem;
	    margin-right:.8rem;
	    fill:$grew2;
	  }
	  .choosed{
	    fill:$green;
	  }
    }
}
.pay{
	position:fixed;
	bottom:0;
	@include wh(100%,3rem);
	background:$green;
	text-align:center;
	line-height:3rem;
	@include fontstyle2(1.2rem,$white,500);
}
.alert_tip{
	position:absolute;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	@include wh(80%,8rem);
	background:$white;
	border:.1rem solid $grew4;
	border-radius:1rem 1rem 0 0;
	line-height:8rem;
	text-align:center;
    button{
      position:absolute;
      bottom:0;
      @include wh(100%,2rem);
      left:0;
      background:$green;
      border:none;
      @include fontstyle2(1rem,$white,500);
    }
}
</style>