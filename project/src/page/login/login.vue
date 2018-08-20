<template>
<div class="login_page">
<header>
    <section class="goback" @click="goback()">
        <svg class="goback_icon" width="1.6rem" height="1.6rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
           <polyline points="12,18 4,9 12,0" style="fill:none;stroke:#0EC2AB;stroke-width:2"/>
        </svg>
    </section>
    <span>帮助</span>
</header>
<p>欢迎登录mm</p>
<section v-show="!mima" class="login_container">
    <div class="phone">
        <span>+86</span>
        <input type="text" v-model="phone">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="clean" @click="cleanPhone()">
            <line x1="2" y1="2" x2="18" y2="18" style="stroke:#7A8185;stroke-width:2" />
            <line x1="18" y1="2" x2="2" y2="18" style="stroke:#7A8185;stroke-width:2" />
        </svg>
    </div>
    <div class="yancode">
        <input type="text" v-model="yancode">
        <button @click="getyancode()">获取短信验证码</button>
    </div>
    <div v-if="!rightPhone" class="nophone">请输入正确的电话号码</div>
    <div class="tip">未注册的手机号验证后自动创建mm账户</div>
    <button class="loginIn">登录</button>
    <div class="changemima" @click="mima=!mima">密码登录</div>
</section>
<section v-show="mima"  class="login_container">
    <span class="tishi" v-if="showAlert">{{alertText}}</span>
    <div class="name">
        <input type="text" placeholder='用户名' v-model="name">
    </div>
    <div class="password">
        <div v-if="eye">
          <input type="password" placeholder='密码' v-model="password">
          <img @click="changeege()"  src="../../images/closeeye.svg">
        </div>
        <div v-else>
          <input type="text" placeholder='密码' v-model="password">
          <img @click="changeege()" src="../../images/openeye.svg">
        </div>
    </div>
    <div class="yancode">
        <input type="text" placeholder='验证码' v-model="yancode">
        <div class="yanImg">
           <img v-show="yanzhengImg" :src="yanzhengImg">
           <span @click="getyanzhengImg()">换一张</span>
        </div>
    </div>
    <div class="tip">未注册的手机号验证后自动创建mm账户</div>
    <button class="loginIn" @click="loginAction()">登录</button>
    <div class="changemima" @click="mima=!mima">验证码登录</div>
</section>
<footer>
   <div>
      <span><img src='../../images/weixin.svg'></span>
      <span><img src='../../images/qq.svg'></span>
   </div>
   <p>登录代表你已同意<span>《用户协议》</span></p>
