 <template>
	<div class="loading_container">
	    <div class="loading_img" :style="{backgroundPositionY:-(positionY)*2.5+'rem'}"></div>
	    <svg class="loading_svg" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="20" cy="15" rx="20" ry="8" style="fill:rgba(180,180,180,.8); stroke:none;stroke-width:2"/>
        </svg>
	</div>
</template>

<script>
    export default {
    	name:'loading',
    	data(){
    	    return{
    	       positionY:0,
               timer:null
    	    }
    	},
    	mounted(){
            this.timer=setInterval(()=>{

                  this.positionY++;
                  if(this.positionY==7){
                     this.positionY=0;
                  }
            },600)
    	},
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    @keyframes imgs{
         0%{transform:translateY(0px);}
         50%{transform:translateY(-50px);}
         100%{transform:translateY(0px);}
    }
    @keyframes svg{
         0%{transform:scale(1);}
         50%{transform:scale(0.4);}
         100%{transform:scale(1);}
    }
	.loading_container{
	    position:fixed;
	    top:50%;
	    left:50%;
	    z-index:120;
	    transform:translate(-50%,-50%);
	    @include wh(3rem,3rem);
	    .loading_img{
            @include wh(100%,2.5rem);
            background-image:url('../../images/myloading.png'); background-repeat:no-repeat;
            background-size: 2.5rem auto;
            background-position:0rem 0rem;
            animation:imgs 0.6s infinite ease-in-out;
            z-index:111;

	    }
	    .loading_svg{ 
	        position: absolute;
		    @include wh(2.6rem, 2rem);
	        z-index:111;
	        animation:svg 0.6s infinite ease-in-out;
	    }
	}
</style>
