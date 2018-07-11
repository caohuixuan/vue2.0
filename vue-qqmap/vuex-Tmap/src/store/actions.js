export default{
	    pointSet:(context,m)=>{
            
           // console.log(m);
           
            let points=[];
            let point;
            //对网点进行筛选，设置离中心点的距离进行排序
            for(let i=0;i<m.length;i++){
                 point=m[i];
                 point.distance=parseInt(context.state.qq.maps.geometry.spherical.computeDistanceBetween(context.state.myPosition,point.latLng)); 
                  if( (point.category).indexOf("公司企业") >= 0 || (point.category).indexOf("报刊") >= 0 || (point.category).indexOf("银行") >= 0 || (point.category).indexOf("集邮") >= 0 ||(point.category).indexOf("报刊") >= 0 )
                {
                             continue ;
                }
               //context.commit("jiajia");
                points.push(point);
            }
            //按距离对pois排序
            function pois_distance_sort(a,b)
               {
                     return a.distance - b.distance;
               }
            points.sort(pois_distance_sort);
            
            let isize1 = new context.state.qq.maps.Size(35,35);
            let isize2 = new context.state.qq.maps.Size(55,55);
            let icon1_post = new context.state.qq.maps.MarkerImage("../static/lbs_3x.png", isize1, new context.state.qq.maps.Point(0,0),new context.state.qq.maps.Point(12,12), isize1);
            let icon2_post = new context.state.qq.maps.MarkerImage("../static/lbs_3x.png", isize2, new context.state.qq.maps.Point(0,0),new context.state.qq.maps.Point(22,22), isize2);
            let icon1_ems = new context.state.qq.maps.MarkerImage("../static/ems_3x.png", isize1, new context.state.qq.maps.Point(0,0),new context.state.qq.maps.Point(12,12), isize1);
            let icon2_ems = new context.state.qq.maps.MarkerImage("../static/ems_3x.png", isize2, new context.state.qq.maps.Point(0,0),new context.state.qq.maps.Point(22,22), isize2);
            
            for(let j=0;j<points.length;j++){

               if(points[j].marker1 == undefined || points[j].marker1 == null)
               {
                  points[j].marker1=new context.state.qq.maps.Marker({
                        map:context.state.mymap.map1,
                        position:points[j].latLng
                  });
                  if(points[j].category.indexOf("EMS")>=0)
                {
                    points[j].marker1.setIcon(icon1_ems);
                    points[j].marker1.setShadow(icon1_ems);  //阴影图标
                }
                else
                {
                    if(points[j].category.indexOf("邮局")>=0)
                    {
                        points[j].marker1.setIcon(icon1_post);
                        points[j].marker1.setShadow(icon1_post);  //阴影图标
                    }
                    else
                    {
                        ;
                    }
                }
               }
                points[j].marker1.poisIndex = j;
                context.state.qq.maps.event.addListener(  
                        points[j].marker1,  
                        'click',  
                        function(event) {  
                            context.state.infoWin.info.open();  
                            context.state.infoWin.info.setContent('<div style="text-align:left;margin:10px;"><div><p>地址：</p>'+points[event.target.poisIndex].address+'</div></div>');  
                            context.state.infoWin.info.setPosition(points[event.target.poisIndex].latLng);
                            context.state.mymap.map1.panTo(points[event.target.poisIndex].latLng);
                             }); 
          
            }
            //context.commit("setCount",points.length);
            //设置searchPoint
            context.commit("show_search_info",points);
        },
    makeMymap:({ dispatch, commit,state })=>{
             //创建地图
                var map1=new state.qq.maps.Map('mapArea');
                map1.panTo(state.myPosition);
                map1.zoomTo(14);
                var myMarker = new state.qq.maps.Marker({
                       //设置Marker的位置坐标
                           position:state.myPosition,
                           zIndex:state.ZIndex,
                       //设置显示Marker的地图
                           map: map1
                       });
               //创建收件地址的mark点
                  var myIcon=new state.qq.maps.MarkerImage("../img/point_blue_3x.png", new state.qq.maps.Size(32,32), new state.qq.maps.Point(0,0),new state.qq.maps.Point(16, 16),new state.qq.maps.Size(32,32));
                   myMarker.setIcon(myIcon);
                  //设置阴影图标
                   myMarker.setShadow(myIcon);  
                 //在中心点周围画一个覆盖500米的半透明的圆圈
                  var circle = new state.qq.maps.Circle({
                         map: map1,
                         center:state.myPosition,
                         radius: 500,
                       });
                
               commit('mapSet',map1);
                 //   commit('jiajia');
        },
        infowinSet:(context)=>{
            var infoWin= new context.state.qq.maps.InfoWindow({
                 map:context.state.mymap.map1
                 });
            context.commit("infowinSet",infoWin);
        },
        searchPoints:({ dispatch, commit,state })=>{
           // console.log(context);
            var searchService=new state.qq.maps.SearchService({
                  complete:function(results){
                  //  console.log(results);
                    dispatch('pointSet',results.detail.pois)
                  }
                    })
                  searchService.setPageCapacity(500);
                  searchService.searchNearBy([' EMS','邮局'],state.myPosition,2000);  
            
        }
        /*
        pointSet_login:({ dispatch,commit },m)=>{
            console.log(m);
            return dispatch('pointSet',m).then(()=>{
                console.log(m.length);
              //  context.commit('listscount',m.length);
            })
        }*/
}