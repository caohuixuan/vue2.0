<template>
<div class="userInfo">
<header>
   <router-link tag='section' class="goback" :to="{path:'/mine'}">
        <svg class="goback_icon" width="1.6rem" height="1.6rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
           <polyline points="12,18 4,9 12,0" style="fill:none;stroke:#7A8185;stroke-width:2"/>
        </svg>
   </router-link>
   <span>个人信息</span>
</header>
<section class="userInfo_contianer">
    <p>
       <span>头像</span>
       <svg class="" width="1.2rem" height="0.7rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="0,10 5,5 0,0" style="fill:none;stroke:#B2B2B2;stroke-width:1"/>
       </svg>
       <img :src="imgBaseUrl+userInfo.avatar">
       
    </p>
    <p>
       <span>昵称</span>
       <svg class="" width="1.2rem" height="0.7rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="0,10 5,5 0,0" style="fill:none;stroke:#B2B2B2;stroke-width:1"/>
       </svg>
       <span>{{userInfo.username}}</span>
       
    </p>
    <p>
       <span>生日</span>
       <svg class="" width="1.2rem" height="0.7rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="0,10 5,5 0,0" style="fill:none;stroke:#B2B2B2;stroke-width:1"/>
       </svg>
       <span>{{userInfo.registe_time}}</span>
       
    </p>
    <p>
       <span>收货地址</span>
       <svg class="" width="1.2rem" height="0.7rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="0,10 5,5 0,0" style="fill:none;stroke:#B2B2B2;stroke-width:1"/>
       </svg>
       <span>修改/添加</span>
      
    </p>
</section>
</div>
</template>
<script>
import {mapState} from 'vuex';
import {imgBaseUrl} from '../../config/env.js';
export default{
	name:'userInfo',
	data(){
	   return{
	       imgBaseUrl
	   }
	},

    computed:{
       ...mapState([
           'userInfo'
       ]),
    },
    mounted(){
       console.log(this.userInfo);
    }

}
</script>
<style lang="scss" scoped>
@import "../../style/mixin.scss";
.userInfo{
	header{
	    position:relative;
	    @include wh(100%,2.5rem);
	    background:$grew4;
	    border-bottom:.03rem solid $grew2;
	    .goback{
           padding:.7rem .8rem;
	    }
	    span{
	       line-height:2.5rem;
           position:absolute;
           top:0;
           left:2.5rem;
	    }
	}
	.userInfo_contianer{
	    margin:.8rem 0;
        @include wh(100%,13rem);
        background:$white;
        line-height:3rem;
        p{
           @include wh(100%,3rem);
           border-bottom:.02rem solid $grew4;
           svg{
              float:right;
              margin-top:1.2rem;
           }
           span:nth-of-type(1){
              padding-left:.8rem;
           }
           span:nth-of-type(2){
              padding-right:.5rem;
              float:right;
           }
        }
        p:nth-of-type(1){
           height:4rem;
           line-height:4rem;
           img{
              float:right;
              padding:.6rem .5rem;
              @include wh(2.5rem,2.5rem);
              border-radius:50%;
           }
           svg{
              margin-top:1.8rem;
           }
        }
	}
}
</style>