<template>
<div>
<h3>{{page.title}}</h3><p>{{page.body}}</p>
</div>
</template>
<script>
export default{
	name:"before",
	props:{page:Object}
}
</script>