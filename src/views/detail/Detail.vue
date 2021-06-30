<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"/>
      <scroll class="content" ref="scroll" :cprobe-type="3" @scroll="scrollPosition">
        <detail-swiper :ctop-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
        <detail-param-info :param-info="paramInfo" ref="param"/>
        <detail-comment-info :comment-info="commentInfo" ref="comment"/>
        <goods-list :cgoods="recommends" ref="recommend"/>
      </scroll>
      <detail-bottom-bar class="detail-bottom" @addCart="addToCart"/>
      <back-top class="back-top" v-show="isShowBackTop" @click.native="backClick"></back-top>
      <toast :message="message" :isShow="isShow"/>
    </div>
</template>

<script>
import DetailNavBar from '@/views/detail/childComps/DetailNavBar'
import DetailSwiper from '@/views/detail/childComps/DetailSwiper'
import DetailBaseInfo from '@/views/detail/childComps/DetailBaseInfo'
import DetailShopInfo from '@/views/detail/childComps/DetailShopInfo'
import DetailGoodsInfo from '@/views/detail/childComps/DetailGoodsInfo'
import DetailParamInfo from '@/views/detail/childComps/DetailParamInfo'
import DetailCommentInfo from '@/views/detail/childComps/DetailCommentInfo'
import DetailRecommendInfo from '@/views/detail/childComps/DetailRecommendInfo'
import DetailBottomBar from '@/views/detail/childComps/DetailBottomBar'

import Scroll from '@/components/common/scroll/Scroll'
import GoodsList from '@/components/content/goods/GoodsList'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '@/network/detail'
import {itemListenerMixin,backTopMixin} from '@/common/mixin'

import { mapActions } from 'vuex'
import Toast from '@/components/common/toast/Toast'

export default {
    name:'Detail',
    mixins:[itemListenerMixin,backTopMixin],
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll,
      GoodsList,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar,
      Toast,

    },
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        currentIndex:0,
        message:'',
        isShow:false
      }
    },
    created(){
      //1.保存传入的iid
      this.iid = this.$route.params.iid;
      //2.根据iid请求详情数据
      getDetail(this.iid).then((res) => {
        // console.log(res.result);
        //3.获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages
        //4.获取商品信息
        this.goods = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
        //5.创建店铺信息的对象
        this.shop = new Shop(res.result.shopInfo)
        //6.保存商品的详情数据
        this.detailInfo = res.result.detailInfo;
        //7.获取参数信息
        this.paramInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule);
        //8.保存评论信息
        if(res.result.rate.cRate){
          this.commentInfo = res.result.rate.list[0]
          // console.log(this.commentInfo);
        }
        //9.点击标题滚到响应内容
          //9.1在这里this.$refs.param.$el.offsetTop是不对的，因为仅仅获取到数据，还没渲染
        // this.$nextTick(()=>{
          //9.2在这里获取的值也不对，图片没有计算在内
          //根据最新的数据，对应的DOM是已经被渲染出来
          //但是图片依然是没有加载完（offsetTop值偏小）
        // })
      }).catch((err) => {
        console.log(err)
      });
      //请求推荐数据
      getRecommend().then((res, error) => {
          this.recommends = res.data.list;
      })
    },
    methods:{
      ...mapActions(['addCart']),
      //1.法1防抖，在DeatilGoodsList设置++this.counter ===this.imagesLength再发出事件
      detailImageLoad(){
        this.$refs.scroll.refresh()
        this.themeTopYs = [];
        this.themeTopYs.push(44);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      },
      //2.法2防抖，Mixin内有防抖函数
      // detailImageLoad(){
      //   this.newRefresh()
      // }
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+44,500)
      },
      scrollPosition(position){
        // console.log(this.themeTopYs);
        // console.log(-position.y);
        //方法1：普通方法
        // this.themeTopYs.forEach((item,index) =>{
          // if((this.currentIndex !== index)&&((index<this.themeTopYs.length-1&&-position.y>=item&&-position.y<this.themeTopYs[index+1])||(index===this.themeTopYs.length-1&&-position.y>=item))){
          //   this.currentIndex = index;
          //   console.log(this.currentIndex);
          //   this.$refs.navbar.currentIndex = this.currentIndex
          // }
        // })
        //方法2：this.themeTopYs.push(Number.MAX_VALUE)
        this.themeTopYs.push(Number.MAX_VALUE);
        let length = this.themeTopYs.length;
        for(let i=0;i<length-1;i++){
          if((this.currentIndex !== i)&&(-position.y>=this.themeTopYs[i]&&-position.y<this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.navbar.currentIndex = this.currentIndex
          }
        }
        //3.判断BackTop是否显示
        this.listenShowBackTop(position)
      },
      addToCart(){
        //1.只获取购物车中需要展示的信息：图片、标题、描述、价格、数量
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.realPrice = this.goods.realPrice
        product.iid = this.iid
        // product.count = 0
        // console.log(product);
        //2.将商品添加到购物车里
        // this.$store.commit('addCart',product)  //传到mutations中
        //法一，传统方法：
        // this.$store.dispatch('addCart',product)
        // .then(res=>{
        //   console.log(res);
        // })
        //法二，映射方法
        this.addCart(product).then(res => {
          this.message = res;
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
            this.message = '';
          }, 1000);
        })

      }
    },
    mounted(){
      //1.图片加载完成的时间监听
      // const refresh = debounce(this.$refs.scroll.refresh,100)
      // this.$bus.$on('detailItemImageLoad',()=>{
      //   refresh() //这里会执行24次，只是返回24次函数（函数内部有refresh），
      // })
      //2.图片加载完成的时间监听（方法2：Mixin）
    }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 101px);
}
</style>
