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
            <div class="address" @click="inAddress()">
                <span v-if="!chooseAddress">选择收货地址</span>
                <p class="hadchoose" v-if="chooseAddress">
                     <span>{{chooseAddress.tag}}</span>
                     <span>{{chooseAddress.address}}</span>
                     <span>
                     <span>{{chooseAddress.name}}</span>
                     <span v-if="chooseAddress.sex==1">(先生)</span>
                     <span v-else>(女士)</span>
                     <span class="phone">{{chooseAddress.phone}}</span>
                     </span>
                </p>
                <svg class="setIcon" width="1.2rem" height="0.7rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <polyline points="0,10 5,5 0,0" style="fill:none;stroke:#B2B2B2;stroke-width:1"/>
                </svg>
            </div>
            <div class="setTime" @click="choosegetTime()">
                <span v-if="!timeTip" class="timeType">立即送出</span>
                <span v-if="timeTip" class="timeType">指定时间</span>
                <span class="chooseTime">
                <span  v-if="!timeTip">大约半小时后送达</span>
                <span  v-if="timeTip">{{choosetime}}</span>
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
                 <span v-if="!chooseAddress">填写地址后可选</span>
                 <span v-if="chooseAddress">暂无可用</span>
             </div>
             <div>
                 <span>商家代金券</span>
                 <span v-if="!chooseAddress">填写地址后可选</span>
                 <span v-if="chooseAddress">暂无可用</span>
             </div>
        </div>
        <div class="countPay">
            <span>优惠规则</span>
            <span>小计 <span>￥{{allPay}}</span></span>
            <span v-if="manjian>0">已优惠 <span>￥{{manjian}}</span></span>          
        </div>
   </div>
   <div class="container_three"  v-if="gettre">
       <div @click="inputbeizhu()" class="beizhu">
             <span>备注</span>
             <span>
                <span v-if="!beizhu">可输入备注要求</span>
                <span else>{{beizhu}}</span>
                <svg class="setIcon" width="1.2rem" height="0.7rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <polyline points="0,10 5,5 0,0" style="fill:none;stroke:#B2B2B2;stroke-width:1"/>
                </svg>
             </span>
       </div>
       <div class="phone" @click="chooseQuehuo()">
             <span>如遇缺货</span>
             <span>
                <span>{{quehuotxt}}</span>
                <svg class="setIcon" width="1.2rem" height="0.7rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <polyline points="0,10 5,5 0,0" style="fill:none;stroke:#B2B2B2;stroke-width:1"/>
                </svg>
             </span>
       </div>
       <div class="fapiao">
             <span>发票</span>
             <span>
                <span>该商家不支持开发票</span>
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
</div>
<section class="bottom_pay">
        <span>已优惠￥{{manjian}}</span>
        <span>合计￥{{allPay}}</span>
        <span>提交订单</span>
</section>
<div class="page_cover" v-if="pageCover" @click="changeCover()"></div>
<transition name="toggle-cart">
<section class="input_address_page" v-if="inputAddressPage">
   <header>
      <span class="close" @click="changeCover()">取消</span>
      <span>选择收货地址</span>
   </header>
   <p class="title">可配送范围地址</p>
   <ul>
      <li v-for="(item,index) in adaddressLists" @click="chooseADD(item)">
         <p>{{item.address}}</p>
         <p><span>{{item.name}}</span><span v-if="item.sex==1">先生</span><span v-else>女士</span> <span>{{item.phone}}</span></p>
      </li>
   </ul>
   <p class="title">超配送范围地址</p>
   <ul>
      <li v-for="(item,index) in disaddressLists">
         <p>{{item.address}}</p>
         <p><span>{{item.name}}</span><span v-if="item.sex==1">先生</span><span v-else>女士</span> <span class="phone">{{item.phone}}</span></p>
      </li>
   </ul>
   <footer @click="addAddress()">
      <div>
      <img src="../../images/add.svg">
      <span>新增收货地址</span>     
      </div>
   </footer>
</section>
</transition>
<transition name="toggle-cart">
<section v-if="chooseTimePage" class="choose_time_page">
     <p @click="changeTimeTip(1)"><span>立即送出</span><span>5元配送费</span></p>
     <ul>
         <li v-for="(item,index) in timeLists" @click="changeTimeTip(2,item)">
            <span>{{item}}</span><span>5元配送费</span>
         </li>
     </ul>
</section>
</transition>
<transition name="toggle-cart">
<section v-if="quehuoPage" class="choose_quehuo_page">
     <ul>
         <li :class="{activeQ: quehuotxt == '缺货时电话与我沟通'}" @click="changequehuo('缺货时电话与我沟通')">
            <span>缺货时电话与我沟通</span>
         </li>
         <li :class="{activeQ:quehuotxt=='其他商品继续配送(缺货商品退款)'}" @click="changequehuo('其他商品继续配送(缺货商品退款)')">
            <span>其他商品继续配送(缺货商品退款)</span>
         </li>
         <li :class="{activeQ:quehuotxt=='有缺货直接取消订单'}" @click="changequehuo('有缺货直接取消订单')">
            <span>有缺货直接取消订单</span>
         </li>
     </ul>
     <p @click="changeCover()">取消</p>
