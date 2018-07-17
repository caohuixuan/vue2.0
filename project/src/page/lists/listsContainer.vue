<template>
    <div>
         <div class="container_top">
              <router-link tag='section' class="goback" :to="{path:'/mHome',query:{point:myPoint}}">
              <svg class="goback_icon" width="1.6rem" height="1.6rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
              </svg>
              </router-link>
              <div class="container_img">
                 <img v-if='!getres' src='../../images/rabbit.svg'>               
                 <img v-if='getres' :src='imgBaseUrl+resdetail.image_path'>
              </div>
              <div class="container_title">
                 <span class="container_title_m" v-if='!getres'>欢迎光临，很高兴为你服务~</span>
                 <div class="container_title_r" v-if='getres'>
                      <p>{{resdetail.name}}</p>
                      <span>公告：{{resdetail.promotion_info}}</span>
                      <div>
                          <span v-for="s in resdetail.supports">{{s.name}}</span>
                      </div>
                 </div>
              </div>
        </div>
        <div class="contianer_active" v-if='actives'>
              <span class="red_circle">减</span>
              <span v-for="act in resdetail.activities">{{act.description}}</span>
              <p>
              <span>{{resdetail.activities.length}} 个活动</span>
              <svg class="" width="1.2rem" height="0.7rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="0,10 5,5 0,0" style="fill:none;stroke:#B2B2B2;stroke-width:1"/>
              </svg>
              </p>
        </div>
        <div class="change_nav">
              <div :class="{actionType:showType=='food'}" @click="showType='food'">
                  <span>点菜</span>
              </div>
              <div :class="{actionType:showType=='pingjia'}" @click="showType='pingjia'">
                  <span>评价</span>
              </div>
              <div :class="{actionType:showType=='shangjia'}" @click="showType='shangjia'">
                  <span>商家</span>
              </div>
        </div>
        <transition name="type-choose">
              <div class="food_T">
              <section v-show="showType=='food'" class="food_page">
                  <div class="food_menu_l">
                       <ul>
                           <li v-for="(item,index) in menuList" class="food_menu_li" :class="{actionMenu:index==menuIndex}" @click="chooseMenu(index)">
                               <img :src="getImgPath(item.icon_url)">
                               <span>{{item.name}}</span>
                               <span class="menu_count" v-if="menuCount[index]">{{menuCount[index]}}</span>  
                           </li>
                       </ul>
                  </div>
                  <div class="food_menu_r">
                       <ul>
                           <li v-for="(item,index) in menuList">
                               <header class="r_title">
                                    <span>{{item.name}}</span>
                                    <span>{{item.description}}</span>
                               </header>
                               <div v-for='(food,num) in item.foods' class="r_detail">
                                   <div class="food_img">
                                      <img :src="imgBaseUrl+food.image_path">
                                   </div>
                                   <div class="food_detail">
                                      <h3 class="food_detail_title">{{food.name}}</h3>
                                      <p class="food_detail_description">{{food.description}}</p>
                                      <p class="food_detail_count">
                                           <span>月售{{food.month_sales}}</span>
                                           <span>好评{{food.satisfy_rate}}%</span>
                                      </p>
                                      <p class="food_detail_activity">
                                         <span v-if="food.activity">{{food.activity.image_text}}</span>
                                      </p>
                                      <p class="food_detail_price">
                                          <span>￥</span>
                                          <span>{{food.specfoods[0].price}}</span>
                                          <span v-if="food.specifications.length">起</span>
                                      </p>
                                   </div>
                                   
                               </div> 
                           </li>
                       </ul>
                  </div>
              </section>
              </div>
        </transition>
        <transition name="loading"> 
              <loading v-if="showLoading"></loading>
        </transition>
    </div>
