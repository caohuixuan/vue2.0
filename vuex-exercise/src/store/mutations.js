export default{
        qqSet:(state,qq)=>{
             state.qq=qq;
             console.log(state);
        },
        updatePosition:(state,pos)=>{
             state.myPosition=pos;
             console.log(state);
        },
        updateAddress:(state,address)=>{
             state.myAddress=address;
             console.log(state);
        },
        mapSet:(state,map1)=>{
            console.log('map');
           state.myMap=map1;
             console.log(state);
            return;
        },
        updateMessage:(state,message)=>{
        	state.msg=message
        	console.log("msg="+state.msg)
        },
        updateMessage1:(state,message)=>{
        	state.msg1=message
        	console.log("msg1="+state.msg1)
        }
}