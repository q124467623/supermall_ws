<template>
  <swiper class="swiper-item">
    <swiper-item  v-for="(item,index) in ctopImages" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper , SwiperItem} from '@/components/common/swiper'

export default {
  name:'DetailSwiper',
  props:{
    ctopImages:{
      type:Array,
      default(){
        return []
      }
    },
  },
  components:{
    Swiper,
    SwiperItem,
  },
  data(){
    return {
      isLoad:false
    }
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        // this.$emit('swiperImageLoad')
        // this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>
.swiper-item{
  height: 300px;
  overflow: hidden;
}
</style>


