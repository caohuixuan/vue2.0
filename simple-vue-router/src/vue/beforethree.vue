<template>
<div>
<p>{{page.title}}</p>
<p>{{page.body}}</p>

</div>
</template>
<script>
export default{
	name:"beforethree",
	props:{
	page:Object
	}
}
</script>