<template>
<div>
<p>{{page.title}}</p>
<p>{{page.body}}</p>

</div>
</template>
<script>
export default{
	name:"beforeone",
	props:{
	page:Object
	}
}
</script>