</footer>
</div>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
import {mobileCode, checkExsis, sendLogin, getcaptchas, accountLogin} from '../../service/getData.js'
export default{
	name:'login',
	data(){
	   return{
	       mima:true,
	       phone:'',//phone
	       yancode:'',//验证码
	       rightPhone:true,//是否是对的电话号码
	       name:'',//用户名
	       password:'',//密码
	       eye:true,//默认闭眼
	       yanzhengImg:null,//验证码图片
	       alertText:'',//验证提示
	       showAlert:false,//是否显示验证提示
	       userInfo:null,//登录注册用户信息
	   }
	},
	computed:{
       ...mapState([
          'myPoint'
	   ])
	},
	watch:{
	    phone:function(value){
	        //console.log(value);
	    },
	    
	},
	computed:{
	   ifPhone:function(){
	      return /^1\d{10}$/gi.test(this.phone);
	   }
	},
	created(){
	   this.getyanzhengImg();
	},
	methods:{
	   ...mapMutations([
             'setUserInfo'
	   ]),
	   async getyanzhengImg(){
            let img=await getcaptchas();
            this.yanzhengImg=img.code;
	   },
	   cleanPhone(){
	       this.phone='';
	   },
	   getyancode(){
	       this.rightPhone=this.ifPhone;
	       this.yancode='';
	       if(this.ifPhone){
	         //let res = mobileCode(this.phoneNumber);   
	         //this.yancode=res.validate_token;
	         this.yancode='1234';
	         //this.rightPhone=this.ifPhone;
	       }else{
	          //this.rightPhone=this.ifPhone;
              //console.log(this.ifPhone);
	       }
	   },
	   changeege(){
	       this.eye=!this.eye;
	   },
	   async loginAction(){
	       console.log("登录");
	       if (!this.name) {
                        this.showAlert = true;
                        this.alertText = '请输入手机号/邮箱/用户名';
                        return
           }else if(!this.password){
                        this.showAlert = true;
                        this.alertText = '请输入密码';
                        return
           }else if(!this.yancode){
                        this.showAlert = true;
                        this.alertText = '请输入验证码';
                        return
           }
           //用户名登录
           this.userInfo = await accountLogin(this.name, this.password, this.yancode);
           //console.log(this.userInfo);
           if(!this.userInfo.id){
              this.showAlert = true;
              this.alertText = this.userInfo.message;
              return
           }else{
              this.setUserInfo(this.userInfo);
              if(this.$route.query.myPoint){
                 let myPoint=this.$route.query.myPoint;
                 let shopid=this.$route.query.shopid;
                 let resdetail=this.$route.query.resdetail;
                 this.$router.push({path:'/myCart',query:{shopid,myPoint,resdetail}})
              }else{
                 this.$router.go(-1);
              }
            
           }
	   },
     goback(){
        if(this.$route.query.myPoint){
            let myPoint=this.$route.query.myPoint;
            let shopid=this.$route.query.shopid;
            let resdetail=this.$route.query.resdetail;
            this.$router.push({path:'/myCart',query:{shopid,myPoint,resdetail}})
        }else{
           this.$router.go(-1);
        }
        
     }
	}

}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.login_page{
   position:absolute;
   top:0;
   left:0;
   @include wh(100%,100%);
   background:$white;
   header{
      @include wh(100%,3rem);
      .goback{
         padding:.8rem 0 0 .8rem;
      }
      span{
         position:absolute;
         top:.8rem;
         right:.8rem;
         @include fontstyle2(1.1rem,$green,100);
      }
   }
   p{
     @include wh(100%,9rem);
     @include fontstyle2(1.8rem,$black,400);
     line-height:9rem;
     padding-left:2rem;
   }
   .login_container{
     position:relative;
     height:18rem;
     line-height:1.2rem;
     margin:0 2rem;
     .tishi{
       @include fontstyle2(.8rem,$red,400);
     }
     .phone{
       position:relative;
       @include wh(100%,2.4rem);
       padding:.8rem 0;
       line-height:2.4rem;
       border-bottom:.02rem solid $grew4;
       span{
          @include fontstyle2(.8rem,$black,400);
          margin-right:.5rem;
       }
       input{
          border:none;
          @include wh(70%,2rem);
          @include fontstyle2(1.5rem,$black,500);
          outline:none;
       }
       .clean{
          @include wh(2rem,2rem);
          position:absolute;
          top:1.5rem;
          right:0;
       }
     }
     .name{
       position:relative;
       @include wh(100%,2.4rem);
       padding:.8rem 0;
       line-height:2.4rem;
       border-bottom:.02rem solid $grew4;
       input{
          border:none;
          @include wh(70%,2rem);
          @include fontstyle2(1.2rem,$black,500);
          outline:none;
       }
     }
     .password{
        position:relative;
        @include wh(100%,2.4rem);
        padding:.8rem 0;
        line-height:2.4rem;
        border-bottom:.02rem solid $grew4;
        input{
          border:none;
          @include wh(50%,2rem);
          @include fontstyle2(1.2rem,$black,500);
          outline:none;
        }
        img{
           float:right;
           padding:.5rem .2rem;
           @include wh(2rem,2rem);
        }
     }
     .yancode{
       position:relative;
       @include wh(100%,2.4rem);
       padding:.8rem 0;
       line-height:2.4rem;
       border-bottom:.02rem solid $grew4;
       input{
          border:none;
          @include wh(40%,2rem);
          @include fontstyle2(1rem,$black,500);
          outline:none;
       }
       button{
          float:right;
          @include wh(7rem,2rem);
          @include fontstyle2(.8rem,$green,500);
          background:$white;
          margin-top:.5rem;
          border:.05rem solid $green;
       }
       .yanImg{
          float:right;
          span{
              @include fontstyle2(.9rem,$grew1,500);
          }
       }
     }
     .nophone{
       @include fontstyle2(.8rem,$red,500);
     }
     .tip{
       padding:.3rem 0;
       @include fontstyle2(1rem,$grew2,500);
     } outline:none;
     .loginIn{
       position:relative;
       top:0;
       left:50%;
       @include wh(75%,3rem);
       transform:translateX(-50%);
       @include fontstyle2(1.2rem,$white,500);
       background:$green;
       margin-top:.5rem;
       border:none;
       border-radius:2rem;
     }
     .changemima{
       margin:1rem 0;
       @include fontstyle2(1rem,$grew1,500);
     }
   }
   footer{
      position:fixed;
      bottom:0;
      @include wh(100%,8rem);
      line-height:1rem;
      text-align:center;
      div{
        display:flex;
        span{
          flex:1;
          img{
            padding:.5rem;
            @include wh(3rem,3rem);
            border:.03rem solid $grew4;
            border-radius:50%;
          }
        }
      }
      p{ 
         padding:0;
         @include wh(100%,1rem);
         margin-top:.8rem;
         line-height:1rem;
         @include fontstyle2(.8rem,$grew2,400);
      }
   }
}
</style>