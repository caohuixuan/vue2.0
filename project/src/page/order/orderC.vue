<template>
     <div class="list_card">
          <section v-if="!food.specifications.length" class="btn">
               <transition name="showReduce">
                     <span class="btn_" v-if="foodNum" @click="minusCart(food.category_id, food.item_id, food.specfoods[0].food_id)">
                        <svg style="fill:#7A8185;width:1rem;height:1rem;">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                        </svg>
                     </span>
               </transition>
               <transition name="fade">
                     <span class="foodnum" v-if="foodNum">{{foodNum}}</span>
               </transition>
               <span class="btn_" @click="addCart(food.category_id,food.item_id,food.specfoods[0].food_id,food.specfoods[0].name,food.specfoods[0].price,'',food.specfoods[0].packing_fee,food.specfoods[0].sku_id,food.specfoods[0].stock,$event)">
               <svg class="add_icon" style="fill:#FFCC54;width:1rem;height:1rem;">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
               </svg>
               </span>
          </section>
          <section v-else class="chooseType">
               <div class=" ">
                    <transition name="showReduce">
                     <span class="" v-if="foodNum" @click="minusChooseType">
                        <svg style="fill:#7A8185;width:1rem;height:1rem;">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                        </svg>
                     </span>
                    </transition>
                    <transition name="fade">
                     <span class="foodnum" v-if="foodNum">{{foodNum}}</span>
                    </transition>
                    <span class="choose_type_name" @click="showChooseType(food)">选规格</span>
               </div>
          </section>
     </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
export default{
	name:'orderC',
	props:['food','shopid'],
	mounted(){
	    //console.log(this.food);
	},
	computed:{
	    ...mapState(['myCard']),
	    shopCart:function(){
	        return Object.assign({},this.myCard[this.shopid]);
	    },
	    foodNum:function(){
	        //return 3;
          let category_id = this.food.category_id;
          let item_id = this.food.item_id;
          let food_id= this.food.specfoods[0].food_id;
          if(this.shopCart&&this.shopCart[category_id]&&this.shopCart[category_id][item_id]&&this.shopCart[category_id][item_id][food_id]){
              let num=0;
              Object.values(this.shopCart[category_id][item_id]).forEach((item,index)=>{
                 num=num+item.num;
              })
              return num;
          }else{
              return 0;
          }
	    },
      
	},
  methods:{
      ...mapMutations([
          'ADDCART','MINUSCART'
      ]),
      addCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock, event){
          //console.log("加入购物车");
          this.ADDCART({shopid:this.shopid,category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock});
          let toLeft=event.target.getBoundingClientRect().left;
          let toBottom=event.target.getBoundingClientRect().bottom;
          //console.log(toLeft);
          //console.log(toBottom);

      },
      minusCart(category_id, item_id, food_id){
          if(this.foodNum){
              this.MINUSCART({shopid:this.shopid,category_id, item_id, food_id})
          }
      },
      showChooseType(food){
          this.$emit('showChooseType',food);
      },
      minusChooseType(){
          this.$emit('minusChooseType');
      }
  }
}
</script>
<style lang='scss' scoped> 
@import '../../style/mixin.scss';
.list_card{
   .btn{
       margin-right:0.3rem;
   }
}
.foodnum{
	margin-top:-0.5rem;
}
.chooseType{
  @include wh(100%,100%);
  .choose_type_name{
        display:inline-block;
        line-height:1.6rem;
        @include wh(3.2rem,1.6rem);
        background-color:$orange1;
        border-radius:0.5rem;
        @include fontstyle2(0.85rem,$black,600);
  }
}
.showReduce-enter-active, .showReduce-leave-active {
        transition: all .3s ease-out;
    }
.showReduce-enter, .showReduce-leave-active {
        opacity: 0;
        transform: translateX(1rem);
    }
.fade-enter-active, .fade-leave-active {
        transition: all .3s;
    }
.fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>