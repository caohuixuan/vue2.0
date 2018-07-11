<template>
<div>
<p>hello  {{name}} {{$attrs}}</p>
</div>
</template>
<script>
export default{
    name:'chuancanhello',
	props:{
	name:{
	  type:String,
	  default:'vue'
	}
	}
}
</script>