export default{
	rember_answer(state,id){
         state.answerid.push(id);
       //  console.log(state.answerid);
	},
	add_itemnum(state,num){
		 state.itemNum+=num;
	},
	rember_text(state,text){
		 state.answerText=text;
		// console.log(state.answerText);
	},
	rember_phone(state,phone){
		 state.phone=phone;
		// console.log(state.phone);
	},
	rember_qq(state,qq){
		state.qq=qq;
	//	console.log(state.qq);
	}
}