<template>
<div>
<h2>使用mapGetters</h2>
<ul>
<li v-for="list in lists">{{list.id}}++{{list.content}} </li>
</ul>
<p>个数是{{getLength}}</p>
</div>
</template>
<script>
import {mapGetters} from 'vuex'

export default{
   name:'getterthree',
   computed:{
     ...mapGetters([
        'showList',
        'getLength'
     ])
   }	
}
</script>