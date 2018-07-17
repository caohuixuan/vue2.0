export const setStorage=(name,content)=>{
     if(!name){return;}
     let C=JSON.parse(window.localStorage.getItem(name)) || [];
     C.push(content);
     if(typeof C !=='string'){
     	  C=JSON.stringify(C);
     }
     window.localStorage.setItem(name,C);
}
export const getStorage=name=>{
	if(!name){return;}
	return window.localStorage.getItem(name);
}
export const removeStorage=name=>{
	if(!name){return;}
	window.localStorage.removeItem(name)
}