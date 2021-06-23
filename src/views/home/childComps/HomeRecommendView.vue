<template>
    <ul class="recommend">
      <li v-for="(item,index) in crecommends" :key="index" class="recommend-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </li>
    </ul>
</template>

<script>
export default {
  name:'HomeRecommendView',
  props:{
    crecommends:{
      type:Array,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  list-style: none;
  flex: 1;
  font-size: 12px;
}
.recommend-item img{
  width: 78px;
  height: 78px;
  margin-bottom: 10px;
}
</style>
