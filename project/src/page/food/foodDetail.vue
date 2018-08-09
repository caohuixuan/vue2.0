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
           <order-c class="order_type" :shopid='shopid' :food='food' @showChooseType="showChooseType" @minusChooseType="minusChooseType"></order-c>
      </div>
      <p class="food_rating">
           <span>评分</span>
           <rating-start :rating="rating" class="food_start"></rating-start>
           <span class="food_point">{{rating}}</span>
      </p>
      <p class="food_message">
           <span>评论数</span>
           <span>{{ratingCount}}</span>
           <span>好评率</span>
           <span>{{satisfyRate}}%</span>
      </p>
  </div>
</div>
<div>

</div>
<section class="chooseTip" v-if="noChooseTip">
              <span>请在购物车中删除商品</span>
</section>
<section>
              <transition name="">
                   <div class="type_cover" @click="showChooseType" v-if="chooseFoodType"></div>
              </transition>
              <transition name="">
                   <div class="type_choose" v-if="chooseFoodType">
                      <header class="type_header">
                        <h3>{{chooseNowFood.name}}</h3>
                        <div class="close">
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1"class="specs_cancel" @click="showChooseType">
                            <line x1="0" y1="0" x2="16" y2="16"  stroke="#666" stroke-width="1.2"/>
                            <line x1="0" y1="16" x2="16" y2="0"  stroke="#666" stroke-width="1.2"/>
                        </svg>
                        </div>
                      </header>
                      <section  class="type_detail">
                        <h4>{{chooseNowFood.specifications[0].name}}</h4>
                        <ul>
                            <li v-for="(item,index) in chooseNowFood.specifications[0].values" :class="{hasChoosed:index==chooseTypeNum}" @click="chooseThisType(index)">{{item}}</li>
                        </ul>
                      </section>
                      <footer class="type_footer">
                        <div class="choose_food_price">
                            <span>￥</span>
                            <span>{{chooseNowFood.specfoods[chooseTypeNum].price}}</span>
                        </div>
                        <div class="choose_food_add" @click="addThisType(chooseNowFood.category_id, chooseNowFood.item_id, chooseNowFood.specfoods[chooseTypeNum].food_id, chooseNowFood.specfoods[chooseTypeNum].name, chooseNowFood.specfoods[chooseTypeNum].price, chooseNowFood.specifications[0].values[chooseTypeNum], chooseNowFood.specfoods[chooseTypeNum].packing_fee, chooseNowFood.specfoods[chooseTypeNum].sku_id, chooseNowFood.specfoods[chooseTypeNum].stock)">
                        加入购物车
                        </div>
                      </footer>
                   </div>
              </transition>
