<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <scroll class="content"
    :cprobe-type="3"
    :cpull-up-load="true"
    @scroll="scrollPosition"
    @pullingUp="loadMore"
    ref="scroll">
    <home-swiper :cbanners="banners"/>
    <home-recommend-view :crecommends="recommends"/>
    <home-feature-view/>
    <tab-control class="tab-control" :ctitles="titles" @tabClick="tabClick"/>
    <goods-list :cgoods="showGoods"/>
  </scroll>
  <back-top class="back-top" v-show="isShowBack" @click.native="backClick"></back-top>
  <div>呵呵呵呵</div>

    <!-- <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
    </ul> -->

</div>
</template>

<script>
import HomeSwiper from '@/views/home/childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from '@/views/home/childComps/HomeFeatureView'

import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import BackTop from '@/components/content/backTop/BackTop'

import { getHomeMultifata, getHomeGoods } from '@/network/home'
import {debounce} from '@/common/utils'

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
      BackTop,
      Scroll
    },
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
        position:{},
      }
    },
    created(){
      //1.请求多个数据
      this.getHomeMultifata()
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
      const refresh = debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on('itemImageLoad',()=>{
        refresh() //这里会执行30次，只是返回30次函数（函数内部有refresh），
        //每个函数内部的函数在执行的时候会延迟500毫秒，如果下一次执行小于500毫秒，就把上次的延迟函数清空掉
        console.log("-------");//之前会打印30次，考虑采用防抖
        // this.$refs.scroll.refresh()
      })
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      },
      isShowBack(){
        return this.position.y < -1000
      }
    },
    methods:{
      /**
       * 事件监听相关方法
       */
      //如果下一章图片请求时间在delay之内，则func还没执行就被清空了，因此不刷新
      // debounce(func,delay){
      //   let timer = null;
      //   return function(...args){
      //     if(timer) clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       func.apply(this,args)
      //     }, delay);
      //   }
      // },
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
      },
      loadMore(){
        // console.log("加载更多");
        this.getHomeGoods(this.currentType)
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultifata(){
        getHomeMultifata().then(res=>{
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
        this.position = position
      },
      backClick(){
        // console.log(this.$refs.scroll.scroll);
        this.$refs.scroll.scrollTo(0,0)
      },

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

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tab-control{
  position: sticky;
  top: 44px;
  /* background-color: #fff; */
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
