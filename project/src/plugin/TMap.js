export function TMap(key){
	return new Promise(function(resolve,reject){
		window.init=function(){
			resolve(qq);
		}
		let script1=document.createElement("script");
		script1.type="text/javascript";
		script1.src="http://map.qq.com/api/js?v=2.exp&callback=init&key="+key;
		script1.onerror=reject;
       /* let script2=document.createElement("script");
		script2.type="text/javascript";
		script2.src="http://map.qq.com/api/js?v=2.exp&key="+key+"&libraries=convertor";
		script2.onerror=reject;*/
		document.head.appendChild(script1);
		/*document.head.appendChild(script2);*/
	})
}