</section>
</transition>
</div>
</template>
<script>
import {msiteAddress,shopList, shopDetails, foodMenu, getRatingList, ratingScores, ratingTags,getAddressList} from '../../service/getData.js';
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
            pageCover:false,//页面cover背景
            inputAddressPage:false,//是否显示输入地址小页
            addressLists:[],//获取地址列表
            adaddressLists:[],//可选地址列表
            disaddressLists:[],//不可选地址列表
            chooseAddress:null,//选中的地址
            chooseTimePage:false,//是否显示选择时间小页
            presentTimeHour:0,//现在的时间(小时)
            presentTimeMinus:0,//现在的时间(分钟)
            timeLists:[],//事件列表
            timeTip:false,//是否选择了其他时间
            choosetime:"",//选择的时间
            quehuoPage:false,//是否选择如遇缺货
            quehuotxt:'缺货时电话与我沟通',
	    }
	},
	components:{loading},
	mixin:[getImgPath],
	computed:{
	    ...mapState(['myCard','userInfo','beizhu']),
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
	   },
	   async inAddress(){
        if(this.userInfo && this.userInfo.user_id){
	      this.changeCover();
	      this.inputAddressPage=!this.inputAddressPage;
	       //console.log(this.inputAddressPage);
          this.addressLists= await getAddressList(this.userInfo.user_id);
          //console.log(this.addressLists);=[];
          this.adaddressLists=[];
          this.disaddressLists=[];
          for(let i=0;i<this.addressLists.length;i++){
              if(this.addressLists[i].is_deliverable){
                 this.adaddressLists.push(this.addressLists[i]);
              }else{
                 this.disaddressLists.push(this.addressLists[i])
              }
          }
          //console.log(this.addressLists);
        }else{
            // console.log(this.shopdetail.delivery_mode);
            let myPoint=this.$route.query.myPoint;
            let shopid=this.$route.query.shopid;
            let resdetail=this.$route.query.resdetail;
            this.$router.push({path:'/login',query:{shopid,myPoint,resdetail}})
            //this.$router.push({path:'/login'})
        }

	   },
	   changeCover(){
	      this.pageCover=!this.pageCover;  
	      if(this.inputAddressPage){
	         this.inputAddressPage=!this.inputAddressPage;
	      }
        if(this.chooseTimePage){
           this.chooseTimePage=!this.chooseTimePage;
        }
        if(this.quehuoPage){
           this.quehuoPage=!this.quehuoPage;
        }
	   },
     addAddress(){
        let myPoint=this.$route.query.myPoint;
        let shopid=this.$route.query.shopid;
        let resdetail=this.$route.query.resdetail;
        this.$router.push({path:'/addAddress',query:{shopid,myPoint,resdetail}})
     },
     chooseADD(item){
        this.chooseAddress=item;
        // console.log(this.chooseAddress);
        this.changeCover();
     },
     choosegetTime(){
        if(this.userInfo && this.userInfo.user_id){
            this.changeCover();
            this.chooseTimePage=!this.chooseTimePage;
            let date=new Date();
            this.presentTimeHour=date.getHours();
            this.presentTimeMinus=date.getMinutes();
            //console.log(this.presentTimeMinus);
            this.timeLists=[];
            if(this.presentTimeMinus<=30){
                let tip=0;
                this.timeLists.push(this.presentTimeHour+++":30");
                for(let i=0;i<10;i++){
                    if(tip==1){
                      this.timeLists.push(this.presentTimeHour+":30");
                      tip=0;
                    }else{
                      this.timeLists.push(this.presentTimeHour+++":0");
                      if(this.presentTimeHour==12){
                        return;
                      }
                      tip=1;
                    }
                }
            }else{
             let tip=1;
             this.timeLists.push((++this.presentTimeHour)+":0");
                for(let i=0;i<10;i++){
                    if(tip==1){
                      this.timeLists.push(this.presentTimeHour+++":30");
                      tip=0;
                    }else{
                      this.timeLists.push(this.presentTimeHour+":0");
                      if(this.presentTimeHour==12){
                        return;
                      }
                      tip=1;
                    }
                }
            }
            //console.log(this.timeLists);
        }else{
            // console.log(this.shopdetail.delivery_mode);
            let myPoint=this.$route.query.myPoint;
            let shopid=this.$route.query.shopid;
            let resdetail=this.$route.query.resdetail;
            this.$router.push({path:'/login',query:{shopid,myPoint,resdetail}})
            //this.$router.push({path:'/login'})
        }
     },
     changeTimeTip(tip,time){
         if(tip==1){
            this.timeTip=false;
            this.changeCover();
         }else{
            this.timeTip=true;
            this.choosetime=time;
            this.changeCover();
         }
     },
     inputbeizhu(){
        let myPoint=this.$route.query.myPoint;
        let shopid=this.$route.query.shopid;
        let resdetail=this.$route.query.resdetail;
        this.$router.push({path:'/beizhu',query:{shopid,myPoint,resdetail}})
     },
     chooseQuehuo(){
        this.changeCover();
        this.quehuoPage=!this.quehuoPage;
     },
     changequehuo(txt){
        this.quehuotxt=txt;
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
                width:100%;
                min-height:2.5rem;
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
                .hadchoose{
                    padding-right:1.5rem;
                    span:nth-of-type(1){
                        padding:.1rem .3rem;
                        background:rgba(55,141,237,.2);
                        @include fontstyle2(.8rem,$blue,500);
                    }
                    span:nth-of-type(2){
                        padding:.1rem .3rem;
                        @include fontstyle2(1.3rem,$black,500);
                    }
                    span:nth-of-type(3){
                        display:block;
                        span:nth-of-type(1){
                           background:$white;
                           padding:0;
                           @include fontstyle2(1rem,$black,500);
                        }
                        span:nth-of-type(2){
                           background:$white;
                           padding:0;
                           @include fontstyle2(1rem,$black,500);
                        }
                        span:nth-of-type(3){
                           display:inline;
                           background:$white;
                           @include fontstyle2(.9rem,$grew1,500);
                        }
                    }
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
                 overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
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
                 overflow: hidden;
                 white-space: nowrap;
                 text-overflow: ellipsis;
                 @include fontstyle2(.9rem,$black,500);
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
   .page_cover{
       position:absolute;
       top:0;
       left:0;
       @include wh(100%,200%); 
       background:rgba(10,10,10,.2);
   }
   .input_address_page{
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
      min-height:30rem;
      background:$white;
      z-index:50;
      header{
          position:relative;
          @include wh(100%,2.5rem);
          background:$white;
          border-bottom:.02rem solid $grew4;
          text-align:center;
          line-height:2.5rem;
          .close{
             position:absolute;
             left:.8rem;
             @include fontstyle2(.95rem,$grew1,500);
          }
      }
      .title{
          padding:1rem 0 1rem 3rem;
          @include fontstyle2(.9rem,$grew1,500);
      }
      ul{
          padding:0 0 0 3rem;
          li{
             list-style-type:none;
             border-bottom:.02rem solid $grew4;
             p:nth-of-type(1){
                margin:.5rem 0;
                @include fontstyle2(1.1rem,$grew2,500);
             }
             p:nth-of-type(2){
                margin:.5rem 0;
                @include fontstyle2(.9rem,$grew2,500);

             }
          }
      }
      footer{
         position:fixed;
         bottom:0;
         @include wh(100%,3rem);
         border-top:.02rem solid $grew4;
         div{
             position:absolute;
             left:50%;
             transform:translateX(-50%);
         img{
             float:left;
             @include wh(2rem,2rem);
             padding:.5rem .5rem;
         }
         span{
             float:left;
             @include wh(6rem,3rem);
             line-height:3rem;
             display:block;
        }
        }
      }
   }
   .choose_time_page{
      position:fixed;
      bottom:0;
      left:0;
      @include wh(100%,30rem);
      background:$white;
      overflow-y:auto;
      z-index:50;
      p{
         @include wh(100%,3rem);
         position:fixed;
         display:flex;
         text-align:center;
         background:$white;
         span{
            flex:1;
            line-height:3rem;
            @include fontstyle2(.95rem,$blue,500);
         }
      }
      ul{
        margin-top:3rem;
         li{
            @include wh(100%,3rem);
            list-style-type:none;
            display:flex;
            text-align:center;
            span{
               flex:1;
               line-height:3rem;
            }
         }
      }
   }
   .choose_quehuo_page{
      position:fixed;
      bottom:0;
      left:0;
      @include wh(100%,10rem);
      background:$white;
      overflow-y:auto;
      z-index:50;
      text-align:center;
      ul{
         li{
            list-style-type:none;
            @include wh(100%,2.5rem);
            line-height:2.5rem;
         }
         .activeQ{
                @include fontstyle2(1rem,$orange,300);
         }
      }
      p{
         @include wh(100%,2.5rem);
            line-height:2.5rem;
            border-top:.02rem solid $grew4;
      }
   }
}
.toggle-cart-enter-active, .toggle-cart-leave-active {
        transition: all .3s ease-out;
}
.toggle-cart-enter, .toggle-cart-leave-active {
        transform: translateY(100%);
}
</style>