import Vue from 'vue'
import Router from 'vue-router'
import searchOutlet from '@/components/searchOutlet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'searchOutlet',
      component: searchOutlet
    }
  ]
})
