export default{
	state:{
		show:'这是子module-one的show'
	},
	getters:{
		showrootmsg(state,getters,rootState){
			return rootState.show
		}
	}
}