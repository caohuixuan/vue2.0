<template>
<div class="rating_container">
   <section class="star_container">
       <svg class="grey_fill"v-for="num in 5" :key="num">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
       </svg>
   </section>
    <div :style="'width:' + rating*3/5 + 'rem'" class="star_overflow">
        <section class="star_container" >
            <svg  class="orange_fill" v-for="num in 5" :key="num">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
            </svg>
        </section>
    </div>
</div>
</template>
<script>
export default{
	name:'ratingStart',
	props:['rating'],
	mounted(){
	    console.log(this.rating);
	}
}
</script>
<style lang='scss' scoped>
 @import '../../style/mixin.scss';
	.rating_container{
        position: relative;
        top: .2rem;
        left:.8rem;
        @include wh(6rem, 1rem);
        .star_overflow{
            overflow: hidden;
            position: relative;
            height: 100%;
        }
        .star_container{
            position: absolute;
            display: flex;
            width: 3rem;
            height: .6rem;
            .grey_fill{
                fill: #d1d1d1;
            }
            .orange_fill{
                fill: #ff9a0d;
            }
        }
    }
</style>