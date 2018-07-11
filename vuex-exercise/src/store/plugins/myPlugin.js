export default function myPlugin(store){
	//生成state快照
	 let prevState=deepCopy(store.state)
	store.subscribe((mutation,state)=>{
        let nextState=deepCopy(state)
        console.log("prevState:"+prevState)
        console.log("nextState:"+nextState)
         prevState = nextState
	})
	//深拷贝
function deepCopy(o) {
    if (o instanceof Array) {
        var n = [];
        for (var i = 0; i < o.length; ++i) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else if (o instanceof Function) {
        var n = new Function("return " + o.toString())();
        return n
    } else if (o instanceof Object) {
        var n = {}
        for (var i in o) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else {
        return o;
    }
}
}