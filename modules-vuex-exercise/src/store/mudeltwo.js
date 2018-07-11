export default{
	state:{
		show:"这是子module-two的show"
	},
	actions:{
		alerttwo({ state, commit, rootState }){
			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					console.log("rootState:count=="+rootState.count);
				    commit('mulalert')
					resolve()
				},3000)
			})

		}
	}
}