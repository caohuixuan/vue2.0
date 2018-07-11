<template>
<section>
    <header class="top_tips">
    	<div class="num_object" v-if="fatherComponent == 'home'">
    	     <span class="object_name">调查对象</span>
    	     <img class="tip" src="../images/youzhengtip.jpg" />
    	     <span>{{level}}</span>
    	</div>
    	<div class="num_object" v-if="fatherComponent == 'home'">
    	     <span class="object_name">调查应用</span>
    	     <img class="tip" src="../images/youzhengtip.jpg" />
    	     <span>{{appName}}</span>
    	</div>
    	<div class="num_object" v-if="fatherComponent == 'home'">
    	     <span class="object_name">用户ID</span>
    	     <img class="tip" src="../images/youzhengtip.jpg" />
    	     <span>{{ID}}</span>
    	</div>
    	<div class="num_object" v-if="fatherComponent == 'home'">
    	     <span class="object_name">试点地点</span>
    	     <img class="tip" src="../images/youzhengtip.jpg" />
    	     <span>{{unitAddress}}</span>
    	</div>
    	<div class="num_tip" v-if="fatherComponent == 'item'">
    	<div class="item_title"> 
    	问题{{itemNum}}
        </div>
        <div class="item_line"></div>
    	</div>
    </header>
    <div class="startinto" v-if="fatherComponent=='home'">
        <div></div>
        <router-link class="start" to='item'>开始</router-link>
    </div>
    <div v-if="fatherComponent=='item'" class="item_area">
        <div class="item_container">
           <div v-if="itemDetail.length>0">
             <header class="item_name"><span>{{itemNum}}、</span>{{itemDetail[itemNum-1].item_name}}</header>
             <ul>
                <li class="item_list" v-for="(item,index) in itemDetail[itemNum-1].item_answers" @click="choosed(index,item.answer_id)">
                    <span class="item_logo" v-bind:class="{'has_choosed':choosedNum==index}">{{chooseType(index)}}</span>
                    <span class="item_c">{{item.answer_name}}</span>
                </li>
             </ul>
           </div>
        </div>
        <div class="next_area">
        <div class="next_item" @click="nextItem" v-if="itemNum<itemDetail.length">下一题</div>
        <div class="next_item" v-else @click="submitAnswer">提交</div>
        </div>
    </div>
</section>
</template>
<script>
import { mapState,mapActions } from 'vuex'
export default{
	name:'timucontainer',
    data(){
       return{
           choosedNum:null,//选中答案索引
           choosedId:null//答案ID
       }
    },
    props:['fatherComponent'],
    computed: mapState([
	  	'itemNum', //第几题
  		'level', //调查对象
  		'appName',//APP名称
  		'ID',//用户ID
  		'unitAddress',//试点地点
  		'itemDetail'//题目
	]),
	methods:{
	    ...mapActions([
            'addNum'
	    ]),
	    choosed(index,answer_id){
	        //console.log(index+"=="+answer_id);
	        this.choosedNum=index;
	        this.choosedId=answer_id;
	    },
	    chooseType:index=>{
	        switch(index){
	            case 0:return 'A';
	            case 1:return 'B';
	            case 2:return 'C';
	            case 3:return 'D';
	        }
	    },
	    nextItem(){
	        if(this.choosedNum!==null){
	           this.choosedNum=null;
	           this.addNum(this.choosedId)
	        }else{
	           alert('您还没有选择哦！');
	        }
	    },
	    submitAnswer(){
	        if(this.choosedNum!==null){
	           this.addNum(this.choosedId);
               this.$router.push('score');//改变路由
	        }else{
               alert('您还没有选择哦！');
	        }
	    }
	}
}
</script>
<style lang="less" scoped>
    .num_object{
      position:relative;
      margin:4rem 0;
      width:100%;
      height:5rem;
      font-size:1.5rem;
      line-height:5rem;
    }
    .object_name{
       text-align:right;
    }
    .num_object>span{
      position:relative;
      width:40%;
      top:-2rem;
      display:inline-block;
      font-family: PingFangSC-Medium;
      font-size: 1.5rem;
      color: #263238;
      font-weight:normal;
    }
    .tip{
      position:relative;
      width:20%;
      width:5rem;
      height:5rem;
    }
    .startinto{
       width:100%;
       text-align:center;
       text-align:-webkit-center;
    }
    .start{
      display:block;
      height:6.3rem;
      width:13rem;
      border-radius:1rem;
      background: url(../images/button.png) no-repeat center center fixed;
      color:#FFFFFF;
      font-size:3rem;
      line-height:6.3rem; 
      text-decoration:none;
    }
    .item_title{
       width:100%;
       height:5rem;
       background-color:#0F7C4B;
       text-align: center;
       box-shadow: 0 0 4px 0 rgba(0,0,0,0.12);
       color:#FFFFFF;
       line-height:5rem;
       font-size:2rem;
    }
    .item_line{
      width:100%;
      height:0.3rem;
      background: #F8CA1C;
      box-shadow: 0 0 4px 0 rgba(0,0,0,0.12);
    }
    .item_area{
      margin-top:6rem;
      width:100%;
      text-align:center;
      text-align:-webkit-center;
    }
    .item_container{
       width:70%;
       text-align:left;
    }
    .item_name{
       font-size:2rem;
       margin-bottom:3rem;
    }
    .item_list{
       list-style-type:none;
       font-size:1.5rem;
       margin:1.2rem 1.2rem 1.2rem 0;
    }
    .item_logo{
       display:inline-block;
       height:2rem;
       width:2rem;
       line-height:2rem;
       text-align:center;
       text-align:-webkit-center;
    }
    .has_choosed{
       display:inline-block;
       height:2rem;
       width:2rem;
       line-height:2rem;
       text-align:center;
       text-align:-webkit-center;
       border-radius:50%;
       background-color:#0F7C4B;
       color:#FFFFFF;
    }
    .item_c{
       margin-left:0.8rem;
    }
    .next_area{
       width:80%;
       text-align:right;
       text-align:-webkit-right;
    }
    .next_item{
       display:block;
       height:4rem;
       width:10rem;
       border-radius:1rem;
       background: url(../images/button.png) no-repeat  center center fixed;
       color:#FFFFFF;
       text-align:center;
       text-align:-webkit-center;
       font-size:2rem;
       line-height:4rem; 
       text-decoration:none;
    }
</style>