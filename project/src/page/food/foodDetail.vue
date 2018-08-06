<template>
<div class="food_detail">
<header>
  <router-link tag='section' class="goback" :to="{path:'/lists',query:{point:myPoint,id:shopid}}">
      <svg class="goback_icon" width="1.6rem" height="1.6rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(130,130,130);stroke-width:2"/>
      </svg>
  </router-link>
</header>
<div class="contianer">
  <div class="food_img">
      <img :src='imgBaseUrl+image_path'>
  </div>
  <div class="food_container">
      <p class="food_name">{{name}}</p>
      <p class="food_attributes">
           <span v-for="item in attributes">{{item.icon_name}}</span>
      </p>
      <p class="month_sales">月售{{monthSales}}</p>
      <div class="food_pay">
           <p class="food_detail_price">
                <span>￥</span>
                <span>{{specfoods}}</span>
                <span v-if="specifications.length">起</span>
           </p>
      </div>
      <p>
           <span>评分</span>
           <rating-start :rating="rating"></rating-start>
           <span>{{rating}}</span>
      </p>
      <p>
           <span>评论数</span>
           <span>{{ratingCount}}</span>
           <span>好评率</span>
           <span>{{satisfyRate}}%</span>
      </p>
  </div>
</div>
<div>

</div>
</div>
</template>
<script>
import {imgBaseUrl} from '../../config/env.js';
import ratingStart from '../../components/common/ratingStart.vue';
export default{
	name:'fooddetail',
	data(){
	  return {
	    myPoint:null,//我的位置
	    shopid:0,//店铺id
	    imgBaseUrl,
	    image_path:'',//图片地址
	    name:'',//食物名称
	    attributes:[],//视图介绍
	    monthSales:0,//月售
	    specfoods:0,//食品详情
	    specifications:[],//食品详情
	    rating:0,//评分
	    ratingCount:0,//评论数
	    satisfyRate:0,//好评率
	    }
	},
	components:{ratingStart},
	mounted(){
	   this.myPoint=this.$route.query.mypoint;
	   this.shopid=this.$route.query.shopId;
	   this.image_path=this.$route.query.food.image_path;
	   this.name=this.$route.query.food.name;
	   this.attributes=this.$route.query.food.attributes;
       this.monthSales=this.$route.query.food.month_sales;
       this.specfoods=this.$route.query.food.specfoods[0].price;
       this.specifications=this.$route.query.food.specifications;
       this.rating=this.$route.query.food.rating;
       this.ratingCount=this.$route.query.food.rating_count;
       this.satisfyRate=this.$route.query.food.satisfy_rate;
	   console.log(this.$route.query.food);
	}
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
 @keyframes mymove{
     0%   { transform: scale(.2) }
     25%  { transform: scale(.4) }
     50%  { transform: scale(.6) }
     75%  { transform: scale(.8) }
     100% { transform: scale(1) }
}
.food_detail{
     position:absolute;
     top:0;
     left:0;
     @include wh(100%,100%);
	 background:$white;
	 header{
	    position:absolute;
	    top:0;
	    padding:.5rem .8rem 0 .8rem;
	 }
	 .contianer{
        position:absolute;
        top:1.5rem;
        left:0;
        @include wh(100%,100%);
    	.food_img{
	        @include wh(100%,20rem);
            text-align:center;
            border-bottom:0.2rem solid $grew3;
            animation: mymove .2s ease-in;
            img{
               margin-top:5%;
               @include wh(90%,90%);
               box-shadow:0rem 0rem 1.2rem $grew4;
            }
	    }
	    .food_container{
	        padding:1rem .8rem;
	    }
}
}

</style>