export default{
	searchHistory(state,list){
		state.searchHistoryLists.push(list);
		//console.log(state.searchHistoryLists);
	},
	setCity(state,city){
		state.myCity=city;
		//console.log(state.myCity);
	},
	setPoint(state,point){
		state.myPoint=point;
        //console.log(state.myPoint);
	}
}