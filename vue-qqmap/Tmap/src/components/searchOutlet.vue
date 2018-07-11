<template>
<div>
<div>
<InputText :inputText="addressText"></InputText>
</div>
<div id="Tmap">
</div>
<div id="tapsList">
<ListsTabs :Lists="listsTab" :clickNum="clickNum" @showListPop="showPop" @transferPlans="showPlans"></ListsTabs>
</div>
<div id="listInfo">
<button @click="returnList">返回</button>
<div id="infoDiv"></div>
</div>
</div>
</template>
<script>
import {TMap} from '../js/TMap.js';
import InputText from './InputText.vue';
import ListsTabs from './ListsTabs.vue';
export default{
	name:'searchOutlets',
    data(){
    return{
      qq:null,
      map:null,
      centermarker:null,
      centerPort:null,
      searchService:'',
      geocoder:null,
      listsTab:[],
      addressText:"",
      keyword:["超市"],
      markers:[],
      circle:null,
      clickNum:1,
      infoWin:null,
      transfer_plans:null,
      start_marker:null,
      end_marker:null,
      station_markers:[],
      transfer_lines:[],
      walk_lines:[]
     }
    },
    mounted(){
        var vm=this;
        TMap('WQCBZ-4FF3F-WI4JL-NJGAX-MECTJ-GMFWA').then(qq=>{
        vm.qq=qq;
        //获得当前位置
          function getLocation()
            {
                if (navigator.geolocation)
               {
                 console.log("获取定位")
                 navigator.geolocation.getCurrentPosition(showPosition,errorHandler);
               }else{
                 console.log("无法获取定位");
               }
            } 
        //当前位置获取失败
          function errorHandler(err) 
            {
                if(err.code == 1) {
                  alert("Error: Access is denied!");
                }else if( err.code == 2) {
                  alert("Error: Position is unavailable!");
                }
            }
        //当前位置获取成功
          function showPosition(position)
            {
                var lat=position.coords.latitude; 
                var lng=position.coords.longitude;
               // console.log(lat);
              //  console.log(lng);
                vm.centerPort=new qq.maps.LatLng(lat,lng);
                vm.geocoder = new qq.maps.Geocoder();
                //获取当前位置address
                codeLatLng(vm.centerPort);
                //创建地图
                makMap();
          }
        //根据坐标转换文字地址
          var codeLatLng=function(port){
                //对指定经纬度进行解析
                vm.geocoder.getAddress(port);
                //设置服务请求成功的回调函数
                vm.geocoder.setComplete(function(result) {
               // console.log(result.detail.address);
                vm.addressText=result.detail.address;
                });
                //若服务请求失败，则运行以下函数
                vm.geocoder.setError(function() {
                    alert("请输入详细地址");
                });
            }
        //创建地图
          var makMap=function(){
                //创建地图
                 vm.map=new qq.maps.Map(document.getElementById('Tmap'),{
                    center:vm.centerPort,
                    zoom:13
                });
                //标出中心点
                var anchor = new vm.qq.maps.Point(6, 6),
                    size = new vm.qq.maps.Size(24, 24),
                    origin = new vm.qq.maps.Point(0, 0),
                    icon = new vm.qq.maps.MarkerImage('http://open.map.qq.com/doc/img/nilt.png', size, origin, anchor);
                vm.centermarker = new vm.qq.maps.Marker({
                icon:icon,
                map:vm.map,
                position: vm.centerPort
                });
                //设置（搜索）中心坐标点 画圆
                vm.circle=new vm.qq.maps.Circle({
                    center:vm.centerPort,
                    radius:500,
                    map:vm.map
                });
                var latlngBounds=new qq.maps.LatLngBounds();
                //搜索周边网点
                vm.searchService=new qq.maps.SearchService({
                    complete:function(results){
                    var pois=results.detail.pois;
                    var l=pois.length;
                    for(let i=0;i<l;i++){
                    vm.listsTab.push(pois[i]);
                    let poi=pois[i];
                    latlngBounds.extend(poi.latLng);
                    //设置网点marker
                    var marker=new qq.maps.Marker({
                        map:vm.map,
                        position:poi.latLng
                });
                //设置信息框
                vm.infoWin = new qq.maps.InfoWindow({  
                        map : vm.map  
                });  
                //为每一个marker绑定click事件
                qq.maps.event.addListener(  
                        marker,  
                        'click',  
                        function(evt) {  
                           vm.infoWin.open();  
                           vm.infoWin.setContent('<div style="text-align:left;margin:10px;"><div>'+poi.name+'</div><div>地址：'+poi.address+'</div></div>');  
                           vm.infoWin.setPosition(evt.latLng);  
                           vm.clickNum=i;
                        //   console.log("---"+vm.clickNum);
                });  
                marker.setTitle(i+1);
                vm.markers.push(marker);
                }
                vm.map.fitBounds(latlngBounds);
                }
                });
           vm.searchService.setPageCapacity(100);
           vm.searchService.searchNearBy(vm.keyword,vm.centerPort,500); 
            }
getLocation();
        })
    },
    methods:{
       searchKeyword:function(text){
          var vm=this;
          document.getElementById('tapsList').style.display="block";
          document.getElementById('listInfo').style.display="none";
            //清除所有覆盖物
            if(vm.markers){
               for (var i in vm.markers) {
                  vm.markers[i].setMap(null);
               }
                  vm.markers.length = 0;
            }
            vm.circle.setMap(null);
            //清除列表
            this.listsTab=[];
           vm.geocoder.getLocation(text);
                //设置服务请求成功的回调函数
                this.geocoder.setComplete(function(result) {
                //设置地图中心点
                vm.map.setCenter(result.detail.location);
                //画中心点
                var anchor = new vm.qq.maps.Point(6, 6),
                    size = new vm.qq.maps.Size(24, 24),
                    origin = new vm.qq.maps.Point(0, 0),
                    icon = new vm.qq.maps.MarkerImage('http://open.map.qq.com/doc/img/nilt.png', size, origin, anchor);
                vm.centermarker = new vm.qq.maps.Marker({
                icon:icon,
                map:vm.map,
                position: result.detail.location
                });

                //画圆
               vm.centerPort=new vm.qq.maps.LatLng(result.detail.location.lat,result.detail.location.lng);
                vm.circle=new vm.qq.maps.Circle({
                    center:vm.centerPort,
                    radius:500,
                    map:vm.map
                });
                var latlngBounds=new vm.qq.maps.LatLngBounds();
                //搜索周边网点
                vm.searchService=new vm.qq.maps.SearchService({
                    complete:function(results){
                    var pois=results.detail.pois;
                    var l=pois.length;
                    for(var i=0;i<l;i++){
                    vm.listsTab.push(pois[i]);
                    let poi=pois[i];
                    latlngBounds.extend(poi.latLng);
                    //设置网点marker
                    var marker=new vm.qq.maps.Marker({
                        map:vm.map,
                        position:poi.latLng
                });
                //设置信息框
                vm.infoWin = new vm.qq.maps.InfoWindow({  
                        map : vm.map  
                });  
                //为每一个marker绑定click事件
                vm.qq.maps.event.addListener(  
                        marker,  
                        'click',  
                        function(evt) {  
                           vm.infoWin.open();  
                           vm.infoWin.setContent('<div style="text-align:left;margin:10px;"><div>'+poi.name+'</div><div>地址：'+poi.address+'</div></div>');  
                           vm.infoWin.setPosition(evt.latLng);  
                });  
                marker.setTitle(i+1);
                vm.markers.push(marker);
                }
                vm.map.fitBounds(latlngBounds);
                }
                });
           vm.searchService.setPageCapacity(100);
           vm.searchService.searchNearBy(vm.keyword,vm.centerPort,500); 
                })
       },
       showPop(index){
      // this.infoWin.close();
      // console.log(this.markers[index]);
     // this.markers[index].setTop();
       },
       showPlans(list){
       document.getElementById('tapsList').style.display="none";
       document.getElementById('listInfo').style.display="block";
       var vm=this;
       //相关参数
     
 
          //创建TransferService
           var transferService = new vm.qq.maps.TransferService({
            map: vm.map,
            //展现结果
           // panel: document.getElementById('infoDiv')
           });
          //调用calcPlan用来判断出行方式
            function calcPlan() {
               //清除覆盖物
                for (var i in vm.markers) {
                  vm.markers[i].setMap(null);
                 }
                  vm.markers.length = 0;
                  vm.circle.setMap(null);
                  transferService.clear();
                //设置乘坐方案
                transferService.setPolicy(vm.qq.maps.TransferPolicy['LEAST_TIME']);
                //设置公交换乘的区域范围
                transferService.setLocation("北京");
                //设置回调函数
                transferService.setComplete(function(result) {
                    //console.log(result);
                    result=result.detail;
                    /*
                    var start = result.start,
                    end = result.end;
                    var anchor = new qq.maps.Point(6, 6),
                    size = new qq.maps.Size(24, 36),
                    start_icon = new qq.maps.MarkerImage('img/busmarker.png', size),
                    end_icon = new qq.maps.MarkerImage('img/busmarker.png', size, new qq.maps.Point(24, 0), anchor);

                   // start_marker && start_marker.setMap(null);
                   // end_marker && end_marker.setMap(null);
                    start_marker = new qq.maps.Marker({
                        icon: start_icon,
                        position: start.latLng,
                        map: vm.map,
                        zIndex: 1
                    });
                    end_marker = new qq.maps.Marker({
                        icon: end_icon,
                        position: end.latLng,
                        map: map,
                        zIndex: 1
                    });
                    */
                    vm.transfer_plans=result.plans;
                    var plans_desc=[];
                    for(var i=0;i<vm.transfer_plans.length;i++){
                        var p_attributes = ['onclick="renderPlan(' + i + ')"', 'onmouseover=this.style.background="#eee"', 'onmouseout=this.style.background="#fff"', 'style="margin-top:-4px;cursor:pointer"'].join(' ');
                        plans_desc.push('<p onclick="renderPlan(0)" onmouseover=this.style.background="#eee" onmouseout=this.style.background="#fff" style="margin-top:-4px;cursor:pointer"><b>方案</b>');
                        var actions=vm.transfer_plans[i].actions;
                        for(var j=0;j<actions.length;j++){
                           var action=actions[j];
                           var img_position;
                           action.type == qq.maps.TransferActionType.BUS && (img_position = '-38px 0px');
                           action.type == qq.maps.TransferActionType.SUBWAY && (img_position = '-57px 0px');
                           action.type == qq.maps.TransferActionType.WALK && (img_position = '-76px 0px');
                           var action_img = '<span style="margin-bottom: -4px;' + 'display:inline-block;background:url(../assets/point_blue_3x.png) ' + 'no-repeat ' + img_position + ';width:19px;height:19px"></span>&nbsp;&nbsp;';
                           plans_desc.push(action_img + action.instructions)
                        }

                    }
                    //document.getElementById("infoDiv").innerHTML = "<div><button onclick='returnList()'>返回</button>";
                    document.getElementById("infoDiv").innerHTML = plans_desc.join('<br><br>');
                    //document.getElementById("infoDiv").innerHTML = "</div>";
                    //渲染到地图上
                    //console.log(vm.transfer_plans);
                  //  vm.$options.methods.renderPlan(vm.transfer_plans,0);
                  renderPlan(0);
                if (result.type == vm.qq.maps.ServiceResultType.MULTI_DESTINATION) {
                    alert("起终点不唯一");
                }
                //console.log(vm.markers);
                });
                //设置检索失败回调函数
                transferService.setError(function(result) {
                //如果service返回的结果类型为qq.maps.ServiceErrorType.Error（服务器异常），弹出提示信息
                if (result.type == vm.qq.maps.ServiceErrorType.Error) {
                    alert("服务器异常");
                }
                });
                //设置公交换乘的起点和终点
                transferService.search(vm.centerPort,new vm.qq.maps.LatLng(list.latLng.lat,list.latLng.lng));
                
            }
            function returnList(){
            console.log("返回");
            }
            //路线渲染在地图上函数
            function renderPlan(index){
                console.log(index);
                var plan=vm.transfer_plans[index],
                lines=plan.lines,
                walks=plan.walks,
                stations=plan.stations;
                vm.map.fitBounds(plan.bounds);
                //清除路线
                clearOverlay(vm.station_markers);
                clearOverlay(vm.transfer_lines);
                clearOverlay(vm.walk_lines);
                var anchor = new vm.qq.maps.Point(6, 6),
                size = new vm.qq.maps.Size(24, 36),
                bus_icon = new vm.qq.maps.MarkerImage('../assets/point_blue_3x.png', size, new vm.qq.maps.Point(48, 0), anchor),
                subway_icon = new vm.qq.maps.MarkerImage('../assets/point_blue_3x.png', size, new vm.qq.maps.Point(72, 0), anchor);
                //push点信息
                for (var j = 0; j < stations.length; j++) {
                    var station = stations[j];
                    if (station.type == vm.qq.maps.PoiType.SUBWAY_STATION) {
                        var station_icon = subway_icon;
                    } else {
                        var station_icon = bus_icon;
                    }
                    var station_marker = new vm.qq.maps.Marker({
                        icon: station_icon,
                        position: station.latLng,
                        map: vm.map,
                        zIndex: 0
                    });
                    vm.station_markers.push(station_marker);
                }
                //push公交路线
                for (var j = 0; j < lines.length; j++) {
                    var line = lines[j];
                    var polyline = new vm.qq.maps.Polyline({
                        path: line.path,
                        strokeColor: '#3893F9',
                        strokeWeight: 6,
                        map: vm.map
                    });
                    vm.transfer_lines.push(polyline);
                }
                //push步行路线
                for (var j = 0; j < walks.length; j++) {
                    var walk = walks[j];
                    var polyline = new qq.maps.Polyline({
                        path: walk.path,
                        strokeColor: '#3FD2A3',
                        strokeWeight: 6,
                        map: vm.map
                    });
                    vm.walk_lines.push(polyline);
                }

            }
            //清除地图上的marker
            function clearOverlay(overlays) {
                var overlay;
                while (overlay = overlays.pop()) {
                    overlay.setMap(null);
                }
            }

          calcPlan();
      },
      returnList(){
      var text="北京市丰台区丰西北里甲";
      var vm=this;
          document.getElementById('tapsList').style.display="block";
          document.getElementById('listInfo').style.display="none";
           
            //清除列表
            this.listsTab=[];
           vm.geocoder.getLocation(text);
                //设置服务请求成功的回调函数
                this.geocoder.setComplete(function(result) {
                //设置地图中心点
                vm.map.setCenter(result.detail.location);
                //画中心点
                var anchor = new vm.qq.maps.Point(6, 6),
                    size = new vm.qq.maps.Size(24, 24),
                    origin = new vm.qq.maps.Point(0, 0),
                    icon = new vm.qq.maps.MarkerImage('http://open.map.qq.com/doc/img/nilt.png', size, origin, anchor);
                vm.centermarker = new vm.qq.maps.Marker({
                icon:icon,
                map:vm.map,
                position: result.detail.location
                });

                //画圆
               vm.centerPort=new vm.qq.maps.LatLng(result.detail.location.lat,result.detail.location.lng);
                vm.circle=new vm.qq.maps.Circle({
                    center:vm.centerPort,
                    radius:500,
                    map:vm.map
                });
                var latlngBounds=new vm.qq.maps.LatLngBounds();
                //搜索周边网点
                vm.searchService=new vm.qq.maps.SearchService({
                    complete:function(results){
                    var pois=results.detail.pois;
                    var l=pois.length;
                    for(var i=0;i<l;i++){
                    vm.listsTab.push(pois[i]);
                    let poi=pois[i];
                    latlngBounds.extend(poi.latLng);
                    //设置网点marker
                    var marker=new vm.qq.maps.Marker({
                        map:vm.map,
                        position:poi.latLng
                });
                //设置信息框
                vm.infoWin = new vm.qq.maps.InfoWindow({  
                        map : vm.map  
                });  
                //为每一个marker绑定click事件
                vm.qq.maps.event.addListener(  
                        marker,  
                        'click',  
                        function(evt) {  
                           vm.infoWin.open();  
                           vm.infoWin.setContent('<div style="text-align:left;margin:10px;"><div>'+poi.name+'</div><div>地址：'+poi.address+'</div></div>');  
                           vm.infoWin.setPosition(evt.latLng);  
                });  
                marker.setTitle(i+1);
                vm.markers.push(marker);
                }
                vm.map.fitBounds(latlngBounds);
                }
                });
           vm.searchService.setPageCapacity(100);
           vm.searchService.searchNearBy(vm.keyword,vm.centerPort,500); 
                })
      },
      clearOverlay(overlays){
      //清除地图上的marker
      var overlay;
                while (overlay = overlays.pop()) {
                    overlay.setMap(null);
                }
      },
      renderPlan(plans,index){
      var vm=this;
      //路线渲染在地图上函数
      console.log(index);
      console.log(plans);
                var plan=plans[index],
                lines=plan.lines,
                walks=plan.walks,
                stations=plan.stations;
                vm.map.fitBounds(plan.bounds);
                //清除路线
                clearOverlay(station_markers);
                clearOverlay(transfer_lines);
                clearOverlay(walk_lines);
                var anchor = new vm.qq.maps.Point(6, 6),
                size = new vm.qq.maps.Size(24, 36),
                bus_icon = new vm.qq.maps.MarkerImage('../assets/point_blue_3x.png', size, new vm.qq.maps.Point(48, 0), anchor),
                subway_icon = new vm.qq.maps.MarkerImage('../assets/point_blue_3x.png', size, new vm.qq.maps.Point(72, 0), anchor);
                //push点信息
                for (var j = 0; j < stations.length; j++) {
                    var station = stations[j];
                    if (station.type == vm.qq.maps.PoiType.SUBWAY_STATION) {
                        var station_icon = subway_icon;
                    } else {
                        var station_icon = bus_icon;
                    }
                    var station_marker = new vm.qq.maps.Marker({
                        icon: station_icon,
                        position: station.latLng,
                        map: vm.map,
                        zIndex: 0
                    });
                    vm.station_markers.push(station_marker);
                }
                //push公交路线
                for (var j = 0; j < lines.length; j++) {
                    var line = lines[j];
                    var polyline = new vm.qq.maps.Polyline({
                        path: line.path,
                        strokeColor: '#3893F9',
                        strokeWeight: 6,
                        map: vm.map
                    });
                    vm.transfer_lines.push(polyline);
                }
                //push步行路线
                for (var j = 0; j < walks.length; j++) {
                    var walk = walks[j];
                    var polyline = new qq.maps.Polyline({
                        path: walk.path,
                        strokeColor: '#3FD2A3',
                        strokeWeight: 6,
                        map: vm.map
                    });
                    vm.walk_lines.push(polyline);
                }
      }

    },
    created:function(){

    },
    components:{
       InputText,
       ListsTabs
    }
}
</script>
<style>
#Tmap{
	height:300px;
	width:100%;
}
#listInfo{
  display:none;
  overflow:auto;
}
</style>
