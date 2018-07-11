<template>
<div class="score_container">
    <div class="score_title">
       意见或建议
    </div>
    <div class="score_line"></div>
    <div class="score_name">意见详情：</div>
    <div class="score_flag"><img class="tip" src="../../images/suggestion.png" /><span>您的意见是我们努力的方向</span></div>
    <div class="text_area">
      <textarea class="text" v-model="text_massage" @input="insert()">{{text_massage}}</textarea>
    </div>
    <div>
       <div class="person_message">个人信息：</div>
       <div class="person_mes">
           <span class="phone">手机号</span>
           <input type="text" class="xinxi_message" v-model="phone1" @input="insertphone()">
       </div>
       <div class="person_mes">
           <span class="qq">QQ</span>
           <input type="text" class="xinxi_message" v-model="qq1" @input="insertqq()">
       </div>
    </div>
    <div class="over">
       <div class="overss" @click="overthis">结束</div>
    </div>
    
</div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
	name: 'score',
	data(){
	   return{
	      text_massage:'请将意见或建议在此处进行详细描述，以便我们做出进一步改进',
	      phone1:"手机号",
	      qq1:"qq号"
	   }
	},
	computed: mapState({
	   phone(state) {
           return state.phone
       }
	}),
	methods:{
	   ...mapActions([
            'addText','addPhone','addQq'
	    ]),
	   insert(){
	       this.addText(this.text_massage)
	      // console.log(this.text_massage);
	   },
	   insertphone(){
           this.addPhone(this.phone1);
	   },
	   insertqq(){
	       this.addQq(this.qq1);
	   },
	   overthis(){
	       console.log("over");
	       this.$router.push('over');//改变路由
	   }
	}

}

</script>

<style lang="less">
    .score_container{
        width:100%;
    }
    .score_title{
       width:100%;
       height:5rem;
       background-color:#0F7C4B;
       text-align: center;
       box-shadow: 0 0 4px 0 rgba(0,0,0,0.12);
       color:#FFFFFF;
       line-height:5rem;
       font-size:2rem;
    }
    .score_line{
      width:100%;
      height:0.3rem;
      background: #F8CA1C;
      box-shadow: 0 0 4px 0 rgba(0,0,0,0.12);
    }
    .score_name{
      height:2rem;
      width:100%;
      padding:1.8rem 0 1.8rem 2.2rem;
      font-family: PingFangSC-Medium;
      font-size: 1.8rem;
      color: #263238;
      font-weight:normal;
    }  
    .score_flag{
       height:1.2rem;
       width:100%;
       padding:1.8rem 0 1.8rem 2.2rem;
       background-color:#eee;
    }
    .score_flag>img{
       display:inline-block;
       height:inherit;
    }
    .score_flag>span{
       display:inline-block;
       height:2rem;
       font-family: PingFangSC-Medium;
       font-size: 1.4rem;
       margin-left:1rem;
       color: #263238;
       font-weight:normal;
       line-height:2rem;
       
    }
    .text_area{
       width:100%;
       text-align:center;
       text-align:-webkit-center;
    }
    .text{
       width:96%;
       height:30rem;
    }
    .person_message{
       padding:1rem;
       font-family: PingFangSC-Medium;
       font-size: 1.5rem;
       color: #263238;
       font-weight:normal;
       width:100%;
       border-top:0.3rem solid #eee;
    }
    .person_mes{
       padding:0.6rem 0.6rem 0.6rem 1rem;
       font-family: PingFangSC-Medium;
       font-size: 1.5rem;
       color: #a2a2a2;
       font-weight:normal;
       width:100%;
       border-top:0.1rem solid #eee;
    }
    .xinxi_message{
       margin-right:1.5rem;
       float:right;
       border:none;
    }
    .over{
        position:fixed;
        bottom:0;
        width:100%;
        text-align:center;
        text-align:-webkit-center;
    }
    .overss{
       height:6rem;
       width:14rem;
       margin-bottom:3rem;
       border-radius:1rem;
       background-color:#0F7C4B; 
       text-align:center;
       text-align:-webkit-center;
       font-size:2.5rem;
       line-height:6rem; 
       color:#FFFFFF;
       text-decoration:none;
    }
</style>
