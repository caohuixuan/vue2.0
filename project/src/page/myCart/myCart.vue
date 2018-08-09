<template>
<div class="myCart">
<header>
  <div class="header_tip">
  <router-link tag='section' class="goback" :to="{path:'/lists',query:{point:myPoint,id:shopid}}">
      <svg class="goback_icon" width="1.6rem" height="1.6rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(150,150,150);stroke-width:2"/>
      </svg>
  </router-link>
  <span>提交订单</span>
  </div>
</header>
<div class="cartContainer" >
   <div class="type_nav"  :class="{activtion:chooseType=='ziqu'}" >
       <div @click="chooseType='waimai'">外面配送</div>
       <div @click="chooseType='ziqu'">到点自取</div>
   </div>
   <div class="container_one"  :class="{activeOne:chooseType=='ziqu'}">
        <section class='inputAddress' v-show="chooseType=='waimai'">
            <div class="address">
                <span>选择收货地址</span>
                <svg class="setIcon" width="1.2rem" height="0.7rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <polyline points="0,10 5,5 0,0" style="fill:none;stroke:#B2B2B2;stroke-width:1"/>
                </svg>
            </div>
            <div class="setTime">
                <span class="timeType">立即送出</span>
                <span class="chooseTime">
                <span>大约半小时后送达</span>
                <svg class="setIcon" width="1.2rem" height="0.7rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <polyline points="0,10 5,5 0,0" style="fill:none;stroke:#B2B2B2;stroke-width:1"/>
                </svg>
                </span>
            </div>
        </section>
        <section v-show="chooseType=='ziqu'">qqq</section>
   </div>
   <div class="container_two" v-if="gettre">
        <header>
           <span>{{shopdetail.name}}</span>
           <span>{{shopdetail.delivery_mode.text}}</span>
        </header>
        <div class="food_lists">
           <ul>
               <li v-for="(item,index) in cartList">
                    <img :src="imgBaseUrl+item.imgUrl">
                    <div>
                         <span>{{item.name}}</span>
                         <span>￥{{item.price}}</span>
                    </div>
                    <div>
                         <span>×{{item.num}}</span>
                    </div>
               </li>
           </ul>
        </div>
        <div class="shop_pay">
           <span>配送费</span>
           <span>￥{{shopdetail.float_delivery_fee}}</span>
        </div>
        <div class="quan">
             <div>
                 <span>抵用券</span>
                 <span>填写地址后可选</span>
             </div>
             <div>
                 <span>商家代金券</span>
                 <span>填写地址后可选</span>
             </div>
        </div>
        <div class="countPay">
            <span>优惠规则</span>
            <span>小计 <span>￥{{allPay}}</span></span>
            <span v-if="manjian>0">已优惠 <span>￥{{manjian}}</span></span>          
        </div>
   </div>
   <div class="container_three"  v-if="gettre">
       <div class="beizhu">
             <span>备注</span>
             <span>
                <span>可输入备注要求</span>
                <svg class="setIcon" width="1.2rem" height="0.7rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <polyline points="0,10 5,5 0,0" style="fill:none;stroke:#B2B2B2;stroke-width:1"/>
                </svg>
             </span>
       </div>
       <div class="phone">
             <span>如遇缺货</span>
             <span>
                <span>缺货时电话与我沟通</span>
                <svg class="setIcon" width="1.2rem" height="0.7rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <polyline points="0,10 5,5 0,0" style="fill:none;stroke:#B2B2B2;stroke-width:1"/>
                </svg>
             </span>
       </div>
       <div class="fapiao">
             <span>发票</span>
             <span>
                <span>未满200元，不能开发票</span>
             </span>
       </div>
       <div class="zhifu">
             <span>支付方式</span>
             <span>
                <span>在线支付</span>
             </span>
       </div>

   </div>
   <transition name="loading"> 
              <loading v-if="showLoading"></loading>
   </transition>
   <section class="bottom_pay">
        <span>已优惠￥{{manjian}}</span>
        <span>合计￥{{allPay}}</span>
        <span>提交订单</span>
   </section>
