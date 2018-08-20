<template>
<div class="beizhu_page">
<header>
    <section class="goback" @click="goback()">
        <svg class="goback_icon" width="1.6rem" height="1.6rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
           <polyline points="12,18 4,9 12,0" style="fill:none;stroke:#7A8185;stroke-width:2"/>
        </svg>
    </section>
    <span>添加备注</span>
    <span @click="complate()">完成</span>
</header>
<section class="txtarea">
     <textarea class="input_area" v-model="beizhuText" maxlength="50" placeholder="可输入备注要求,最多50个字，不支持额外代购其他商品哟~"></textarea>
</section>
<p>{{txtLength}}/50</p>
</div>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
export default{
	name:'signin',
	data(){
	   return{
           beizhuText:'',
           txtLength:0,
	   }
	},
	watch:{
       beizhuText:function(value){
             console.log(value.length);
             this.txtLength=value.length;
       }
	},
	methods:{
	   ...mapMutations([
             'setBeizhu'
	    ]),
	   goback(){
         let myPoint=this.$route.query.myPoint;
         let shopid=this.$route.query.shopid;
         let resdetail=this.$route.query.resdetail;
         this.$router.push({path:'/myCart',query:{shopid,myPoint,resdetail}})

       // this.$router.go(-1);
	   },
	   complate(){
            this.setBeizhu(this.beizhuText);
            this.goback();
	   }
	}
}
</script>
<style lang="scss" scoped>
@import "../../style/mixin.scss";
.beizhu_page{
	 position:absolute;
	 top:0;
	 left:0;
	 @include wh(100%,100%);
	 background:$white;
	 header{
	    position:relative;
	    @include wh(100%,2.5rem);
	    background:$grew3;
	    .goback{
	        display:inline;
	        .goback_icon{
              padding:.5rem;
	        }
	    }
	    span:nth-of-type(1){
	       line-height:2.5rem;
	       position:absolute;
	       @include fontstyle2(1.1rem,$black,400);
	    }
	    span:nth-of-type(2){
	       line-height:2.5rem;
	       position:absolute;
	       right:1rem;
	       @include fontstyle2(1.1rem,$black,400);
	    }
	 }
	 .txtarea{
	    @include wh(90%,13rem);
	    padding-top:1rem;
	    position:absolute;
	    left:50%;
	    transform:translateX(-50%);
	    .input_area{
	       position:absolute;
	       left:50%;
	       transform:translateX(-50%);
	       @include wh(100%,8rem);
	       background-color:$grew3;
           border: 0.025rem solid $grew1;
           resize: none;
           border-radius: .2rem;
           padding:.5rem;
           @include fontstyle2(1.1rem,$black,400);
           outline:none;

	    }
	 }
	 p{
	    z-index:20;
	    position:absolute;
	    top:11rem;
	    left:82%;
	    @include fontstyle2(1.1rem,$grew2,400);
	 }
}
</style>