import {setStore,getStore} from '../config/mUtils.js'
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
	},
	ADDCART(state,{shopid,category_id,item_id,food_id,name,price,specs,packing_fee,sku_id,stock}){
        //console.log(category_id+","+item_id+","+food_id+","+name+","+price+","+specs+",");
        let cart=state.myCard;
        let shop=cart[shopid]=(cart[shopid]||{});
        let category=shop[category_id]=(shop[category_id]||{});
        let item=category[item_id]=(category[item_id]||{});
        if(item[food_id]){
        	item[food_id]['num']++;
        }else{
        	item[food_id]={
        		"num" : 1,
				"id" : food_id,
				"name" : name,
				"price" : price,
				"specs" : specs,
				"packing_fee" : packing_fee,
				"sku_id" : sku_id,
				"stock" : stock
        	};
        }
        state.myCard={...cart};
        setStore('myCard',state.myCard);
        //console.log(state.myCard);
	},
	MINUSCART(state,{shopid,category_id,item_id,food_id,}){
        let cart=state.myCard;
        let shop=(cart[shopid]||{});
        let category=(shop[category_id]||{});
        let item=(category[item_id]||{});
        if(item&&item[food_id]){
        	if(item[food_id]['num']>0){

        		item[food_id]['num']--;
        		state.myCard={...cart};
                        //console.log(item[food_id]);
        		setStore('myCard',state.myCard);
                    
                        
        	}else{
                        //console.log(item[food_id]);
        		item[food_id]=null;
        		//state.myCard={...cart};
        		 //console.log(state.myCard);
        		//setStore('myCard',state.myCard);
        	}
        }
        
	},
        setUserInfo(state,user){
                state.userInfo=user;
        //console.log(state.myPoint);
        },
}