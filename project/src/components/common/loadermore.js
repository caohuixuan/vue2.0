export const loadMore={
	directives:{
		'load-more':{
			bind:(el,binding)=>{
				var scrollPos; 
                 if (typeof document.compatMode != 'undefined' &&    document.compatMode != 'BackCompat') 
                { 
                     scrollPos = document.documentElement; 
                } 
                else if (typeof document.body != 'undefined') 
                { 
                     scrollPos = document.body; 
                } 


                el.addEventListener('touchend', () => {
                   // console.log('clientHeight'+scrollPos.clientHeight);
					//console.log('scrollTop'+scrollPos.scrollTop);
					//console.log('scrollHeight'+scrollPos.scrollHeight);
					//console.log(scrollPos.scrollHeight-scrollPos.scrollTop-scrollPos.clientHeight);
				    if(scrollPos.scrollHeight-scrollPos.scrollTop-scrollPos.clientHeight<=50){
                     // console.log("less");
                        binding.value();
				    }
				}, false)

			}
		}
	}
};

export const getImgPath = {
	methods: {
		//传递过来的图片地址需要处理后才能正常使用
		getImgPath(path) {
			let suffix;
			if (!path) {
				return '//elm.cangdu.org/img/default.jpg'
			}
			if (path.indexOf('jpeg') !== -1) {
				suffix = '.jpeg'
			} else {
				suffix = '.png'
			}
			let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
			return 'https://fuss10.elemecdn.com' + url
		},
	}

}