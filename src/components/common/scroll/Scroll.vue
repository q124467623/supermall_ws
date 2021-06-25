<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>


<script>
import BScroll from 'better-scroll';

export default {
    name:'Scroll',
    props:{
      cprobeType:{
        type:Number,
        default: 0
      },
      cpullUpLoad:{
        type:Boolean,
        default:false
      },
    },
    data(){
      return {
        scroll:null
      }
    },
    //mounted组件挂载完之后：
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          probeType:this.cprobeType,
          pullUpLoad:this.cpullUpLoad,
          mouseWheel:true,
          observeDOM:true
        })
        //2.监听滚动位置
        this.scroll.on('scroll',position=>{
          // console.log(position);
          this.$emit('scroll',position)
        })
        //3.监听上拉事件
        if(this.cpullUpLoad){
          this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')
        })
        }
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll&&this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
}
</script>

<style scoped>
</style>
