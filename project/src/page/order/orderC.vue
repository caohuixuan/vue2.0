<template>
     <div class="list_card">
          <section v-if="!food.specifications.length" class="btn">
               <transition name="showReduce">
                     <span class="btn_">
                        <svg style="fill:#7A8185;width:1.2rem;height:1.2rem;">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                        </svg>
                     </span>
               </transition>
               <transition name="fade">
                     <span class="foodnum">{{foodNum}}</span>
               </transition>
               <span class="btn_">
               <svg class="add_icon" style="fill:#FFCC54;width:1.2rem;height:1.2rem;">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
               </svg>
               </span>
          </section>
     </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
export default{
	name:'orderC',
	props:['food','shopid'],
	mounted(){
	    console.log(this.food);
	},
	computed:{
	    ...mapState(['myCard']),
	    shopCart:function(){
	        return Object.assign({},this.myCard[this.shopid]);
	    },
	    foodNum:function(){
	        return 3;
	    }
	},
}
</script>
<style lang='scss' scoped>
@import '../../style/mixin.scss';
.list_card{
}
.foodnum{
	margin-top:-0.5rem;
}
</style>