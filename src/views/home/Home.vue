<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control :ctitles="titles" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
  <scroll class="content"
    :cprobe-type="3"
    :cpull-up-load="true"
    @scroll="scrollPosition"
    @pullingUp="loadMore"
    ref="scroll">
    <home-swiper :cbanners="banners" @swiperImageLoad="swiperImageLoad"/>
    <home-recommend-view :crecommends="recommends"/>
    <home-feature-view/>
    <tab-control :ctitles="titles" @tabClick="tabClick" ref="tabControl2"/>
    <goods-list :cgoods="showGoods"/>
  </scroll>
  <back-top class="back-top" v-show="isShowBackTop" @click.native="backClick"></back-top>
</div>
</template>

<script>
import HomeSwiper from '@/views/home/childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from '@/views/home/childComps/HomeFeatureView'
import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'

import { getHomeMultidata, getHomeGoods } from '@/network/home'
import {itemListenerMixin,backTopMixin} from '@/common/mixin'

import Scroll from '@/components/common/scroll/Scroll'

export default {
    name:'Home',
    components:{
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins:[itemListenerMixin , backTopMixin],
    data(){
      return {
        banners:[],
        recommends:[],
        titles:["流行","新款","精选"],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        // isShowBackTop:false,
        tabOffsetTOP:0,
        isTabFixed:false,
        saveY:0
      }
    },
    created(){
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      //3.监听item图片加载完成
      // this.$bus.$on('itemImageLoad',()=>{
      //   // console.log("-------");//会打印30次，考虑采用防抖
      //   this.$refs.scroll.refresh()
      // })
    },
    mounted(){
      //1.图片加载完成的时间监听（方法1，根据名字判断）
      // const refresh = debounce(this.$refs.scroll.refresh,100)
      // this.$bus.$on('homeItemImageLoad',()=>{
      //   refresh() //这里会执行30次，只是返回30次函数（函数内部有refresh），
      // })
      //
      //1.图片加载完成的时间监听（方法2，Mixin）
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      },
    },
    destroyed(){
      console.log("destroyed");
    },
    activated(){
      // console.log(this.saveY);
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY);
    },
    methods:{
      /**
       * 事件监听相关方法
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType ='pop'
            break;
          case 1:
            this.currentType ='new'
            break;
          case 2:
            this.currentType ='sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      loadMore(){
        // console.log("加载更多");
        this.getHomeGoods(this.currentType)
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page +1;
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      scrollPosition(position){
        //1.判断BackTop是否显示
        this.listenShowBackTop(position)
        //2.决定tabControl是否吸顶（position:fixed）
        this.isTabFixed = -position.y>this.tabOffsetTOP
      },
      swiperImageLoad(){
        //1.判断Back
        this.tabOffsetTOP = this.$refs.tabControl2.$el.offsetTop;
      }
    }

}
</script>

<style scoped>
#home{
  height: 100vh;/*vh是视口的高度*/
  position: relative;

}
.home-nav {
  background-color: var(--color-tint);
  color: white;

  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
.tab-control{
  position: relative;
  background-color: #fff;
  z-index: 9;
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

</style>
