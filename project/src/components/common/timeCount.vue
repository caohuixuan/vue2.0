<template>
<div>
   <span class="timecount">{{counetTime}}</span>
</div>
</template>
<script>
export default{
	name:'signin',
	data(){
	    return{
	        allTime:900,
	        timer:null,
	    }
	},
	props:['time'],
	mounted(){
        this.allTime-=this.time;
        this.starttime();
	},
	computed:{
	    counetTime:function(){
	         let minute = parseInt(this.allTime/60);
                if (minute < 10) {
                    minute = '0' + minute;
                }
                let second = parseInt(this.allTime%60);
                if (second < 10) {
                    second = '0' + second;
                }
                return '去支付(还剩' + minute + '分' + second + '秒)';
	    }
	},
	methods:{
	    starttime(){    
	         clearInterval(this.timer);
	         this.timer=setInterval(()=>{
	            this.allTime--;
	            if(this.allTime==0){
	               alert("支付超时");
	               clearInterval(this.timer);
	            }
	         },1000)
	    }
	}
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.timecount{
    border:.03rem solid $grew2;
    padding:.2rem .5rem;
    border-radius:.8rem;
    @include fontstyle2(1rem,$orange,300);
   }
</style>