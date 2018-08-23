let routerMode='hash';
let baseUrl='';
let imgBaseUrl='';
if (process.env.NODE_ENV == 'development') {
    imgBaseUrl = '/img/';

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = '/elm.cangdu.org';
    imgBaseUrl = '//elm.cangdu.org/img/';
}
export{
	routerMode,
	baseUrl,
	imgBaseUrl
}