<template>
<div>
<h1>命名视图</h1>
  <router-view></router-view>
  </div>
</template>
<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Levelone from './levelone.vue'
import Levelthree from './levelthree.vue'
import Levelfour from './levelfour.vue'
import Levelfive from './levelfive.vue'
import Home from './home.vue'
Vue.use(VueRouter);
const router=new VueRouter({
	mode:'hash',
	base:__dirname,
	routes:[
       {
           path:'/settings',
           component:Levelone,
           children:[
           {
              path:'emails',
              component:Levelthree
           },
           {
              path:'profile',
              components:{
                  default:Levelfour,
                  helper:Levelfive
              },
              meta:{requiresAuth:true}
           },
           {
              path:'/',
              component:Home
           }
           ]
       }
	]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (true) {
      next({
        path: '/settings/',
        redirect: to.fullPath+"/"
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
router.push('/settings/emails')
export default{
	name:'mingming',
	router,
	components:{
	  Levelone,
	  Levelthree,
	  Levelfour,
	  Levelfive
	}
}
</script>