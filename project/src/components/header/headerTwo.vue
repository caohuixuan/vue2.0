<template>
    <div class="head_two">
        <slot name="cityname"></slot>
        <slot name="searchRestaurant"></slot>
        <slot name="searchIcon"></slot>
    </div>
</template>
<script>
export default{
	name:'headertwo',
}
</script>
<script lang="scss" scoped>
@import '../../style/mixin.scss';
.head_two{
	 background-color:$white;
	 position:fixed;
	 z-index:100;
	 left:0;
	 top:0;
	 @include wh(100%,2.5rem);
}
</script>