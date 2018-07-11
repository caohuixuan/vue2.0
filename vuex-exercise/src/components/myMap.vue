 <template>
 <div>
<div id="mapArea">
</div>
<button @click="focus">annu</button>
</div>
</template>
<script>
import {TMap} from '../js/TMap.js';
export default{
	name:'formtext',
	computed:{ 
	  message(){
	     return this.$store.state.count
	  },
	},
	methods:{
    focus(){
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
    },
	  updatePosition(pos){
	      this.$store.commit('updatePosition',pos);
	  },
    qqSet(qq){
        this.$store.commit('qqSet',qq);
    },
    updateAddress(address){
        this.$store.commit('updateAddress',address);
    },
    makeMymap(){
         this.$store.dispatch('makeMymap');
    }
	},
	mounted(){
	}
}
</script>
<style lang="less" scoped>
#mapArea{
  width:100%;
  height:300px;
}
</style>