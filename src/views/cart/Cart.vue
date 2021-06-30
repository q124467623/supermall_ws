<template>
    <div class="cart">
      <!-- 购物车 -->
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>
      <!-- 商品列表 -->
      <scroll class="content" ref="scroll">
         <cart-list/>
      </scroll>
      <!-- 底部汇总 -->
      <cart-bottom-bar class="cartbottom"/>
    </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import CartList from '@/views/cart/childComps/CartList'

import {mapGetters} from 'vuex'
import Scroll from '@/components/common/scroll/Scroll'
import CartBottomBar from './childComps/CartBottomBar'

export default {
    name:'Cart',
    components:{
      NavBar,
      CartList,
      Scroll,
      CartBottomBar,
    },
    computed:{
      ...mapGetters(['cartLength'])
    },
    activated(){
      this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
.cart{
  height: 100vh;
  position: relative;
}
.nav-bar{
  position: relative;
  background-color: var(--color-tint);
  color: rgb(255, 255, 255);
  font-weight: 700;
  z-index: 9;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.cartbottom{
  position: absolute;
  bottom: 49px;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>
