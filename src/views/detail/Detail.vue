<template>
    <div id="detail">
      <detail-nav-bar/>
      <detail-swiper :ctopImages="topImages" />
    </div>
</template>

<script>
import {getDetail} from '@/network/detail'
import DetailNavBar from '@/views/detail/childComps/DetailNavBar'
import DetailSwiper from '@/views/detail/childComps/DetailSwiper'

export default {
    name:'Detail',
    components:{
      DetailNavBar,
      DetailSwiper
    },
    data(){
      return {
        iid:null,
        topImages:[]
      }
    },
    created(){
      this.iid = this.$route.params.iid;
      getDetail(this.iid).then((result) => {
        this.topImages = result.result.itemInfo.topImages
        // console.log(this.banners)
      }).catch((err) => {
        console.log(err)
      });
    },
}
</script>

<style scoped>

</style>
