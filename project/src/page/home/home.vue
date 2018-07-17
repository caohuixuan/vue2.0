<template>
   <div class="home">
       <head-one usertap="true">
          <div slot="logo" class="head_one" @click="reload"><span>刷新</span></div>
       </head-one>
       <div class="local">
          <div class="local_position">
               <span>当前位置：</span>
               <span>定位不准请选择城市并填写详细地址</span>
          </div>
          <router-link :to="'/city/'+localCityID" class="city_choice">
               <span>{{localCity}}</span>
               <svg class="arrow_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
          </router-link>
       </div>
       <div class="hot_city">
           <div class="hot_city_title">热门城市</div>
           <ul class="hot_city_list">
               <router-link tag="li" v-for="item in hotCities" :to="'/city/'+item.id">
                  {{item.name}}
               </router-link>
           </ul>
       </div>
       <div class="all_cities">
            <ul class="all_cities_list">
                <li v-for="(value,key) in allCities" class="zimu_list">
                    <div class="zimu_title">{{key}}</div>
                    <ul>
                        <router-link tag='li' :to="'/city/'+city.id" v-for='city in value' class="all_city">
                            {{city.name}}
                        </router-link>
                    </ul>
                </li>
            </ul>
       </div>
   </div>
</template>
<script>
import headOne from '../../components/header/headerOne.vue'
import {cityGuess, hotcity, groupcity} from '../../service/getData'
export default{
    data(){
       return{
          localCity:'',//当前城市
          localCityID:'',//当前城市ID
          hotCities:[],//热门城市
          allCities:{}//所有城市
       }
    },
	components:{
	   headOne
	},
	methods:{
	   reload(){
	      window.location.reload();
	   }
	},
	mounted(){
       // 获取当前城市
        cityGuess().then(res => {
         //   console.log("当前城市")
       //     console.log(res);
            this.localCity = res.name;
            this.localCityID = res.id;
        })
         //获取热门城市
        hotcity().then(res => {
          //  console.log(res);
            this.hotCities = res;
        })

        //获取所有城市
        groupcity().then(res => {
        //    console.log(res);
            this.allCities = res;
        })
	}
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.home{
  background-color:$grew3;
}
.head_one{
	position:relative;
	@include wh(4rem,100%);
	@include fontstyle1(1rem,#FFFFFF);
	span{
	   display:inline-block;
	   @include juzhong;
	}
}
.local{
	position:relative;
	top:3rem;
	width:100%;
  background-color:$white;
	.local_position{
	     @include wh(100%,2.5rem);
	     border-bottom:1px solid $grew4;
	     span:nth-of-type(1){
	        display:inline-block;
	        padding:0 0.8rem;
	        line-height:2.5rem;
	        text-align:center;
	        text-align:-webkit-center;
	        height:100%;
	        @include fontstyle2(0.8rem,$grew1,normal);
	     }
	     span:nth-of-type(2){
	        float:right;
	        display:inline-block;
	        padding-right:0.8rem;
	        line-height:2.5rem;
	        text-align:center;
	        text-align:-webkit-center;
	        height:100%;
	        @include fontstyle2(0.7rem,$grew2,normal);
	     }
	}
	.city_choice{
	    display:block;
        @include wh(100%,2.5rem);
        border-bottom:1px solid #eee;
        span{
            display:inline-block; 
            line-height:2.5rem;
            padding:0 0.8rem;
            @include fontstyle2(1.2rem,$green,normal);
        }
	    .arrow_right{
            padding:0 0.8rem;
	        float:right;
	        @include wh(1rem,100%);
	        fill:$grew2;
	     }
	}
}
.hot_city{
   background-color:$white;
   position:relative;
   top:3.4rem;
   overflow:hidden;zoom:1;
   .hot_city_title{
      border-bottom:0.1rem solid $grew4;
      @include wh(100%,2rem);
      line-height:2rem;
      padding-left:0.8rem;
      @include fontstyle2(1rem,$grew1,normal);
   }
   .hot_city_list{
      display:block;
      margin:0;
      @include wh(100%,4.6rem);
      background-color:$white;
      padding:0;
      text-align:center;
      border-bottom:0.1rem solid $grew4;
      li{
         display:block;
         list-style-type:none;
         float:left;
         @include wh(24.9%,2.3rem);
         line-height:2.3rem;
         border-bottom: 0.025rem solid $grew4;
         border-right: 0.025rem solid $grew4;
         @include fontstyle2(1.2rem,$green,normal);
      }
      li:nth-of-type(4n){
            border-right: none;
        }
   }
}
.all_cities{
   position:relative;
   top:3.8rem;
   .all_cities_list{
      margin:0;
      padding:0;
      .zimu_list{
        margin-bottom:0.5rem;
        list-style-type:none;
        .zimu_title{
            background-color:$white;
            padding-left:0.8rem;
            @include wh(100%, 2.5rem);
            line-height:2.5rem;
            border-top:0.1rem solid $grew4;
            border-bottom:0.1rem solid $grew4;;
            @include fontstyle2(1.2rem,$grew1,normal);
        }
        ul{ 
           background-color:$white;
           overflow:hidden;zoom:1;
           margin:0;
           padding:0;
           li{
             display:block;
             list-style-type:none;
             float:left;
             text-align:center;
             overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
             @include wh(24.9%,2.3rem);
             line-height:2.3rem;
             border-bottom: 0.025rem solid $grew4;
             border-right: 0.025rem solid $grew4;
             @include fontstyle2(1.0rem,$grew1,normal);
             }
             li:nth-of-type(4n){
             border-right: none;
             }
        }
      }
   }
}
</style>