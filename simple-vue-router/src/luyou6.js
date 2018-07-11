import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './vue/home.vue'
Vue.use(VueRouter)
const Budong={template:'<div>没有任何跳转，只是展示</div>'};
const Kuo={
  template:`
     <div>
        这是顶部信息
       <div style="height:600px"></div>
       <p id="anthor">这是底部信息</p>
     </div>
      `
}
const scrollBehavior=(to,from,savedPosition)=>{
  if(savedPosition){
    return savedPosition
  }else{
    const position={};
    if(to.hash){
      position.selector=to.hash
    }
    if(to.matched.some(m=>m.meta.scrollToTop)){
      position.x=0;
      position.y=0;
    }
    return position
  }
}
const router=new VueRouter({
    mode:'history',
    base:__dirname,
    scrollBehavior,
    routes:[
       {path:'/gundongone',component:Home,meta:{scrollToTop:true}},
       {path:'/gundongtwo',component:Budong},
       {path:'/gundongthree',component:Kuo,meta:{scrollToTop:true}},
    ]
})

new Vue({
   router,
   template:`
     <div>
        <h1>滚动行为</h1>
        <ul>
          <li><router-link to="/gundongone">/gundongone</router-link></li>
          <li><router-link to='/gundongtwo'>/gundongtwo</router-link></li>
          <li><router-link to='/gundongthree'>/gundongthree</router-link></li>
          <li><router-link to="/gundongthree#anthor">/gundongthree#anthor</router-link></li>
        </ul>
        <router-view></router-view>
     </div>
   `
}).$mount('#six')