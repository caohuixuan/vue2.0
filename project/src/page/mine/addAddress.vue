<template>
<div class="addAddress">
<header>
    <section class="goback" @click="goback()">
        <svg class="goback_icon" width="1.6rem" height="1.6rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
           <polyline points="12,18 4,9 12,0" style="fill:none;stroke:#7A8185;stroke-width:2"/>
        </svg>
    </section>
    <span>新增收货地址</span>
</header>
<section class="addAddress_contianer">
     <p>
       <span>联系人:</span>
       <input type="text" placeholder='请填写收货人信命' v-model="name">
     </p>
     <p>
       <span></span>
       <span class="chooseSex">
           <svg class="address_empty_right" @click="sex=1" width="1.8rem" height="1.8rem" :class="{choosed: sex == 1}">
               <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
           </svg>
           <span class="sex">先生</span>
       </span>
       <span class="chooseSex">
           <svg class="address_empty_right" @click="sex=2" width="1.8rem" height="1.8rem" :class="{choosed: sex == 2}">
               <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
           </svg>
           <span class="sex">女士</span>
       </span>
     </p>
     <p>
       <span>手机号:</span>
       <input type="text" placeholder='请填写收货手机号' v-model="phone">
     </p>
     <p @click="searchAddress()">
       <span>收货地址:</span>
       <span class="chooseADD" v-if="address==''">点击选择</span>
       <span class="chooseADD" v-else>{{address}}</span>
       <svg class="setIcon" width="1.2rem" height="0.7rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <polyline points="0,10 5,5 0,0" style="fill:none;stroke:#B2B2B2;stroke-width:1"/>
       </svg>
     </p>
     <p>
       <span>门牌号:</span>
       <input type="text" placeholder='例:16号楼112室' v-model="menpai">
     </p>
     <p>
       <span>设为常用地址:</span>
       <ul>
          <li :class="{chooseType:type=='家'}" @click="type='家'">家</li>
          <li :class="{chooseType:type=='公司'}"  @click="type='公司'">公司</li>
          <li :class="{chooseType:type=='学校'}"  @click="type='学校'">学校</li>
       </ul>
     </p>
     <p>
       <button @click="addThisAdd()">保存地址</button>
     </p>
</section>
<div class="error_tip">{{alertTxt}}</div>
<transition name="toggle-cart">
     <section class="searchA" v-if="showSearch">
       <header>
         <span  @click="togglechange()">取消</span>
       </header>
       <ul>
         <li @click="getaddress(item.address)" v-for="(item,index) in searchResult">
              <p>{{item.name}}</p>
              <p><span>地址：</span>{{item.address}}</p>
         </li>
       </ul>
     </section>
