<template>
<div>
<h2></h2>
<button @click="show">显示子modules-one的show</button>
<button @click="showroot">显示根store的show</button>
<button @click="twoact">显示子modules-two的action</button>
</div>
</template>
<script>
export default{
	name:'one',
    methods:{
      show(){
         console.log(this.$store.state.one.show);
      },
      showroot(){
       console.log(this.$store.getters.showrootmsg)
      },
      twoact(){
       this.$store.dispatch('alerttwo')
      }
    }
}
</script>