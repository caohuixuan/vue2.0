export default{
        jiajia:(state,m)=>{
           state.count=m;
           console.log(state.count)
        },
        updateAddress:(state,m)=>{
            state.myAddress=m;
            //console.log(state.myAddress);
        },
        updatePosition:(state,myposition)=>{
           //   console.log(myposition);
        	   state.myPosition=myposition;
        },
        qqSet:(state,q)=>{
        	state.qq=q;
        },
        setGeocoder:(state,geo)=>{
          //  console.log(geo);
            state.geocoder=geo;
        },
        mapSet:(state,mymap)=>{
            //console.log(mymap);
            state.mymap=mymap;
        },
        show_search_info:(state,points)=>{
           state.searchPoint.points=[];
           state.searchPoint.points=points;
           state.searchPoint.count=points.length;
           
        },
        infowinSet:(state,winInfo)=>{
            state.infoWin.info=winInfo;
        },
        listscount:(state,count)=>{
           // console.log(count);
           state.searchPoint.count=count;
          // console.log(state.count);
           // localStorage.setItem('count',count);
        }
}