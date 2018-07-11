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