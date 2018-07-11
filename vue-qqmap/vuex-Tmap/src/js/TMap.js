export function TMap(key){
	return new Promise(function(resolve,reject){
		window.init=function(){
			resolve(qq);
		}
		let script1=document.createElement("script");
		script1.type="text/javascript";
		script1.src="http://map.qq.com/api/js?v=2.exp&callback=init&key="+key+"&libraries=drawing,geometry,autocomplete,convertor";
		script1.onerror=reject;
		document.head.appendChild(script1);
	})
}



          /*
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
                vm.updatePosition(new qq.maps.LatLng(lat,lng));
            //获取当前位置address
                var geocoder=new qq.maps.Geocoder();
                geocoder.getAddress(vm.myPosition);
            //设置服务请求成功的回调函数
                geocoder.setComplete(function(result) {
                vm.updateAddress(result.detail.address);
            //创建地图 
                vm.makeMymap();
            //初始化winInfo
                vm.infowinSet();
            //搜索周边
                vm.searchPoints();
                });
                //若服务请求失败，则运行以下函数
                geocoder.setError(function() {
                    alert("请输入详细地址");
                });
                
                vm.setGeocoder(geocoder);

          }         
        getLocation();    
         */