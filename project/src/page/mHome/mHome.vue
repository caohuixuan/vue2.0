<template>
<div>
    <head-two>
        <div slot="cityname" class="city_name" @click="goback">{{this.myCity}}</div>
        <input slot="searchRestaurant" placeholder="点击搜索附近" class="search_restaurant" @click="goSearch()">
        <svg class="search_icon" slot="searchIcon" width="10%" height="60%" xmlns="http://www.w3.org/2000/svg" version="1.1">
	    			<circle cx="8" cy="8" r="7" stroke="#7A8185" stroke-width="1" fill="none"/>
	    			<line x1="14" y1="14" x2="20" y2="20" style="stroke:#7A8185;stroke-width:2"/>
	    		</svg>
    </head-two>
    <div class="banner swiper-container">
        <div class="swiper-wrapper">
              <div class="swiper-slide"><img src="../../images/banner1.jpg" /></div>
              <div class="swiper-slide"><img src="../../images/banner2.jpg" /></div>
              <div class="swiper-slide"><img src="../../images/banner1.jpg" /></div>
              <div class="swiper-slide"><img src="../../images/banner2.jpg" /></div>
              <div class="swiper-slide"><img src="../../images/banner1.jpg" /></div>
              <div class="swiper-slide"><img src="../../images/banner2.jpg" /></div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
    <nav class="container_type">
        <p style="display:none;">此项后期优化，从后台调取数据,暂时使用雪碧图</p>
        <ul>
               <li><p class="food"></p><span>美食</span></li>
               <li><p class="movie"></p><span>电影</span></li>
               <li><p class="hotel"></p><span>住宿</span></li>
               <li><p class="play"></p><span>休闲娱乐</span></li>
               <li><p class="takeout"></p><span>外卖</span></li>
        </ul>
    </nav>
    <nav class="container_list">
        <p style="display:none;">此项后期优化，从后台调取数据,svg图标</p>
        <ul>
                <li><img src="../../images/car.svg" /><span>打车</span></li>
                <li><img src="../../images/hotel.svg" /><span>民宿</span></li>
                <li><img src="../../images/tourism.svg" /><span>旅游</span></li>
                <li><img src="../../images/hair.svg" /><span>美发</span></li>
                <li><img src="../../images/bic.svg" /><span>摩拜单车</span></li>
                <li><img src="../../images/qinzi.svg" /><span>亲子乐园</span></li>
                <li><img src="../../images/train.svg" /><span>车票</span></li>
                <li><img src="../../images/study.svg" /><span>学习培训</span></li>
                <li><img src="../../images/guji.svg" /><span>景点门票</span></li>
                <li><img src="../../images/types.svg" /><span>全部分类</span></li>
        </ul>
    </nav>
    <div class="guess_you_list">
        <div class="list_title">- 猜你喜欢 -</div>
        <merch-list v-if="hasList" :myPoint="myPoint"></merch-list>
    </div>
    <foot-guide :home="true" :point="myPoint"></foot-guide>
</div>
</template>
<script>
import headTwo from '../../components/header/headerTwo.vue';
import '../../plugin/swiper.min.js'
import {mapState,mapMutations} from 'vuex'
import footGuide from '../../components/footer/footerGuide.vue'
import merchList from '../merchList/merchList.vue'
export default{
	name:'mHome',
	data(){
	   return{
	       hasList:false,//成功过去信息后显示
	       mypoint:null,//传递到merchlist页面的坐标
	   }
	},
	components:{
	   headTwo,
	   footGuide,
	   merchList
	},
	methods:{
	   ...mapMutations([
           'setPoint'
	   ]),
	   goback(){
	       this.$router.push({path:'/home'})
	   },
	   goSearch(){
	       this.$router.push({path:'/searchT'})
	      // console.log("111")
	   }
	},
	computed:{
	   ...mapState([
          'myCity','myPoint'
	   ])
	},
	async beforeMount(){    
	    //console.log(this.myPoint)
	    if(!this.$route.query.point){
	    }else{
     
           this.setPoint(this.$route.query.point);
           this.mypoint=this.$route.query.point;
	        //console.log(this.$route.query.point.latLng.lat);
	    }
	    this.hasList=true;
	},
	mounted(){
	    let swiper=new Swiper('.swiper-container', {
		    pagination: '.swiper-pagination',
            paginationClickable: true,
            speed: 500,
            loop: true,
            observer:true,
            observeParents:true,
            autoplayDisableOnInteraction : false,
            autoplay:3000
		    });
	}
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
@import '../../style/swiper.min.css';
.city_name{
    line-height:2.5rem;
	@include wh(20%,2.5rem)
	text-align:center;
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
	@include fontstyle2(1.1rem,$grew1,normal);
}
.search_restaurant{
    @include wh(50%,1.5rem);
	@include juzhong();
	padding-left:2rem;
	outline:none;
	border-radius:1rem;
    border:0.05rem solid $grew2;
    background-color:$grew3;
}
.search_icon{
	position:absolute;
	top:0.6rem;
	left:22%;
	@include wh(1.5rem,2rem);
}
.banner{
	position:absolute;
	top:2.5rem;
	@include wh(100%,6rem);
}
.swiper-container{
    text-align:center;
	.swiper-wrapper{
	    .swiper-slide{
	          img{
	               @include wh(100%,100%);
	          }
	    }
	}
	.swiper-pagination{
         position:absolute;
         left:50%;
         top:4.5rem;
         transform: translateX(-50%);
	     @include wh(6rem,1.5rem);
	}
}
.container_type{
	position:absolute;
	top:8.5rem;
	border-bottom:0.05rem solid $grew4;
	@include wh(100%,5rem);
	ul{
	   margin:0;
	   padding:0;
	   background-color:$white;
	   @include wh(100%,5rem);
	   li{
	       position:relative;
	       list-style-type:none;
	       float:left;
	       @include wh(20%,5rem);
	       text-align:center;
	       @include fontstyle2(0.9rem,$grew1,normal);
	       p{ 
              position:relative;
              left:50%;
              top:0.5rem;
              transform:translateX(-50%);
	          @include wh(3rem,3rem);
	          background-image:url('../../images/circle_icon_one.png'); background-repeat:no-repeat;
	          background-size: 30rem 35rem;
	       }
	       p.food{
              background-position:-4.5rem -4rem;
	       }
	       p.movie{
              background-position:-22.3rem -7.3rem;
	       }
	       p.hotel{
              background-position:-15.3rem -13.7rem;
	       }
	       p.play{
              background-position:-4.5rem -10.5rem;
	       }
	       p.takeout{
              background-position:-18.7rem -7.3rem;
	       }
	       span{
	          display:inline-block;
	          margin-top:0.5rem;
	       }
	   }
	   
	}
}
.container_list{
	position:absolute;
	top:13.55rem;
    background-color:$white;
	ul{
	   li{
	      list-style-type:none;
	      float:left;
	      text-align:center;
	      @include fontstyle2(0.6rem,$grew1,normal);
	      @include wh(20%,3.5rem);
	      img{
	           margin-top:0.5rem;
               @include wh(100%,1.8rem);
	      }
	   }
	}
}
.guess_you_list{
	position:absolute;
	top:21rem;
    background-color:$white;
    width:100%;
    .list_title{
        text-align:center;
        line-height:2rem;
        @include wh(100%,2rem);
        @include fontstyle2(1rem,$grew1,normal);
        border-bottom:0.05rem solid $grew4;
    }
}
</style>