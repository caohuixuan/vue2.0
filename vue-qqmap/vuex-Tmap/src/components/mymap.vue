<template>
<div>
<div class="searchInfo">
<input type="text" :value="message">
</div>
<div id="mapArea"></div>
</div>
</template>
<script>
import {TMap} from '../js/TMap.js';
export default{
	name:'shujuceshi',
  computed:{ 
    message(){
        return this.$store.state.myAddress;
    }
  },
	methods:{
      qqSet(qq){
           this.$store.commit('qqSet',qq);
      },
      updatePosition(post){
           this.$store.commit('updatePosition',post);
      },
      setGeocoder(geocoder){
           this.$store.commit('setGeocoder',geocoder);
      },
      updateAddress(add){
           this.$store.commit('updateAddress',add);
      },
      makeMymap(){
           this.$store.dispatch('makeMymap');
      }
      
	},
    mounted(){
    var map;
    var myMarker;
    var circle;
    var infoWin;
    var vm=this;
     TMap('WQCBZ-4FF3F-WI4JL-NJGAX-MECTJ-GMFWA').then(qq=>{  
        //设置qq全局对象
        vm.qqSet(qq);
         var lat=39.88548965156982;
         var lng=116.38127501423922;
         vm.updatePosition(new qq.maps.LatLng(lat,lng));
               vm.updateAddress("北京市西城区永安路173号");
            //创建地图 
               vm.makeMymap();
            //初始化winInfo
             //   vm.infowinSet();
            //搜索周边
             //   vm.searchPoints(); 

          })
        
  }
}
</script>
<style lang="less" scoped>
#mapArea{
  width:100%;
  height:300px;
}
</style>