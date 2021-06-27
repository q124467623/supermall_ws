import {debounce} from './utils'

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null,  //加这个可以让对监听的事件进行保存，使得Home组件和Detail组件各自执行自己的事件
      newRefresh:null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = ()=>{this.newRefresh()}
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    // console.log('我是混入内容');
  },
}