</div>
</div>
</template>
<script>
import {msiteAddress,shopList, shopDetails, foodMenu, getRatingList, ratingScores, ratingTags} from '../../service/getData.js';
import {mapState,mapMutations} from 'vuex';
import {getImgPath} from '../../components/common/loadermore.js'
import loading from '../../components/common/loading1.vue';
import {imgBaseUrl} from '../../config/env.js';
export default{
	name:'myCart',
	data(){
	    return {
            myPoint:null,
            shopid:0,
            gettre:false,//是否接收到店铺信息
            chooseType:'waimai',//配送方式
            shopdetail:null,//店铺信息
            foodLists:null,//所有食品
            cartList:[],//购买的食品列表
            showLoading:false,//正在加载
            imgBaseUrl,
            manjian:0,//满减优惠
	    }
	},
	components:{loading},
	mixin:[getImgPath],
	computed:{
	    ...mapState(['myCard']),
	    shopCart:function(){
          return Object.assign({},this.myCard[this.shopid]);
        },
        allPay:function(){
           let count=0;
           if(this.cartList){
              for(let i=0;i<this.cartList.length;i++){              
                   count+=this.cartList[i].num*this.cartList[i].price;
              }
           }
           if(count>=100){
              count=count-20;
              this.manjian=20;
           }
           return count;

        }
	},
	mounted(){
	    //console.log(this.$route.query.resdetail);
	    this.myPoint=this.$route.query.myPoint;
	    this.shopid=this.$route.query.shopid;
	    this.shopdetail=this.$route.query.resdetail;
	    this.gettre=true;
	    this.init();
	},
	methods:{
	   async init(){
	       this.showLoading=true;
           this.foodLists=await foodMenu(this.shopid);
           this.getFoodList();
	   },
	   getFoodList(){
	       let listIndex=0;
          this.cartList=[];
         //console.log(Object.values(this.shopCart));
           this.foodLists.forEach((item,index)=>{
               //console.log(item);
                
               // console.log(img_icon);
                if(this.shopCart&&this.shopCart[item.foods[0].category_id]){
                 // console.log(Object.values(this.shopCart[item.foods[0].category_id]));
                     // console.log(item.foods);
                     Object.keys(this.shopCart[item.foods[0].category_id]).forEach(itemid => {

                         //   console.log(this.shopCart[item.foods[0].category_id])
                           Object.keys(this.shopCart[item.foods[0].category_id][itemid]).forEach(foodid => {
                                let img_icon=item.foods[0].image_path;
                               //console.log(item.foods[0].image_path);
                             // console.log(this.shopCart[item.foods[0].category_id][itemid][foodid])
                              if(this.shopCart[item.foods[0].category_id][itemid][foodid].num>0){
                                  this.cartList[listIndex]={};
                                  this.cartList[listIndex].category_id=item.foods[0].category_id;
                                  this.cartList[listIndex].item_id=itemid;
                                  this.cartList[listIndex].food_id=foodid;
                                  this.cartList[listIndex].num=this.shopCart[item.foods[0].category_id][itemid][foodid].num;
                                  this.cartList[listIndex].price=this.shopCart[item.foods[0].category_id][itemid][foodid].price;
                                  this.cartList[listIndex].name=this.shopCart[item.foods[0].category_id][itemid][foodid].name;
                                  this.cartList[listIndex].specs=this.shopCart[item.foods[0].category_id][itemid][foodid].specs;
                                  this.cartList[listIndex].imgUrl=img_icon;
                                  listIndex++;
                              }
                           })
                     })
                }
           })
          //console.log(this.cartList[0]);
          this.showLoading=false;
	   }
	}
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.myCart{
   position:absolute;
   top:0;
   left:0;
   @include wh(100%,100%);
   header{
      background: linear-gradient(to top,$grew3 0,$orange 30%);
      @include wh(100%,15rem);
   }
   .header_tip{
       position:fixed;
       @include wh(100%,2.5rem);
       background:$orange;
       z-index:10;
      .goback{
         position:absolute;
         top:.8rem;
         left:.8rem;
      }
      span{
         @include wh(100%,100%);
         display:block;
         padding-top:.6rem;
         @include fontstyle2(1.1rem,$black,550);
         text-align:center;
      }
   }
   .cartContainer{
       position:relative;
       top:-12.5rem;
       width:94%;
       margin-left:3%;
       margin-bottom:10rem;
       .type_nav{
          display:flex;
          div:nth-of-type(1){
             text-align:center;
             list-style-type:none;
             flex:1.2;
             height:2.5rem;
             line-height:2.5rem;
             background:$white;
             border-radius:.2rem .2rem 0 0;
             @include fontstyle2(1.1rem,$black,500);
          }
          div:nth-of-type(2){
             text-align:center;
             list-style-type:none;
             flex:1;
             height:2rem;
             margin:.5rem .5rem 0 0;
             line-height:2rem;
             background:$redp;
             border-radius:0 .2rem 0 0;
             @include fontstyle2(.9rem,$grew1,300);
          }
       }
       .activtion{
          display:flex;
          div:nth-of-type(2){
             text-align:center;
             list-style-type:none;
             flex:1.2;
             height:2.5rem;
             line-height:2.5rem;
             background:$white;
             border-radius:.2rem .2rem 0 0;
             margin:0;
             @include fontstyle2(1.1rem,$black,500);
          }
          div:nth-of-type(1){
             text-align:center;
             list-style-type:none;
             flex:1;
             height:2rem;
             line-height:2rem;
             margin:.5rem 0 0 .5rem;
             background:$redp;
             border-radius:.2rem 0 0 0;
             @include fontstyle2(.9rem,$grew1,300);
          }
       }
       .container_one{
          background:$white;
          border-radius:0 .2rem .2rem .2rem;
          padding:.8rem;
          .inputAddress{
             .address{
                position:relative;
                @include wh(100%,2.5rem);
                line-height:2.5rem;
                border-bottom:.02rem solid $grew4;
                span{
                    @include fontstyle2(1.1rem,$grew1,300);
                }
                .setIcon{
                    position:absolute;
                    right:0;
                    top:1rem;
                }
             }
             .setTime{
                position:relative;
                @include wh(100%,2.5rem);
                line-height:2.5rem;
                .timeType{
                   @include fontstyle2(1.1rem,$black,500);
                }
                .chooseTime{
                   position:absolute;
                   right:0;
                   top:0;
                   @include fontstyle2(.9rem,$blue,500);
                   transform:translateY(5%);
                }
             }
          }
       }
       .activeOne{
          border-radius:.2rem 0 .2rem .2rem;
       }
       .container_two{
          background:$white;
          margin-top:.5rem;
          padding:.8rem;
          border-radius:.2rem;
          header{
             background:$white;
             @include wh(100%,2.5rem);
             line-height:2.5rem;
             position:relative;
             border-bottom:.02rem solid $grew4;
             span:nth-of-type(1){
                 @include fontstyle2(1.1rem,$grew1,500);
             }
             span:nth-of-type(2){
                 position:absolute;
                 right:0;
                 display:inline-block;
                 line-height:1.2rem;
                 @include wh(3.8rem,1.2rem);
                 @include fontstyle2(.8rem,$black,500);
                 text-align:center;
                 margin-top:.6rem;
                 background-image: linear-gradient(135deg, transparent .2rem, $orange 0),
                                   linear-gradient(-45deg, transparent .2rem, $orange 0);
                                   background-repeat: no-repeat;
                                   background-size: 90% 100%;
                                   background-position: left top, right bottom;
             }
          }
          .food_lists{
             border-bottom:.02rem solid $grew4;
             ul{
                li{
                   list-style-type:none;
                   margin:1.2rem 0;
                   @include wh(100%,4rem);
                   img{
                      float:left;
                      @include wh(4rem,4rem);
                   }
                   div:nth-of-type(1){
                      height:2rem;
                      margin-left:4.5rem;
                      span:nth-of-type(1){
                        line-height:2rem;
                        @include fontstyle2(1rem,$black,500);
                      }
                      span:nth-of-type(2){
                        float:right;
                        line-height:2rem;
                        @include fontstyle2(1rem,$black,530);
                      }
                   }
                   div:nth-of-type(2){
                      height:2rem;
                      margin-left:4.5rem;
                      line-height:2rem;
                      @include fontstyle2(.9rem,$grew1,530);
                   }
                }
             }
          }
          .shop_pay{
             padding:.8rem 0;
             border-bottom:.02rem solid $grew4;
             @include wh(100%,2rem);
             line-height:2rem;
             span:nth-of-type(1){
                  @include fontstyle2(1rem,$black,500);
             }
             span:nth-of-type(2){
                  float:right;
                  @include fontstyle2(1rem,$black,500);
             }
          }
          .quan{
             padding:.8rem 0;
             border-bottom:.02rem solid $grew4;
             @include wh(100%,4rem);
             line-height:2rem;
             div{
                  @include fontstyle2(1rem,$black,500);
                  span:nth-of-type(2){
                      text-align:right;
                      float:right;
                      @include fontstyle2(1rem,$grew1,500);
                  }
             }
          }
          .countPay{
              padding:.8rem 0;
              @include wh(100%,2rem);
              line-height:2rem;
              span:nth-of-type(1){
                  @include fontstyle2(.9rem,$grew1,500); 
              }
              span:nth-of-type(2){
                  float:right;
                  @include fontstyle2(.8rem,$black,500); 
                  span{
                      @include fontstyle2(1.2rem,$red,500); 
                  }
              }
              span:nth-of-type(3){
                  float:right;
                  padding-right:.5rem;
                  @include fontstyle2(.8rem,$black,500);
                  line-height:2.5rem; 
                  span{
                      @include fontstyle2(.8rem,$red,500); 
                  }
              }

          }
       }
       .container_three{
          background:$white;
          margin-top:.5rem;
          padding:.8rem;
          border-radius:.2rem;
          .beizhu,.fapiao{
             padding:.8rem 0;
             border-bottom:.02rem solid $grew4;
             @include wh(100%,2rem);
             line-height:2rem;
             span:nth-of-type(1){
                 @include fontstyle2(1rem,$black,500);
             }
             span:nth-of-type(2){
                 float:right;
                 span{
                 @include fontstyle2(.9rem,$grew1,500);
                 padding-right:.3rem;
                 }
             }
          }
          .phone{
             padding:.8rem 0;
             border-bottom:.02rem solid $grew4;
             @include wh(100%,2rem);
             line-height:2rem;
             span:nth-of-type(1){
                 @include fontstyle2(1rem,$black,500);
             }
             span:nth-of-type(2){
                 float:right;
                 span{
                 @include fontstyle2(1rem,$black,500);
                 padding-right:.3rem;
                 }
             }
          }
          .zhifu{
             padding:.8rem 0;
             @include wh(100%,2rem);
             line-height:2rem;
             span:nth-of-type(1){
                 @include fontstyle2(1rem,$black,500);
             }
             span:nth-of-type(2){
                 float:right;
                 span{
                 @include fontstyle2(1rem,$black,500);
                 padding-right:.3rem;
                 }
             }

          }
       }
   }
   .bottom_pay{
       position:fixed;
       bottom:0;
       @include wh(100%,3rem);
       background:$black;
       margin:0 0 0 -3%;
       display:flex;
       line-height:3rem;
       @include fontstyle2(1rem,$white,500);
       span:nth-of-type(1){
          display:inline-block;
          flex:1.2;
          padding-left:.8rem;
       }
       span:nth-of-type(2){
          display:inline-block;
          flex:1;
          text-align:right;
          padding-right:.4rem;
       }
       span:nth-of-type(3){
          display:inline-block;
          flex:1;
          @include wh(100%,100%);
          @include fontstyle2(1.1rem,$black,500);
          background:$orange;
          text-align:center;
       }
   }
}
</style>