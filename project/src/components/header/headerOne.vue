<template>
    <header class="head_top">
        <slot name="logo"></slot>
        <slot name="city_name"></slot>
        <section class="goback" @click="$router.go(-1)" v-if="goback">
              <svg class="goback_icon" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </section>
        <router-link :to="userState? '/login':'/signin'" v-if="usertap" class="user_message">
           <svg class="user_icon" v-if="userState">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
           </svg>
           <span class="user_line" v-else>登录|注册</span>
        </router-link>
        <slot name="change_city"></slot>
    </header>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default{
	name:'header-one',
	computed:{
	   ...mapState([
           'userState'
	   ])
	},
	props:['goback','usertap','changecity']
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.head_top{
	 background-color:$green;
	 position:fixed;
	 z-index:100;
	 left:0;
	 top:0;
	 @include wh(100%,3rem);
}
.goback{
	 @include wh(4rem,3rem);
}
.goback_icon{
    margin-top:1rem;
    margin-left:0.8rem;
    @include wh(100%,3rem);
}
.user_message{
    @include wh(5rem,3rem);
    position:absolute;
    top:0;
    right:0;
    text-align:center;
    text-decoration:none;
    @include fontstyle2(1rem,$white,normal)
    .user_icon{
         position:absolute;
         top:0.7rem;
         right:0.8rem;
         fill:$white;
         @include wh(1.6rem,1.6rem);
    }
    .user_line{
         line-height:3rem;
    }
}
</style>