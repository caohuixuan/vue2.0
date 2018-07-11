import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Simpleone from './vue/simple1.vue'
import Getterone from './vue/getterone.vue'
import Gettertwo from './vue/gettertwo.vue'
import Getterthree from './vue/getterthree.vue'
import Mutationone from './vue/mutation.vue'
import Mutationtwo from './vue/mutation1.vue'
import Actionone from './vue/actionone.vue'
import Actiontwo from './vue/actiontwo.vue'
/*import Actionthree from './vue/actionthree.vue'*/
import './js/simple1.js'
Vue.use(Vuex)
const store=new Vuex.Store({
	state:{
		count:0,
		lists:[
            {id:1,content:"aaa",show:true},
            {id:2,content:"bbb",show:false},
            {id:3,content:"ccc",show:false},
            {id:4,content:"ddd",show:true}
		]
	},
	mutations:{
		jiajia:state=>state.count++,
		jianjian:state=>state.count--,
        jiashi:(state,rew)=>{
            return state.count+=rew.a
        },
        alerttext:(state,m)=>{
            console.log("count值"+state.count+",信息："+m.message)
        },
        alertone:(state)=>{
            console.log("这是alertone");
        },
        alerttwo:(state)=>{
            console.log("这是alerttwo");
        }/*,
        alertthree:(state)=>{
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                   console.log("这是alertthree");
                    resolve()
                },1000)
            })    
        },
        alertfour:(state)=>{
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                   console.log("这是alertfour");
                    resolve()
                },1000)
            })    
        }*/
	},
    getters:{
    	showList:state=>{
    		return state.lists.filter(list=>list.show)
    	},
        //注意参数
    	getLength:(state,getters)=>{
            return getters.showList.length
    	},
    	//通过方法
    	getId:(state)=>(id)=>{
    		return state.lists.find(list=>list.id===id)
    	}
    },
    actions:{
        threemin:(context,m)=>{
            setTimeout(()=>{
                 context.commit('alerttext',m)
            },3000)
              
        },
        actone:(context)=>{
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    context.commit('alertone')
                    resolve()
                },1000)
            })    
        },
        acttwo:(context)=>{
            return store.dispatch('actone').then(()=>{
                context.commit('alerttwo')
            })
        }/*,
        async actthree(context){
            context.commit('alertthree',await alertthree())
        },
        async actfour(context){
            await dispatch('actthree')
            commit('alertfour',await alertfour())
        }*/
    }
})
new Vue({
	template:`
      <div>
        <h1>简单的state应用</h1>
        <Simpleone />
        <hr />
        <h1>getters</h1>
        <Getterone></Getterone>
        <Gettertwo></Gettertwo>
        <Getterthree></Getterthree>
        <hr /> 
         <Mutationone></Mutationone>
        <Mutationtwo></Mutationtwo>
        <hr />
        <Actionone></Actionone>
        <Actiontwo></Actiontwo>

      </div>
	`,
	components:{
		Simpleone,
		Getterone,
        Gettertwo,
        Getterthree,
        Mutationone,
        Mutationtwo,
        Actionone,
        Actiontwo,
       /* Actionthree*/
	},
    store
}).$mount('#app')