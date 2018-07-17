<template>
 <div class="merch_container">
     <ul v-load-more="loaderMore" v-if="merchLists.length">
          <router-link v-for="item in merchLists" :to="{path:'lists',query:{point:myPoint,id:item.id}}" tag="li" class="merch_li">
               <div class="merch_img"><img :src='imgBaseUrl+item.image_path'></div>  
               <div class="merch_ti">
                     <div class="merch_title">
                         <h3>{{item.name}}</h3>
                         <span>{{item.distance}}</span>
                     </div> 
                     <div class="merch_score">
                         <span>
                         {{item.rating}}分 | {{item.rating_count}}人评价
                         </span>
                     </div>   
                     <div class="merch_fee">
                         <div class="merch_qisong">
                         <span>￥{{item.float_minimum_order_amount}}</span>
                         <span>起</span>
                         </div>
                         <div class="merch_yishou">
                         月售{{item.recent_order_num}}
                         </div>
                     </div>
                     <div class="merch_message">
                        <span>{{item.promotion_info}}</span>
                     </div>      
               </div>
          </router-link>
     </ul>
     <transition name="loading"> 
          <loading v-show="showLoading"></loading>
     </transition>
     <div v-show="havenomore" class="nomore">没有更多了哦</div>
 </div>
</template>
<script>
import {shopList} from '../../service/getData.js'
import loading from '../../components/common/loading1.vue';
import {imgBaseUrl} from '../../config/env.js';
import {loadMore} from '../../components/common/loadermore.js'
export default{
	name:'merchList',
	data(){
	   return{
	       offset:0,//请求数据起始位置
	       merchLists:[],//商品列表
	       showLoading:true,//显示加载动画
	       imgBaseUrl,
         havenomore:false,//没有更多了
         loading:false,//加载状态，为true表示加载中，防止重复加载
	   }
	},
	props:['myPoint'],
  mixins:[loadMore],
	components:{
	   loading
	},
	async mounted(){
	   let vm=this;
       //获取列表数据
       let lists=await shopList(this.myPoint.latLng.lat,this.myPoint.latLng.lng,this.offset);
       this.merchLists=[...lists];
       // console.log(this.merchLists);
       if(this.merchLists.length<20){
           vm.havenomore=true;
       }
       this.showLoading=false;

	},
	methods:{
	    async loaderMore(){
      let vm=this;
          if(this.havenomore||this.loading){
             return;
          }
          this.loading=true;
          this.showLoading=true;
          //console.log("more");
          this.offset+=20;
          let lists=await shopList(this.myPoint.latLng.lat,this.myPoint.latLng.lng,this.offset);
          this.merchLists=[...this.merchLists,...lists];
          console.log(this.merchLists);
          if(lists.length<20){
              vm.havenomore=true;
          }
          this.loading=false;
          this.showLoading=false;
	    }
	}
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.merch_container{
     overflow:hidden;
     white-space:nowrap;
     text-overflow:ellipsis;
     margin-bottom:5rem;
     .merch_li{
         @include wh(100%,8rem);
         border-bottom:0.05rem solid $grew4;
         .merch_img{
               float:left;
               @include wh(30%,8rem);
               position:relative;
               img{
                    position:relative;
                    top:0.8rem;
                    left:50%;
                    border:0.05rem solid $grew4;
                    transform:translateX(-50%);
;                   @include wh(70%,70%);
               }
              
         }
         .merch_ti{
               float:right;
               @include wh(70%,8rem);
               .merch_title{ 
                    padding-top:0.5rem;
                    @include wh(100%,1.5rem);
                    h3{
                        width:65%;
                        float:left;
                    }
                    span{
                        width:30%;
                        float:right;
                        padding-right:0.8rem;
                        padding-top:0.3rem;
                        @include fontstyle2(.8rem,$grew1,normal);
                        text-align:right;
                    }
               }
               .merch_score{
                    @include wh(100%,2rem);
                    line-height:1.8rem;
                    span{
                        float:left;
                        @include fontstyle2(0.9rem,$grew1,normal);
                    }
               }
               .merch_fee{
                    @include wh(100%,2rem);
                    @include fontstyle2(0.9rem,$grew1,normal);
                    line-height:1.8rem;
                    .merch_qisong{
                       float:left;
                       span:nth-of-type(1){
                           @include fontstyle2(1.3rem,$orange,bold);
                       }
                    }
                    .merch_yishou{
                       float:right;
                       padding-right:0.8rem;
                    }

               }
               .merch_message{
                       @include wh(100%,1.8rem);
                       
                       padding-top:0.1rem;
                       span{
                           @include fontstyle2(0.8rem,$red,nomal);
                           height:1rem;
                           border:0.03rem solid $redb;
                           border-radius:0.2rem;
                           padding:0.1rem 0.3rem;
                           float:left;
                           background-color:$redp;
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
.nomore{
        text-align:center;
        line-height:2rem;
        @include wh(100%,2rem);
        @include fontstyle2(1rem,$grew1,normal);
        border-bottom:0.05rem solid $grew4;
}
</style>