</template>
<script>
import loading from '../../components/common/loading1.vue';
import {msiteAddress,shopList, shopDetails, foodMenu, getRatingList, ratingScores, ratingTags} from '../../service/getData.js'
import {imgBaseUrl} from '../../config/env.js';
import {getImgPath} from '../../components/common/loadermore.js'
export default{
	name:'listContainer',
	data(){
	    return{
	        myPoint:null,//接收的我的位置对象
	        shopid:0,//店铺id
	        showLoading:true,//显示加载动画
	        resdetail:null,//商店详细信息
	        imgBaseUrl,
	        getres:false,//是否接收到店铺信息
	        actives:false,//是否有活动信息
	        showType:'food',//展示内容类型
	        menuList:[],//食品列表
	        menuIndex:0,//选中列表
	        menuCount:[],//加入购物车单个产品数量
	    }
	},
	watch:{
	    showLoading:function(value){
	        console.log(value);
	    },
	},
	components:{loading},
	computed:{
        resmessage:function(){
             return this.resdetail.name;
        }
	},
	mixins:[getImgPath],
	mounted(){
	    this.init();
	},
	methods:{
	    async init(){
	    this.myPoint=this.$route.query.point;
	    this.shopid=this.$route.query.id;  
	    let thisres=await shopDetails(this.shopid,this.myPoint.latLng.lat,this.myPoint.latLng.lng);
	    this.resdetail=thisres;
	    if(this.resdetail.activities.length){
              this.actives=true;
	    }
        this.menuList=await foodMenu(this.shopid);
        console.log(this.menuList);
	    this.getres=true;
	    this.showLoading=false; 
	    },
	    chooseMenu(index){
	        this.menuIndex=index;
	        console.log(index);
	    }
	}

}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.container_top{
	@include wh(100%,8rem);
	background-color:$grew5;
	box-shadow:0rem -1.5rem 1.5rem #999 inset; 
	.goback{
	    position:relative;
	    top:1rem;
	    left:0.8rem;
	    @include wh(1.6rem,1.6rem);
	}
	.container_img{
	    @include wh(5rem,5rem);
	    border-radius:0.5rem;
	    background-color:#fff;
	    text-align:center;
	    position:relative;
	    top:2rem;
	    left:0.8rem;
	    box-shadow:0.2rem 0.2rem 0.2rem #999;
	    img{
	        @include wh(5rem,5rem);
	        border-radius:0.5rem;
	    } 
	}
	.container_title{
	    position:relative;
	    left:6.6rem;
	    top:-3rem;
	    @include wh(100%,4rem);
	    .container_title_m{
	        display:inline-block;
	        margin-top:1rem;
	        @include fontstyle2(0.8rem,$white,100);
	    }
	    .container_title_r{
	        top:-4rem;
	        p{
	            @include fontstyle2(1.2rem,$white,700);
	        }
            span{
                @include fontstyle2(0.8rem,$white,100);
            }
            div{
               span{
                   margin-right:.8rem;
                   padding:0 0.5rem;
                   border:0.01rem solid $orange;
                   @include fontstyle2(0.8rem,$orange,100);
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
.contianer_active{
	@include wh(100%,1.8rem);
	background-color:$white;
	padding-top:1.2rem;
	padding-left:0.8rem;
	span{
	    margin-right:0.5rem;
	}
	.red_circle{
	   display:inline-block;
	   text-align:center;
	   @include wh(1.3rem,1.3rem);
       background-color:$red;
       @include fontstyle2(1rem,$white,100);
	}
	P{
       position:relative;
       left:100%;
       top:-1.3rem;
       @include wh(6rem,1.5rem);
       margin-left:-6rem;
	   @include fontstyle2(1rem,$grew1,100);
	   span{
	       margin-right:0.3rem;
	       
	   }
	}
}
.change_nav{
	@include wh(100%,3.8rem);
	background-color:$white;
	display:inline-block;
    display:-moz-box;
    -moz-box-orient:horizontal;
    display:-webkit-box;
    -webkit-box-orient:horizontal;
    display:box;
    box-orient:horizontal;
    border-bottom:0.02rem solid $grew4;
    div{
      text-align:center;
      line-height:3.6rem;
      margin:0 2rem;
      height:3.6rem;
      @include fontstyle2(1.2rem,$grew1,500);
      -webkit-box-flex: 1.0;
      -moz-box-flex:1.0; 
    }
    .actionType{
         @include fontstyle2(1.2rem,$black,500);
         border-bottom:0.2rem solid $orange;
    }
}
.food_T{
@include wh(100%,100%);
 overflow-y: hidden;
.food_page{
    position:relative;
    overflow-y: hidden;
    background-color:#f00;
    display: flex;
    flex: 1;
	.food_menu_l{
	    background-color:#ff0;
	    ul{
	       width:100%;
	       @include fontstyle2(1rem,$grew1,500);
	       overflow: hidden;
           text-overflow:ellipsis;
           white-space: nowrap;
           .food_menu_li{
               line-height:5rem;
               list-style-type:none;
               padding-left:0.8rem;
               @include wh(100%,5rem);
               img{
                   @include wh(1.2rem,1.2rem);
               }
           }
           .actionMenu{
               background-color:$white;
               border-left:0.2rem solid $green;
           }	       
	    }
	}
	.food_menu_r{
        float:right;
        flex:5;
        overflow-y:auto;
        background-color:$white;
        ul{

            li{
               list-style-type:none;
               .r_title{
                   @include wh(100%,2rem);
                   background-color:$grew3;
                   line-height:2rem;
                   padding-left:0.8rem;
                   span:nth-of-type(1){
                       @include fontstyle2(1rem,$black,500);
                   }
                   span:nth-of-type(2){
                       @include fontstyle2(0.8rem,$grew2,500);
                   }
               }
               .r_detail{
                   border-bottom:0.02rem solid $grew4;
                   @include wh(100%,8rem);
                   .food_img{
                       float:left;
                       text-align:center;
                       @include wh(6rem,8rem);
                       img{
                          @include wh(5rem,5rem);
                          margin-top:0.8rem;
                       }
                   }
                   .food_detail{
                       float:left;
                       padding-left:0.8rem;
                       padding-top:0.5rem;
                       .food_detail_title{
                          height:1.5rem;
                          @include fontstyle2(1.2rem,$black,600);
                       }
                       .food_detail_description{
                          height:1.2rem;
                          line-height:1.2rem;
                          @include fontstyle2(0.8rem,$grew2,100);
                       }
                       .food_detail_count{
                          height:1.3rem;
                          line-height:1.3rem;
                          @include fontstyle2(1rem,$grew1,100);
                       }
                       .food_detail_activity{
                          height:1.1rem;
                          span{
                             padding:0.1rem 0.3rem;
                             @include fontstyle2(0.6rem,$red,100);
                             border:0.03rem solid $redb;
                             border-radius:0.2rem;
                          }
                       }
                       .food_detail_price{
                          height:2.4rem;
                          line-height:2.4rem;
                          @include fontstyle2(1.1rem,$orange,600);
                       }
                   }
               }
            }
        }
	}
}
}
</style>