<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav"/>
      <scroll class="content" refs="scroll">
        <div class="wrapper">
          <detail-swiper :ctopImages="topImages" />
          <detail-base-info :goods="goods"/>
          <detail-shop-info :shop="shop"/>
          <detail-goods-info :detailInfo="detailInfo"/>
          <detail-param-info :paramInfo="paramInfo"/>
          <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
          <!-- <detail-recommend-info :recommendList="recommendList"/> -->
          <goods-list :cgoods="recommends"/>
        </div>
      </scroll>
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

import Scroll from '@/components/common/scroll/Scroll'
import GoodsList from '@/components/content/goods/GoodsList'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '@/network/detail'

export default {
    name:'Detail',
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
      DetailRecommendInfo
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
        recommends:[]
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
      }).catch((err) => {
        console.log(err)
      });
      //请求推荐数据
      getRecommend().then((res, error) => {
          // if (error) return
          this.recommends = res.data.list;
          // console.log(this.recommends);
      })
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
      }
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
  height: calc(100% - 44px);
}
</style>
