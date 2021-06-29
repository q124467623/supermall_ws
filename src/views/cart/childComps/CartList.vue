<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>
  </div>
</template>
<script>
import Scroll from '@/components/common/scroll/Scroll'
import {mapGetters} from 'vuex'
import CartListItem from './CartListItem'

export default {
  name:'CartList',
  components:{
    Scroll,
    CartListItem
  },
  computed:{
    ...mapGetters(['cartLength','cartList'])
  }
}
</script>

<style scoped>

</style>
