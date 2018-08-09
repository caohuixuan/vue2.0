<template>
    <div class="listscontianer">
        <div class="container_top" @click="showActive">
              <div id="bg" class="bg bg-blur"></div>
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
        <div id="contianer_active"  @click="showActive" class="contianer_active" v-if='actives'>
              <span class="red_circle">减</span>
              <span v-for="act in resdetail.activities">{{act.description}}</span>
              <p>
              <span>{{resdetail.activities.length}} 个活动</span>
              <svg class="" width="1.2rem" height="0.7rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="0,10 5,5 0,0" style="fill:none;stroke:#B2B2B2;stroke-width:1"/>
              </svg>
              </p>
        </div>
        <transition name="">
        <section class="container_page">
        <div class="change_nav">
              <div :class="{actionType:showType=='food'}" @click="changeNav('food')">
                  <span>点菜</span>
              </div>
              <div :class="{actionType:showType=='pingjia'}" @click="changeNav('pingjia')">
                  <span>评价</span>
              </div>
              <div :class="{actionType:showType=='shangjia'}" @click="changeNav('shangjia')">
                  <span>商家</span>
              </div>
        </div>
        <transition name="type-choose">
              <section id="food_T" v-show="showType=='food'" class="food_page">
                  <div class="food_menu_l" id="menu_l" ref="menu_l">
                       <ul>
                           <li v-for="(item,index) in menuList" class="food_menu_li" :class="{actionMenu:index==menuIndex}" @click="chooseMenu(index)">
                               <img :src="getImgPath(item.icon_url)">
                               <span>{{item.name}}</span>
                               <span class="menu_count" v-if="menuCount[index]">{{menuCount[index]}}</span>  
                           </li>
                       </ul>
                  </div>
                  <div class="food_menu_r" ref="menu_r">
                       <ul>
                           <li v-for="(item,index) in menuList">
                               <header class="r_title">
                                    <span>{{item.name}}</span>
                                    <span>{{item.description}}</span>
                               </header>
                               <div v-for='(food,num) in item.foods' class="r_detail">                   
                                   <div class="food_img" @click="showDetail(food)">
                                      <img :src="imgBaseUrl+food.image_path">
                                   </div>
                                   <div class="food_detail" @click="showDetail(food)">
                                      <h3 class="food_detail_title">{{food.name}}</h3>
                                      <p class="food_detail_description">{{food.description}}</p>
                                      <p class="food_detail_count">
                                           <span>月售{{food.month_sales}}</span>
                                           <span>好评{{food.satisfy_rate}}%</span>
                                      </p>
                                      <p class="food_detail_activity">
                                         <span v-if="food.activity">{{food.activity.image_text}}</span>
                                      </p>
                                   </div>
                                   <div class="food_pay">
                                      <p class="food_detail_price">
                                          <span>￥</span>
                                          <span>{{food.specfoods[0].price}}</span>
                                          <span v-if="food.specifications.length">起</span>
                                      </p>
                                      <order-c class="order_type" :shopid='shopid' :food='food' @showChooseType="showChooseType" @minusChooseType="minusChooseType"></order-c>
                                   </div>
                               </div> 
                           </li>
                       </ul>
                  </div>
                  <section :class="allCount==0?'cartContianer':'cartContianerAction'">
                       <div class="noNum" v-if="!allCount">
                             <img src="../../images/postman.svg">
                             <span>另需配送费5元</span>
                             <div>￥30起送</div>
                       </div>
                       <div class="hasNum" @click="showCartList" v-if="allCount" >
                             <img src="../../images/postman1.svg">
                             <span>￥{{allCount}}</span>
                             <div>￥30起送</div>
                             <div class="chapay" v-if='chaPay>0' >还差{{chaPay}}</div>
                             <router-link :to="{path:'/myCart',query:{shopid,myPoint,resdetail}}" tag="div" class="goPay">去结算</router-link>
                       </div>
               </section>
             </section>             
        </transition>
        <transition name="type-choose">
              <section id="pingjia_T" v-show="showType=='pingjia'" class="pingjia_page">
                  <section v-load-more="loadMorePingjia"  v-if='getres' class="pingjia_contianer">
                      <div>
                           <header class="pingjia_header">
                                <div class="header_left">
                                    <p>{{resdetail.rating}}</p>
                                    <p>商家评分</p>
                                </div>
                                <div class="header_middle">
                                    <p>
                                       <span>口味</span>
                                       <rating-start class="shop_start" :rating="shopRating.food_score"></rating-start>
                                       <span>{{shopRating.food_score.toFixed(1)}}</span>
                                    </p>
                                    <p>
                                       <span>包装</span>
                                       <rating-start class="shop_start" :rating="shopRating.service_score"></rating-start>
                                       <span>{{shopRating.service_score.toFixed(1)}}</span>
                                    </p>
                                </div>
                                <div class="header_right">
                                    <p>{{(shopRating.compare_rating*100).toFixed(1)}}</p>
                                    <p>配送满意度</p>  
                                </div>
                           </header>
                           <div class="pingjia_tag">
                                <ul>
                                    <li v-for="(item,index) in shopTagLists" :class="{activeTag:index==shopTag}" @click="changeTag(index)">{{item.name}}({{item.count}})</li>
                                </ul>
                           </div>
                           <div class="pingjia_list">
                                <ul>
                                    <li class="pingjia_item" v-for="(item,index) in shopRatingLists">
                                       <div>
                                          <div class="header_img">
                                          <img class="touxiang" :src="getImgPath(item.avatar)">  
                                          </div>
                                          <header>
                                                 <div class="header_rating">
                                                    <p>{{item.username}}</p>
                                                    <p>
                                                       <span>评分</span>
                                                       <rating-start class="header_start" :rating="item.rating_star"></rating-start>
                                                       <span>{{item.rating_star}}</span>
                                                    </p>
                                                 </div>
                                                 <div class="header_time">{{item.rated_at}}</div>
                                          </header>
                                       </div>
                                          <div class="rating_text">这是自编的评价，因为没有评价文字的参数.这是自编的评价，因为没有评价文字的参数.这是自编的评价，因为没有评价文字的参数.这是自编的评价，因为没有评价文字的参数.这是自编的评价，因为没有评价文字的参数.这是自编的评价，因为没有评价文字的参数</div>
                                          <ul class="rating_img">
                                               <li v-for="(imgT,index) in item.item_ratings">
                                                   <img :src="getImgPath(imgT.image_hash)" v-if="imgT.image_hash">  
                                               </li>
                                          </ul>
                                          <ul class="rating_type">
                                            <li v-for="(nameT, index) in item.item_ratings" >
                                                {{nameT.food_name}}
                                            </li>
                                          </ul>
                                    </li>
                                </ul>
                           </div>
                      </div>
                  </section>
              </section>
        </transition>
        <transition name="type-choose">
              <section id="shangjia_T" v-show="showType=='shangjia'" class="shangjia_page">
                  <section v-if='getres' class="shangjia_contianer">
                      <div class="shop_one">
                         <p><img src="../../images/local.svg"><span>{{resdetail.address}}</span></p>
                         <p><img src="../../images/type.svg"><span>{{resdetail.category}}</span></p>
                      </div>
                      <div class="shop_two">
                         <p><img src="../../images/pay.svg"><span>{{resdetail.piecewise_agent_fee.tips}}</span></p>
                         <p><img src="../../images/time.svg"><span>{{resdetail.opening_hours[0]}}</span></p>
                      </div>
                      <div class="shop_three">
                        <p><img src="../../images/gonggao.svg"><span>{{resdetail.phone}}</span></p>
                      </div>
                  </section>
              </section>
        </transition>
        </section>
        </transition>
        <transition name="">
        <section id="activePage" class="active_page" v-if="showActTip">
            <h1>商家活动</h1>
            <p><span v-for="act in resdetail.activities">{{act.description}}</span></p>
            <h1>相关支持</h1>
            <p><span v-for="sup in resdetail.supports">{{sup.name}}</span></p>
            <h1>配送</h1>
            <p><span>配送时间</span><span>{{resdetail.opening_hours[0]}}</span></p>
            <p><span>配送费</span><span>{{resdetail.float_delivery_fee}}</span></p>
            <p><span>电话</span><span>{{resdetail.phone}}</span></p>
            <h1>公告</h1>
            <p><span>{{resdetail.promotion_info}}</span></p>
        </section>
        </transition>
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
        
        <section>
             <transition name="toggle-cart">
                <section class="cart_food_list" v-if="showCartListTip">
                    <header>
                      <h4>购物车</h4>
                        <div @click="clearAll">
                            <svg>
                              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
                            </svg>
                            <span class="clear_cart">清空</span>
                        </div>
                    </header>
                    <div class='cart_list_detail'>
                        <ul>
                           <li class="li_detail" v-for="(item,index) in cartList">
                              <span class="li_name">{{item.name}}</span>
                              <span class="li_pay">￥{{item.price}}</span>
                              <span class="li_change">
                                 <svg style="fill:#7A8185;width:1.2rem;height:1.2rem;" @click="minusCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)" width=".8rem" height=".8rem">
                                       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                                 </svg>
                                 <span class="cart_num">{{item.num}}</span>
                                 <svg class="cart_add" @click="addCart(item.category_id, item.item_id, item.food_id)" style="fill:#FFCC54;width:1.2rem;height:1.2rem;">
                                       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                                 </svg>  
                              </span>
                           </li>
                        </ul>
                    </div>
                </section>
             </transition>
        </section>
        <section class="chooseTip" v-if="noChooseTip">
              <span>请在购物车中删除商品</span>
        </section>
        <section @click="showCartList" class="backPage" v-if="showCartListTip">
        </section>
        <transition name="loading"> 
              <loading v-if="showLoading"></loading>
        </transition>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