</transition>
<section @click="togglechange()" class="cover" v-if="showSearch">
</section>
</div>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
import {postAddAddress} from '../../service/getData.js';
export default{
	name:'addAddress',
	data(){
	   return{
	     name:'',
	     phone:'',
         menpai:'',
         sex:1,
         type:'',
         type_tag:null,
         address:'',
         showSearch:false,//
         searchResult:[],
         alertTxt:'',
         latlng:'',
         anntherPhoneNumber:''
	   }
	},
	computed:{
	    ...mapState(['userInfo']),
	},
	methods:{
	   goback(){
        if(this.$route.query.myPoint){
            let myPoint=this.$route.query.myPoint;
            let shopid=this.$route.query.shopid;
            let resdetail=this.$route.query.resdetail;
            this.$router.push({path:'/myCart',query:{shopid,myPoint,resdetail}})
        }else{
           this.$router.go(-1);
        }
        
     },
     searchAddress(){
        this.togglechange();
        if(this.$route.query.myPoint){
          // console.log(this.$route.query.myPoint);    
            var vm=this;
          var searchService = new qq.maps.SearchService({
             complete : function(results){
                 vm.searchResult=[];
                 var pois=results.detail.pois;
                 console.log(pois);
                 for(let i=0;i<pois.length;i++){
                 vm.searchResult.push(pois[i]);
                 }
             },
             error: function() {

             }
        });
         searchService.search(vm.$route.query.myPoint.address);
        }
     },
     togglechange(){
        this.showSearch=!this.showSearch;
     },
     getaddress(name){
        this.address=name;
        this.togglechange();
     },
     async addThisAdd(){
        if(this.type=='家'){
            this.type_tag=2;
        }else if(this.type=='公司'){
            this.type_tag=3;
        }else if(this.type=='学校'){
            this.type_tag=4;
        }

        if(!this.name){
            this.alertTxt="请填写用户名"
            return;
        }else if(!this.phone){
            this.alertTxt="请填写手机号"
            return;
        }else if(!this.address){
            this.alertTxt="请填写收货地址"
            return;
        }else if(!this.menpai){
            this.alertTxt="请填写门牌号"
            return;
        }else if(!this.menpai){
            this.alertTxt="请填写门牌号"
            return;
        }else if(!this.type_tag){
            this.alertTxt="请选择常用地址"
            return;
        }else{
            this.latlng=this.$route.query.myPoint.latLng.lat+','+this.$route.query.myPoint.latLng.lng;
           let res = await postAddAddress(this.userInfo.user_id, this.address, this.menpai, this.latlng, this.name, this.phone, this.anntherPhoneNumber, 0, this.sex, this.type, this.type_tag); 
           console.log(res);
           if(res.status==1){
              if(this.$route.query.myPoint){
            let myPoint=this.$route.query.myPoint;
            let shopid=this.$route.query.shopid;
            let resdetail=this.$route.query.resdetail;
            this.$router.push({path:'/myCart',query:{shopid,myPoint,resdetail}})
            }else{
           this.$router.go(-1);
             }
           }else{
             alert("保存地址失败")
           }
        }
     }
	}
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.toggle-cart-enter-active, .toggle-cart-leave-active {
        transition: all .3s ease-out;
}
.toggle-cart-enter, .toggle-cart-leave-active {
        transform: translateY(100%);
}
.addAddress{
   position:absolute;
   top:0;
   left:0;
   @include wh(100%,100%);
   header{
      @include wh(100%,3rem);
      .goback{
         padding:.8rem 0 0 .8rem;
      }
      span{
         position:absolute;
         top:.6rem;
         left:2.8rem;
         @include fontstyle2(1.1rem,$grew1,400);
      }
   }
   .addAddress_contianer{
      background:$white;
      padding:0 .8rem;
      p{
        position:relative;
        height:3rem;
        border-bottom:.02rem solid $grew4;
        line-height:3rem;
        span{
           display:inline-block;
           width:6.5rem;
           @include fontstyle2(1rem,$black,400);
        }

        input{
          border:none;
          @include fontstyle2(1rem,$black,500);
          outline:none;
       }
       .chooseSex{
         position:relative;
         .address_empty_right{
          fill:$grew2;
          position:absolute;
          top:.6rem;
          left:.2rem;
         }
         .choosed{
            fill:$orange;
         }
         .sex{
           padding-left:3rem;
           width:2rem;
         }
       }
       .chooseADD{
         @include wh(13rem,2rem);
         overflow:hidden;
         white-space: nowrap;
         text-overflow: ellipsis;
         @include fontstyle2(1rem,$grew1,400);
       }
       .setIcon{
         float:right;
         margin-top:1.2rem;
       }
       ul{
         position:absolute;
         top:0;
         left:6.5rem;
         @include wh(12rem,3rem);
         li{ 
           line-height:1.5rem;
           list-style-type:none;
           float:left;
           text-align:center;
           margin:0.7rem .3rem;
           @include wh(3rem,1.5rem);
           border:.1rem solid $grew4;
           @include fontstyle2(1rem,$grew1,500);
         }
         .chooseType{
           border:.1rem solid $orange1;
           @include fontstyle2(1rem,$orange1,500);
           background:rgba(255,209,97,.2);
         }
       }
       button{
         position:absolute;
         top:.5rem;
         left:50%;
         transform:translateX(-50%);
         @include wh(80%,2rem);
         border:none;
         background:$orange;
         @include fontstyle2(1rem,$black,500);

       }
      }
   }
   .searchA{
      position:fixed;
      bottom:0;
      @include wh(100%,38rem);
      background:$white;
      z-index:60;
      overflow-y:auto;
      header{
         position:fixed;
         @include wh(100%,2.5rem);
         border-bottom:.1rem solid $grew2;
         span{
            left:.8rem;
         }
      }
      ul{
         position:relative;
         top:2.5rem;
         li{
            list-style-type:none;
            padding:.5rem .8rem;
            border-bottom:.02rem solid $grew4;
         }
      }
   }
   .cover{
      position:absolute;
      top:0;
      left:0;
      @include wh(100%,100%);
      background:rgba(10,10,10,.2);
      z-index:20;
   }
   .error_tip{
      margin:.8rem;
      color:$red;
   }
}
</style>