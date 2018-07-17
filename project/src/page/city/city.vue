<template>
<div class="search_address">
    <header-one goback="true" changecity="true">
        <div slot="city_name" class="city_name">{{cityName}}</div>
        <router-link to="/home" slot="change_city" class="change_city">
           切换城市
        </router-link>
    </header-one>
    <form class="search_form" @submit.prevent="searchpois">
        <div>
            <input type="text" class="search_text" placeholder="输入详细地址" v-model="inputValue" @input="textNone()">
        </div>
        <div>
            <input type="submit" name="submit" class="search_submit" value="搜索">
        </div>
        <div></div>
    </form>
    <div class="history" v-if="search_history">
        <div class="history_title">搜索历史</div>
        <ul>
          <li class="search_list" v-for="his in search_history_lists" @click="gotoNext(his)">
              <div class="search_name">{{his.name}}</div>
              <div class="search_address">{{his.address}}</div>
          </li>
        </ul>
        <div class="qingkong" v-if="history_tip" @click="qingkong">清空历史记录</div>
    </div>
    <div class="search_L" v-if="search_ists">
        <ul>
          <li class="search_list" v-for="(list,index) in searchList" @click="clickList(index,list)">
              <div class="search_name">{{list.name}}</div>
              <div class="search_address">{{list.address}}</div>
          </li>
        </ul>
    </div>
    <div>
        <div class="search_none" v-if='searchNone'>查询无结果</div>
    </div>
</div>
</template>

<script>
import headerOne from '../../components/header/headerOne.vue'
import {mapState,mapMutations} from 'vuex'
import {currentcity,searchAddress} from '../../service/getData.js'
import {setStorage,getStorage,removeStorage} from '../../config/localStorage.js'
export default{
	name:'city',
	components:{
	  headerOne
	},
	data(){
	  return{
	     cityName:'',//当前城市名字
	     cityId:'',//当前城市ID
	     inputValue:'',//搜索框的搜索内容
	     searchNone:false,//搜索无结果
	     searchList:[],//搜索列表
	     search_history:true,//搜索历史
       search_ists:false,//搜索结果列表
       search_history_lists:[],//历史列表
       history_tip:false,//是否显示清空记录
	  }
	},
	computed:{
	  ...mapState([
          'searchHistoryLists'
	  ])
	},
	methods:{
	  ...mapMutations([
	      'searchHistory','setCity'
	  ]),
	   searchpois(){
	   var vm=this;
	     // console.log(this.inputValue);
          var searchService = new qq.maps.SearchService({
             complete : function(results){
                 vm.search_ists=true;
                 vm.searchList=[];
                 vm.search_history=false;
                 var pois=results.detail.pois;
                 for(let i=0;i<pois.length;i++){
                    vm.searchList.push(pois[i]);
                 }
                 vm.searchNone=false;
             },
             error: function() {
                 vm.search_history=false;
                 vm.searchList=[];
                 vm.searchNone=true;
             }
        });
         searchService.setLocation(this.cityName);
         searchService.search(this.inputValue);
	   },
     showHistory(){
         var storage=getStorage('historysearch');
         //console.log(JSON.parse(storage));
         this.search_history_lists=JSON.parse(storage);
         this.history_tip=true;
     },
	   clickList(index,list){
         //使用state记录历史
	       //this.searchHistory(this.searchList[index]);
         setStorage('historysearch',this.searchList[index]);
         this.gotoNext(list);
	   },
	   textNone(){
	       //console.log(this.inputValue);
	       if(this.inputValue==""){
	           this.search_ists=false;
	           this.search_history=true;
	           this.searchNone=false;
	          // console.log("aa");
	       }
         this.showHistory();
	   },
     gotoNext(point){
         this.$router.push({path:'/mHome',query:{point}})
     },
     qingkong(){
        //console.log("a");
        removeStorage('historysearch');
        this.showHistory();
        this.history_tip=false;
     }
	},
	mounted(){
	    this.cityId=this.$route.params.cityid;
	    currentcity(this.cityId).then(res=>{
	       this.cityName=res.name;
         this.setCity(this.cityName);
	    })
      
      this.showHistory();

	}
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';

.city_name{
    @include juzhong();
	@include fontstyle2(1.4rem,$white,normal);
}
.change_city{
   position:absolute;
	right:0.8rem;
	top:50%;
	transform: translateY(-50%);
	@include fontstyle2(1rem,$white,normal);
    text-decoration:none;
}
.search_form{
	position:relative;
	top:3.5rem;
	@include wh(100%,6rem);
	background-color:$white;
	border:0.06rem solid $grew4;
	div{
	   @include wh(100%,3rem);
	   .search_text{
	      @include wh(80%,1.5rem);
	      border:0.1rem solid $grew4;
	      margin-left:10%;
	      margin-top:0.75rem;
	      outline:none;
     	}
     	.search_submit{
     	  @include wh(81%,1.5rem);
     	  border:none;
	      margin-left:10%;
	      margin-top:0.75rem;
	      outline:none;
	      background-color:$green;
	      @include fontstyle2(0.9rem,$white,normal);
	      letter-spacing:1rem;
     	}
	}
	
}
.search_none{
    position:relative;
    top:5rem;
    padding-left:0.8rem;
}
.search_L{
	position:relative;
    top:4rem;
    ul{
       margin:0;
       padding:0;
       border-top:0.1rem solid $grew4;
       .search_list{
          list-style-type:none;
          background-color:$white;
          @include wh(100%,4.5rem);
          border-bottom:0.08rem solid $grew4;
       .search_name{
           @include wh(90%,2.5rem);
           padding-left:1rem;
           padding-right:1rem;
           line-height:2.5rem;
       }
       .search_address{
           @include wh(90%,2.5rem);
           @include fontstyle2(0.8rem,$grew1,normal);
           padding-left:1rem;
           padding-right:1rem;
       }
       }
    }
}
.history{
    position:relative;
    top:3.5rem;
    .history_title{
        padding:0.5rem 0 0.5rem 0.8rem;
        @include fontstyle2(0.8rem,$grew1,normal);
    }
    ul{
       margin:0;
       padding:0;
       border-top:0.1rem solid $grew4;
       .search_list{
          list-style-type:none;
          background-color:$white;
          @include wh(100%,4.5rem);
          border-bottom:0.08rem solid $grew4;
       .search_name{
           @include wh(90%,2.5rem);
           padding-left:1rem;
           padding-right:1rem;
           line-height:2.5rem;
       }
       .search_address{
           @include wh(90%,2.5rem);
           @include fontstyle2(0.8rem,$grew1,normal);
           padding-left:1rem;
           padding-right:1rem;
       }
       }
    }
    .qingkong{
        margin-top:0.5rem;
        @include wh(100%,2rem);
        background-color:$white;   
        @include fontstyle2(1rem,$grew1,normal);
        line-height:2rem;
        text-align:center;
    }
}
</style>