</section>
</div>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
import {imgBaseUrl} from '../../config/env.js';
import ratingStart from '../../components/common/ratingStart.vue';
import orderC from '../order/orderC.vue';
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
	    food:{},//food信息
	    timer:null,//计时器
	    noChooseTip:false,//是否显示在购物车中减去
	    chooseNowFood:null,//选择的当前食品
        chooseFoodType:false,//显示食品规格选项内容
	    chooseTypeNum:0,//当前选中的食品规格
	    }
	},
	components:{ratingStart,orderC},
	created(){
	   this.food=this.$route.query.food;
	},
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
	//   console.log(this.$route.query.food);
	},
	methods:{
	  ...mapMutations([
          'ADDCART','MINUSCART'
      ]),
	  addThisType(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock){
        //  console.log("加入购物车");
          this.ADDCART({shopid:this.shopid,category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock});
          this.showChooseType();
      },
	  showChooseType(food){
          // console.log("选择规格");
          if(food){
             this.chooseNowFood=food;
            // console.log(this.chooseNowFood);
          }
          this.chooseFoodType=!this.chooseFoodType;
          this.chooseTypeNum=0;
      },
      minusChooseType(){
          this.noChooseTip=true;
          clearTimeout(this.timer);
          this.timer=setTimeout(()=>{
              this.noChooseTip=false;
              clearTimeout(this.timer);
          },3000)
      },
      chooseThisType(index){
          this.chooseTypeNum=index;
      },
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
        width:100%;
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
	        width:100%;
	        padding:1.5rem .8rem;
	        .food_name{
               @include fontstyle2(1.5rem,$black,700);
	        }
	        .food_attributes{ 
	           margin:.3rem 0;
	           span{
                   margin:0 .3rem 0 0;
                   padding:.1rem .3rem;
                   border:0.03rem solid $orange;
                   @include fontstyle2(.8rem,$orange,400);
                   border-radius:1rem;
	           }
	        }
	        .month_sales{
	           margin:.2rem 0;
	           @include fontstyle2(.8rem,$grew1,300);
	        }
	        .food_pay{
	           position:relative;
	           margin:.5rem 0;
	           .food_detail_price{
	              @include fontstyle2(1.3rem,$orange,600);
	           }
	           .order_type{
	              position:absolute;
	              margin-right:3rem;
	              top:0.3rem;
	              right:0;
	              text-align:center;
	           }
	        }
	        .food_rating{
	           span{
	               @include fontstyle2(1rem,$black,400);
	           }
	           .food_start{
	               display:inline-block;
	           }
	           .food_point{
	               @include fontstyle2(.7rem,$grew1,400);
	           }
	        }
	        .food_message{
	            margin:.5rem 0;
	            @include fontstyle2(.9rem,$grew1,500);
	        }
	    }
}
}
.type_cover{
    position:absolute;
    top:0;
    @include wh(100%,100%);
    background-color:rgba(0,0,0,0.2);
}
.type_choose{
    position:absolute;
    top:35%;
    left:10%;
    width:80%;
    min-height:12rem;
    background-color:$white;
    border-radius:0.5rem;
    .type_header{
       position:relative;
       @include wh(100%,2.2rem);
       text-align:center;
       border-radius:1rem;
       h3{
         @include fontstyle2(1.6rem,$black,500);
       }
       .close{
         position:absolute;
         right:2.2rem;
         top:0.6rem;
       }
    }
    .type_detail{
       h4{
          @include fontstyle2(1rem,$grew1,500);
          padding:0.4rem 0 0.4rem 0.8rem;
       }
       ul{
          padding:0.4rem 0 0.4rem 0.8rem;
          display: flex;
          flex-wrap: wrap;
          li{
            @include fontstyle2(1rem,$black,500);
            margin-right:0.5rem;
            border:0.025rem solid $grew2;
            padding:0.2rem 1rem;
            border-radius:0.2rem;
            list-style-type:none;
          }
          .hasChoosed{
            @include fontstyle2(1rem,$orange,500);
            margin-right:0.5rem;
            border:0.025rem solid $orange;
            padding:0.2rem 1rem;
            border-radius:0.2rem;
            list-style-type:none;
            background:rgba(255,127,0,0.05);
          }
       }
    }
    .type_footer{
       position:absolute;
       bottom:0;
       border-top:0.03rem solid $grew4;
       border-bottom-left-radius:0.5rem;
       border-bottom-right-radius:0.5rem;
       @include wh(100%,3rem);
       background-color:$grew3;
       .choose_food_price{
          padding:0.3rem 0.8rem;
          span{
             @include fontstyle2(1.6rem,$red,700);
          }
       }
       .choose_food_add{
          position:absolute;
          right:0.8rem;
          top:0.6rem;
          @include fontstyle2(1rem,$black,600);
          background:$orange1;
          padding:0.2rem 0.8rem;
          border-radius:0.8rem;
       }
    }
}
.chooseTip{
    position:absolute;
    top:50%;
    @include wh(100%,100%);
    text-align:center;
    span{
       padding:0.5rem 1.5rem;
       background:rgba(10,10,10,0.8);
       @include fontstyle2(1rem,$white,400);
    }
}
</style>