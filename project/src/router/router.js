import App from '../App.vue'
const home=r=>require.ensure([],()=>r(require('../page/home/home.vue')),'home')
const signin = r => require.ensure([], () => r(require('../page/signin/signin.vue')), 'signin')
const login = r => require.ensure([], () => r(require('../page/login/login.vue')), 'login')
const city=r=>require.ensure([],()=>r(require('../page/city/city.vue')),'city')
const mHome=r=>require.ensure([],()=>r(require('../page/mHome/mHome.vue')),'mHome')
const searchT=r=>require.ensure([],()=>r(require('../page/searchT/searchT.vue')),'searchT')
const lists=r=>require.ensure([],()=>r(require('../page/lists/listsContainer.vue')),'lists')
const myCart=r=>require.ensure([],()=>r(require('../page/myCart/myCart.vue')),'myCart')
const foodDetail=r=>require.ensure([],()=>r(require('../page/food/foodDetail.vue')),'foodDetail')

export default [{
	path:'/',
	component:App,
	children:[
	  {
	  	path:'',
	  	redirect:'/home'
	  },
	  {
	  	path:'/home',
	  	component:home
	  },
	  {
	  	path:'/city/:cityid',
	  	component:city
	  },
	  {
	  	path:'/signin',
	  	component:signin
	  },
	  {
	  	path:'/login',
	  	component:login
	  },
	  {
	  	path:'/mHome',
	  	component:mHome
	  },
	  {
	  	path:'/searchT',
	  	component:searchT
	  },
	  {
	  	path:'/lists',
	  	component:lists
	  },
	  {
	  	path:'/myCart',
	  	component:myCart
	  },
	  {
	  	path:'/food',
	  	component:foodDetail
	  }
	]
}]