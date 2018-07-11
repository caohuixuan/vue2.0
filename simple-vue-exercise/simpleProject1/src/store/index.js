import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)
let state={
	itemNum:1,//第几题
	level:'散户使用者',//题目等级
	appName:'我的APP',//APP名称
	ID:'12345678901',//用户ID
	unitAddress:'江苏',//试点地点
      phone:'',
      qq:'',
	itemDetail:[
      {
      	"item_name":'题目一',
      	"item_answers":[{
      		"answer_name":"答案a",
      		"answer_id":1
      	},{
      		"answer_name":"答案b",
      		"answer_id":2
      	},{
      		"answer_name":"答案c",
      		"answer_id":3
      	},{
      		"answer_name":"答案d",
      		"answer_id":4
      	}
      	]
      },
      {
      	"item_name":'题目二',
      	"item_answers":[{
      		"answer_name":"答案e",
      		"answer_id":5
      	},{
      		"answer_name":"答案f",
      		"answer_id":6
      	},{
      		"answer_name":"答案g",
      		"answer_id":7
      	},{
      		"answer_name":"答案h",
      		"answer_id":8
      	}
      	]
      },
      {
      	"item_name":'题目三',
      	"item_answers":[{
      		"answer_name":"答案i",
      		"answer_id":9
      	},{
      		"answer_name":"答案j",
      		"answer_id":10
      	},{
      		"answer_name":"答案k",
      		"answer_id":11
      	},{
      		"answer_name":"答案l",
      		"answer_id":12
      	}
      	]
      },
      {
      	"item_name":'题目四',
      	"item_answers":[{
      		"answer_name":"答案m",
      		"answer_id":13
      	},{
      		"answer_name":"答案n",
      		"answer_id":14
      	},{
      		"answer_name":"答案o",
      		"answer_id":15
      	},{
      		"answer_name":"答案p",
      		"answer_id":16
      	}
      	]
      },
      {
      	"item_name":'题目五',
      	"item_answers":[{
      		"answer_name":"答案q",
      		"answer_id":17
      	},{
      		"answer_name":"答案r",
      		"answer_id":18
      	},{
      		"answer_name":"答案s",
      		"answer_id":19
      	},{
      		"answer_name":"答案t",
      		"answer_id":20
      	}
      	]
      },
      {
      	"item_name":'题目六',
      	"item_answers":[{
      		"answer_name":"答案u",
      		"answer_id":21
      	},{
      		"answer_name":"答案v",
      		"answer_id":22
      	},{
      		"answer_name":"答案w",
      		"answer_id":23
      	},{
      		"answer_name":"答案x",
      		"answer_id":24
      	}
      	]
      }
	],
      answerid:[],//答案记录
      answerText:''//意见或建议
};

export default new Vuex.Store({
	state,
	actions,
	mutations
})