import loading from '../../components/common/loading1.vue';
import orderC from '../order/orderC.vue'
import ratingStart from '../../components/common/ratingStart.vue';;
import {msiteAddress,shopList, shopDetails, foodMenu, getRatingList, ratingScores, ratingTags} from '../../service/getData.js'
import {imgBaseUrl} from '../../config/env.js';
import {getImgPath,loadMore} from '../../components/common/loadermore.js'
import BScroll from 'better-scroll';
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
	        menuIndexChoose:true,//
	        menuCount:[],//加入购物车单个产品数量
	        menuTop:[],//食品列表top值
	        bsscroll:null,//滑动控件
          chooseNowFood:null,//选择的当前食品
          chooseFoodType:false,//显示食品规格选项内容
	        chooseTypeNum:0,//当前选中的食品规格
          noChooseTip:false,//是否显示noshoosetip
          timer:null,//计时器
          showCartListTip:false,//是否展示购物车列表
          cartList:[],//购物车列表信息
          showActTip:false,//是否显示活动页面
          shopRating:null,//店铺评论情况
          shopRatingLists:null,//评论列表
          ratingOffset:0,//评论索引开始值
          shopTagLists:null,//店铺评论tag列表
          shopTag:0,//tag选择序号
          shopTagName:'',//tag名称
          preventRepeatRequest: false,// 防止多次触发数据请求
      }
	},
	watch:{
	    showLoading:function(value){
	       // console.log(value);
	         if(!value){
	             this.$nextTick(()=>{
	               this.getFoodListHeight();
	             })
	         }
	    },
	    
	},
	components:{loading,orderC,ratingStart},
	computed:{
        ...mapState(['myCard']),
        resmessage:function(){
             return this.resdetail.name;
        },
        shopCart:function(){
          return Object.assign({},this.myCard[this.shopid]);
        },
        foodNum:function(){
           return Object.values(this.shopCart).length;
        },
        allCount:function(){
           let myCount=0;
           this.getCartList();
           Object.values(this.shopCart).forEach((item,index)=>{
                     //   console.log(Object.values(item))
                    Object.values(item).forEach((tt,index)=>{
                        //console.log(Object.values(tt))
                     Object.values(tt).forEach((t,index)=>{
                        myCount+=Object.values(t)[3]*Object.values(t)[0]
                         //console.log(Object.values(t)); 
                    })
                    })
           })
           //console.log("price="+myCount);
           return myCount;
        },
        chaPay:function(){
           let a=35;
           return (a-this.allCount);
        },

	},
	mixins:[getImgPath,loadMore],
  created(){
      //console.log(this.$route.query);
      this.myPoint=this.$route.query.point;
      this.shopid=this.$route.query.id;  
  },
	mounted(){
	    this.init();
	},
	methods:{
      ...mapMutations([
          'ADDCART','MINUSCART'
      ]),
	    async init(){
	    const lineheight=document.documentElement.clientHeight;
      document.getElementById('food_T').style.height=(lineheight*0.0625-18.9)+'rem';
      document.getElementById('pingjia_T').style.height=(lineheight*0.0625-14.9)+'rem';
      document.getElementById('shangjia_T').style.height=(lineheight*0.0625-14.9)+'rem';
      //获取店铺信息
	    let thisres=await shopDetails(this.shopid,this.myPoint.latLng.lat,this.myPoint.latLng.lng);
	    this.resdetail=thisres;
      //console.log(this.resdetail);
      document.getElementById("bg").style.backgroundImage = "url('"+this.imgBaseUrl+this.resdetail.image_path+"')";  
              this.actives=true;
      //获取食品列表	    
      this.menuList=await foodMenu(this.shopid);
      //获取店铺评论详情
      this.shopRating=await ratingScores(this.shopid);
      //获取评论列表
      this.shopRatingLists=await getRatingList(this.shopid, this.ratingOffset); 
      //console.log(this.shopRatingLists);
      //获取评论tag列表
      this.shopTagLists=await ratingTags(this.shopid);
	    this.getres=true;
	    this.showLoading=false; 
	    },
	    chooseMenu(index){
	        this.menuIndex=index;
	        //console.log(index);
	        
	        this.menuIndexChoose=false;
	        this.bsscroll.scrollTo(0, -this.menuTop[index], 400);
            this.bsscroll.on('scrollEnd', () => {
                    this.menuIndexChoose = true;
                })
                
	    },
	    getFoodListHeight(){
	        const foodMenu=this.$refs.menu_r;
	        const foodArr=Array.from(foodMenu.children[0].children);
	        foodArr.forEach((item,index)=>{
                  this.menuTop[index]=item.offsetTop;
                  //console.log(item.offsetTop);
	        });
            this.listenToScroll(foodMenu);
	    },
	    listenToScroll(el){
            this.bsscroll=new BScroll(el,{
                  probeType: 3,
                  deceleration: 0.001,
                  bounce: false,
                  swipeTime: 2000,
            });
            const menuLeft=new BScroll('#menu_l',{
                  click: true,
            });
            const menuLeftH=this.$refs.menu_l.clientHeight;
            
            this.bsscroll.on('scroll',(pos)=>{
                  if(!this.$refs.menu_l){
                       return;
                  }
                  //console.log(pos);
                  this.menuTop.forEach((item,index)=>{
                        if(this.menuIndexChoose && Math.abs(pos.y) >= item){
                             this.menuIndex=index;
                             const menuList=this.$refs.menu_l.querySelectorAll('.actionMenu');
                             const e= menuList[0];
                             //console.log(e);
                             menuLeft.scrollToElement(e, 800, 0, 0); 
                        }
                  })
            })
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
      chooseThisType(index){
          this.chooseTypeNum=index;
      },
      addThisType(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock){
        //  console.log("加入购物车");
          this.ADDCART({shopid:this.shopid,category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock});
          this.showChooseType();
      },
      minusChooseType(){
          this.noChooseTip=true;
          clearTimeout(this.timer);
          this.timer=setTimeout(()=>{
              this.noChooseTip=false;
              clearTimeout(this.timer);
          },3000)
      },
      showCartList(){
          this.showCartListTip=!this.showCartListTip;
        //  console.log("showCartList");
      },
      getCartList(){
          let listIndex=0;
          this.cartList=[];
          //console.log(Object.values(this.shopCart));
           this.menuList.forEach((item,index)=>{
                //console.log(item);
                if(this.shopCart&&this.shopCart[item.foods[0].category_id]){
                   // console.log(Object.values(this.shopCart[item.foods[0].category_id]));
                     Object.keys(this.shopCart[item.foods[0].category_id]).forEach(itemid => {
                           // console.log(this.shopCart[item.foods[0].category_id][itemid])
                           Object.keys(this.shopCart[item.foods[0].category_id][itemid]).forEach(foodid => {
                              // console.log(this.shopCart[item.foods[0].category_id][itemid][foodid].num)
                              if(this.shopCart[item.foods[0].category_id][itemid][foodid].num>0){
                                  this.cartList[listIndex]={};
                                  this.cartList[listIndex].category_id=item.foods[0].category_id;
                                  this.cartList[listIndex].item_id=itemid;
                                  this.cartList[listIndex].food_id=foodid;
                                  this.cartList[listIndex].num=this.shopCart[item.foods[0].category_id][itemid][foodid].num;
                                  this.cartList[listIndex].price=this.shopCart[item.foods[0].category_id][itemid][foodid].price;
                                  this.cartList[listIndex].name=this.shopCart[item.foods[0].category_id][itemid][foodid].name;
                                  this.cartList[listIndex].specs=this.shopCart[item.foods[0].category_id][itemid][foodid].specs;
                                  listIndex++;
                              }
                           })
                     })
                }
           })
        //   console.log(this.cartList);
      },
      addCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock){
          this.ADDCART({shopid:this.shopid,category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock});

      },
      minusCart(category_id, item_id, food_id){
             
              this.MINUSCART({shopid:this.shopid,category_id, item_id, food_id});
              if(this.allCount==0){
                  this.showCartList();
              }
      },
      clearAll(){
         // console.log(this.cartList);
          this.cartList.forEach((item)=>{
                 let category_id=item.category_id;
                 let item_id=item.item_id;
                 let food_id=item.food_id;
                 let num=item.num;
                 for(let i=0;i<num;i++){
                      this.MINUSCART({shopid:this.shopid,category_id, item_id, food_id})
                 }
          })
          this.showCartList();
      },
      showActive(){
         this.showActTip=!this.showActTip;
         //document.getElementById('activePage').style.height=(lineheight*0.0625-18.9)+'rem';
          //console.log(this.showActTip);
      },
      showDetail(food){
       // console.log(food);
         let shopId=this.shopid;
         let mypoint=this.myPoint;
         this.$router.push({path:'/food',query:{food,shopId,mypoint}})
      },
      changeNav(nav){
         this.showType=nav;
      },
      async loadMorePingjia(){
         //  console.log("a");
           if(this.preventRepeatRequest){
               return;
           }
           this.showLoading=true;
           this.preventRepeatRequest=true;
           this.ratingOffset+=10;
           let moreRatingList=await getRatingList(this.shopid, this.ratingOffset, this.shopTagName);
           this.shopRatingLists=[...this.shopRatingLists,...moreRatingList];
           this.showLoading=false;
           if (moreRatingList.length >= 10) {
                    this.preventRepeatRequest = false;
           }

      },
      changeTag(index){
        this.shopTag=index;
      }
	}

}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.listscontianer{
	
}
.container_top{
    position:absolute;
	@include wh(100%,8rem);
	background-color:$grew5;
	z-index:10;
	box-shadow:0rem -1.5rem 1.5rem #999 inset;
	.bg {
	        position:absolute;
            background:url('../../images/rabbit.svg');
            height:8rem;
            text-align: center;
            line-height:8rem;
        }
    .bg-blur {
            float: left;
            width: 100%;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            -webkit-filter: blur(15px);
            -moz-filter: blur(15px);
            -o-filter: blur(15px);
            -ms-filter: blur(15px);
            filter: blur(15px);
        } 
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
.toggle-cart-enter-active, .toggle-cart-leave-active {
        transition: all .3s ease-out;
}
.toggle-cart-enter, .toggle-cart-leave-active {
        transform: translateY(100%);
}
.fade-enter-active, .fade-leave-active {
        transition: all 1s ease-out;
}
.fade-cart-enter, .fade-leave-active {
        transform: translateY(100%);
}
.type-choose-enter-active, .type-choose-leave-active {
        transition: opacity .5s;
    }
.type-choose-leave, .type-choose-leave-active {
        display: none;
    }
.type-choose-enter, .type-choose-leave-active {
        opacity: 0;
    }
.contianer_active{
    position:absolute;
    top:8rem;
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
    position:absolute;
    top:11rem;
	@include wh(100%,3.8rem);
	background-color:$white;
	display:flex;
    div{
      text-align:center;
      line-height:3.6rem;
      margin:0 2rem;
      height:3.6rem;
      @include fontstyle2(1.2rem,$grew1,500);
      flex:1;
    }
    .actionType{
         @include fontstyle2(1.2rem,$black,500);
         border-bottom:0.2rem solid $orange;
    }
}

.food_page{
   position:relative;
   top:14.9rem;
   width:100%;
   overflow:hidden;
   display:flex;
	.food_menu_l{
        flex:1;
        overflow-x:hidden;
        overflow-y:auto;
	    ul{
	       width:100%;
	       @include fontstyle2(1rem,$grew1,500);
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
        flex:3;
        overflow-x:hidden;
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
                       @include fontstyle2(0.8rem,$grew1,500);
                   }
               }
               .r_detail{
                   border-bottom:0.02rem solid $grew4;
                   @include wh(100%,rem);
                   .food_img{
                       text-align:center;
                       float:left;
                       @include wh(35%,7rem);
                       img{
                          @include wh(5rem,5rem);
                          margin-top:0.5rem;
                       }
                   }
                   .food_detail{
                       position:relative;
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
                   }
                   .food_pay{
                        position:relative;
                        display:block;
                        @include wh(100%,2rem);
                        padding-top:0.5rem;
                       .food_detail_price{
                            display:inline-block;
                            @include fontstyle2(1.2rem,$orange,500);
                       }
                       .order_type{
                            text-align:center;
                            padding:0 0.2rem 0 0;
                            float:right;
                            display:inline-block;
                       }
                   }
               }
            }
        }
	}
}
.pingjia_page{
   width:100%;
   position:relative;
   top:14.9rem;
   overflow-x:hidden;
   overflow-y:auto;
   .pingjia_contianer{
       .pingjia_header{
            @include wh(100%,5rem);
            background:$white;
            .header_left{
                @include wh(25%,4rem);
                float:left;
                text-align:center;
                padding-top:1rem;
                p:nth-of-type(1){
                   @include fontstyle2(1.5rem,$orange,600);
                }
                p:nth-of-type(2){
                   @include fontstyle2(.8rem,$grew1,300);
                }
            }
            .header_middle{
                @include wh(50%,5rem);
                float:left;
                p{
                  span:nth-of-type(1){
                     @include fontstyle2(.9rem,$grew1,300);
                  }
                  span:nth-of-type(2){
                     @include fontstyle2(.8rem,$orange,300);
                  }
                  text-align:center;
                  @include wh(100%,2.5rem);
                  line-height:2.5rem;
                  .shop_start{
                     display:inline-block;
                  }
                }
            }
            .header_right{
                @include wh(24%,3.5rem);
                float:left;
                text-align:center;
                margin-top:.75rem;
                padding-top:.5rem;
                border-left:.02rem solid $grew4;
                p:nth-of-type(1){
                  @include fontstyle2(1.3rem,$grew1,600);
                }
                p:nth-of-type(2){
                  @include fontstyle2(.8rem,$grew1,300);
                }
            }
       }
       .pingjia_tag{
          margin-top:.5rem;
          width:100%;
          background:$white;
          ul{
             padding:.5rem .8rem;
             display: flex;
             flex-wrap: wrap;
             li{
               list-style-type:none;
               margin:.2rem .3rem;
               padding:.2rem .3rem;
               background:$grew4;
               border:.02rem solid $grew4;
               border-radius:.2rem;
               @include fontstyle2(.9rem,$grew1,500);
             }
             .activeTag{
               border:.02rem solid $orange;
               border-radius:.2rem;
               background:$redp;
               @include fontstyle2(.9rem,$orange,500);
             }
          }
       }
       .pingjia_list{
           background:$white;
           ul{
              @include wh(100%,100%);
              .pingjia_item{
                  list-style-type:none;
                  padding:.5rem .8rem;
                  border-bottom:.02rem solid $grew4;
                  .header_img{
                    float:left;
                    text-align:center;
                    .touxiang{
                      @include wh(3rem,3rem);
                      border-radius:50%;
                      box-shadow:0rem 0rem 0.5rem #ccc;
                    }
                  }
                  header{
                      position:relative;
                      @include wh(100%,3rem);
                      padding-left:3.8rem;
                      .header_rating{
                          p:nth-of-type(1){
                             height:1.6rem;
                             line-height:1.6rem;
                             @include fontstyle2(1rem,$black,600);
                          }
                          p:nth-of-type(2){
                             span:nth-of-type(1){
                                @include fontstyle2(.9rem,$grew1,400);
                             }
                             span:nth-of-type(2){
                                @include fontstyle2(.8rem,$orange,400);
                             }
                             .header_start{
                                display:inline-block;
                                margin-left:-.5rem;
                             }
                          }
                      }
                      .header_time{
                         position:absolute;
                         top:.8rem;
                         right:4rem;
                         @include fontstyle2(.8rem,$grew1,400);
                      }
                  }
                  .rating_text{
                      @include fontstyle2(1rem,$black,400);
                      padding:.5rem .5rem .3rem 3rem;
                  }
                  .rating_img{
                        display:flex;
                        width:100%;
                        padding-left:3rem;
                         li{
                             list-style-type:none;
                             margin-right:.5rem;
                             img{
                                  @include wh(5rem,5rem);
                             }
                         }
                  }
                  .rating_type{
                        @include wh(85%,100%);
                        display:flex;
                        flex-wrap:wrap;
                        margin:.3rem .8rem .5rem 3rem;
                        li{
                           max-width:6rem;
                           overflow:hidden;
                           white-space:nowrap;
                           text-overflow:ellipsis;
                           list-style-type:none;
                           @include fontstyle2(1rem,$grew1,400);
                           border:.03rem solid $grew2;
                           margin:.2rem .2rem;
                           padding:.1rem .2rem;
                           border-radius:.2rem;
                        }
                  }
              }
           }
       }

   }
}
.shangjia_page{
   width:100%;
   position:relative;
   top:14.9rem;
   overflow-x:hidden;
   overflow-y:auto;
   .shangjia_contianer{
       div{
          background:$white;
          margin:.5rem 0;
          p{
             position:relative;
             min-height:4rem;
             padding:.5rem .8rem;
             vertical-align: middle;
             img{
                display:inline-block; 
                padding-top:1rem;
                @include wh(1.8rem,1.8rem);
             }
             span{
               position:absolute;
               top:50%;
               transform: translateY(-50%);
               display:inline-block; 
               line-height:2rem;
               padding-left:.8rem;
               @include fontstyle2(1.2rem,$black,400);
             }
          }
          p:nth-of-type(2){
             border-top:.02rem solid $grew4;
             
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
         right:0.8rem;
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
.cartContianer{
    position:fixed;
    bottom:0;
    @include wh(100%,4rem);
    background:$black;
    z-index:1000;
    .noNum{
      img{
       position:absolute;
       top:-3.3rem;
       left:0.8rem;
       @include wh(6rem,10rem);
      }
      span{
        @include fontstyle2(1rem,$grew2,400);
        line-height:4rem;
        margin-left:8rem;
      }
      div{
        position:absolute;
        top:0;
        right:0;
        line-height:4rem;
        padding-right:0.8rem;
        @include fontstyle2(1.2rem,$grew2,400);
      }
    }  
}
.cartContianerAction{
    position:fixed;
    bottom:0;
    @include wh(100%,4rem);
    background:$black;
    z-index:1000;
    .hasNum{
      img{
       position:absolute;
       top:-3.3rem;
       left:0.8rem;
       @include wh(6rem,10rem);
      }
      span{
        display:inline-block;
        @include fontstyle2(1.6rem,$white,400);
        margin-left:8rem;
        padding-top:0.3rem;
      }
      div{
        @include fontstyle2(1rem,$grew2,400);
        margin-left:8.3rem;
      }
      .chapay{
        position:absolute;
        top:0;
        right:0;
        @include wh(8.5rem,4rem);
        line-height:4rem;
        text-align:center;
        background:$black;
        z-index:100;
        @include fontstyle2(1.3rem,$grew2,500);
      }
      .goPay{
        position:absolute;
        top:0;
        right:0;
        @include wh(8rem,4rem);
        line-height:4rem;
        text-align:center;
        background:$orange;
        @include fontstyle2(1.3rem,$black,500);
      }
    }
}
.cart_food_list{
    z-index:100;
    position:fixed;
    background:$grew3;
    bottom:4rem;
    width:100%;
    header{
         padding:0 .8rem;
         @include wh(100%,2rem);
         background:$grew4;
         h4{
            line-height:2rem;
            float:left;
            @include fontstyle2(1rem,$black,400);
         }
         div{
            position:absolute;
            right:0;
            @include wh(6rem,2rem);
            text-align:center;
            line-height:2rem;
            svg{      
              color:$black;
              @include wh(.9rem,.9rem);
            }
            span{
              @include fontstyle2(.9rem,$black,400);
            }
         }
    }
    .cart_list_detail{
        position:relative;
        padding:0 .5rem;
        max-height:10rem;
        overflow-y:auto;
        overflow-x:hidden;
        width:100%;
        .li_detail{
            margin:0 .5rem;
            @include wh(90%,3rem);
            line-height:3rem;
            border-bottom:0.03rem solid $grew4;
            display:flex;
            .li_name{
              flex:2;
              @include fontstyle2(1rem,$grew1,500);
            } 
            .li_pay{
              flex:1;
              @include fontstyle2(1.1rem,$black,400);
            }
            .li_changeP{
              position:absolute;
              top:0;
            }
        }
    }
}
.backPage{
  position:absolute;
  top:0;
   @include wh(100%,100%);
   z-index:70;
   background:rgba(10,10,10,0.3);
}
.active_page{
   position:absolute;
   top:10.5rem;
   overflow-y:auto;
   @include wh(100%,100%);
   background:$white;
   padding:3rem .8rem;
   h1{
     @include fontstyle2(1.1rem,$black,600);
     padding:.8rem 0 0 0;
   }
   p:nth-of-type(1){
     padding:.5rem 0;
     @include fontstyle2(.9rem,$grew1,500);
   }
   p:nth-of-type(2){
     padding:.5rem 0;
     span{
        padding:0.2rem 0.5rem;
        margin:0.2rem;
        border:0.03rem solid $black;
        border-radius:1.5rem;
     }
   }
   p:nth-of-type(3){
     margin:0.3rem 0;
     @include fontstyle2(.9rem,$grew1,500);
   }
   p:nth-of-type(4){
     margin:0.3rem 0;
     @include fontstyle2(.9rem,$grew1,500);
   }
   p:nth-of-type(5){
     margin:0.3rem 0;
     @include fontstyle2(.9rem,$grew1,500);
   }
   p:nth-of-type(6){
     margin:0.3rem 0;
     @include fontstyle2(.9rem,$grew1,500);
   }
}
</style>