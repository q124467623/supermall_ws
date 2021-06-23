<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in cgoods" :key="index" :goodsItem="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name:'GoodsList',
  props:{
    cgoods:{
      type:Array,
      default(){
        return []
      }
    },
  },
  components:{
    GoodsListItem
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;/* 如果一条轴线排不下，就往下排。 */
    justify-content: space-around;  /*弹性项目平均分布在该行上，两边留有一半的间隔空间。*/
    padding: 2px;
  }
</style>
