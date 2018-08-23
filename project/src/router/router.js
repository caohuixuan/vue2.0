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
const mine=r=>require.ensure([],()=>r(require('../page/mine/mine.vue')),'mine')
const userInfo=r=>require.ensure([],()=>r(require('../page/login/userInfo.vue')),'userInfo')
const addAddress=r=>require.ensure([],()=>r(require('../page/mine/addAddress.vue')),'addAddress')
const beizhu=r=>require.ensure([],()=>r(require('../page/myCart/beizhu.vue')),'beizhu')
const payPage=r=>require.ensure([],()=>r(require('../page/order/payPage.vue')),'payPage')
const order=r=>require.ensure([],()=>r(require('../page/order/order.vue')),'order')
const orderDetail=r=>require.ensure([],()=>r(require('../page/order/orderDetail.vue')),'orderDetail')
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
	  },
	  {
	  	path:'/mine',
	  	component:mine
	  },
	  {
	  	path:'/userInfo',
	  	component:userInfo
	  },
	  {
	  	path:'/addAddress',
	  	component:addAddress
	  },
	  {
	  	path:'/beizhu',
	  	component:beizhu
	  },
	  {
	  	path:'/payPage',
	  	component:payPage
	  },
	  {
	  	path:'/order',
	  	component:order
	  },
	  {
	  	path:'/orderDetail',
	  	component:orderDetail
	  },
	]
}]