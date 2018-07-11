export default{
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
        }
}