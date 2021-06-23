<template>
<div id="home">
  <nav-bar class="home-nav">
    <div slot="center">购物街</div>
  </nav-bar>
  <home-swiper :cbanners="banners"/>
  <home-recommend-view :crecommends="recommends"/>
  <home-feature-view/>
  <tab-control class="tab-control" :ctitles="titles" @tabClick="tabClick"/>
  <goods-list :cgoods="showGoods"/>
</div>
</template>

<script>
import HomeSwiper from '@/views/home/childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from '@/views/home/childComps/HomeFeatureView'

import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'


import { getHomeMultifata, getHomeGoods } from '@/network/home'

export default {
    name:'Home',
    components:{
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      NavBar,
      TabControl,
      GoodsList
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
      }
    },
    created(){
      //1.请求多个数据
      this.getHomeMultifata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      /**
       * 时间监听相关方法
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
        })
      },

    }

}
</script>

<style scoped>
#home{
  /* height: 100vh; */
  /* position: relative; */
  padding-top: 44px;
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
  background-color: #fff;
  z-index: 9;

}
</style>
