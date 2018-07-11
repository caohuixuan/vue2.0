<template>
<div id="tablist">
<span class="count">{{getLists.length}}个查询结果</span>

<ul id="liTabs">
<p></p>
 <li v-for="(list,index,key) of getLists" v-on:click="clickon(index)">   
  <div>         
    <div class="listTitle">
     <span></span>
     <span class="listName">{{list.name}}</span>
     <span class="gothere" v-on:click="gotothere(list)">到这去</span>
    </div>
    <div class="listContent">
    <div><span>地址：</span><span>{{list.address}}</span></div>
    <div><span>电话：</span><span>{{list.phone}}</span></div>
    <div><span>营业时间：</span><span></span></div>
    </div>
  </div>
 </li>  
</ul>
</div>
</template>
<script>
export default{
   name:'ListsTabs',
   props:['Lists','clickNum'],
   data(){
   return{   
   }
   },
   computed:{
      getLists:function(){return this.Lists;},
      clickN:function(){return this.clickNum;},
      myPort:function(){return this.centerport;},
      map:function(){return this.myMap;}
   },
   mounted(){
      var windowHeight=document.documentElement.clientHeight;
      var topHeight=document.getElementById("tablist").offsetTop;
      var divHeight=windowHeight-topHeight;
      document.getElementById("tablist").setAttribute('style', 'height:'+divHeight+'px !important');
       this.$watch('clickN', function (newValue, oldValue) {

      var mainContainer = $('#liTabs');
       var scrollToContainer = $("#liTabs").find("li").eq(newValue);
      /* console.log("li--"+scrollToContainer.offset().top);
       console.log("ul--"+mainContainer.offset().top);
       console.log("da--"+mainContainer.scrollTop());
       console.log("d--"+(scrollToContainer.offset().top-mainContainer.offset().top));
      */
$('#liTabs').animate({
scrollTop:scrollToContainer.offset().top-mainContainer.offset().top+mainContainer.scrollTop()-20
},1000);
      })
   },
 
   methods:{
      gotothere(list){  
         this.$emit("transferPlans",list);
      },
      clickon(index){
      // this.$emit("showListPop",index);
       //  console.log(index);
      }
   }
}
</script>
<style lang="less" scoped>
#tablist{
   display:relative;
   width:100%;
   .count{
      position:fixed;
      height:20px;
      width:100%;
      background:#f2f2f2;
      z-index:10;
   }
   p{

   }
   ul{
    position:relative;
    margin:0;
    overflow:auto;
    padding:0;
	width:100%;
	height:100%;
	background-color:#f2f2f2;
	li{
	   position:relative;
	   margin:10px 5px;
	   padding:5px 5px;
	   list-style-type:none;
	   background-color:#FFF;
       border-radius: 5px;
       box-shadow:0 0 px #ccc;
       .listTitle{
           text-overflow:ellipsis;
           white-space:nowrap; 
           overflow:hidden;
           font-family: PingFangSC-Medium;
           font-size: 18px;
           color: #333333;
           letter-spacing: 0;
           width:70%;
           .gothere{
           position:absolute;
           right:0;
           text-align:center;
           font-family: PingFangSC-Regular;
           font-size: 12px;
           color: #0A7CBA;
           letter-spacing: 0;
           line-height: 24px;
           width:30%;
       }  
       }
       .listContent{
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #333333;
          letter-spacing: 0;
       }
       
	}
}
}
</style>