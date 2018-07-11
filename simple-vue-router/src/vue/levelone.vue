<template>
<div>
<h2>levelone层</h2>
<Leveltwo/>
<router-view/>
<router-view name="helper"/>
</div>
</template>
<script>

import Leveltwo from './leveltwo.vue'
export default{
    name:'levelone',
    components:{
      Leveltwo
    }
}
 
</script>