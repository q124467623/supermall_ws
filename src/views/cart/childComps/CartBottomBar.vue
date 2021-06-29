<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"/>
      <span>全选</span>
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'
export default {
  components: { CheckButton },
  name:'CartBottomBar',
  props:{
    CheckButton
  },

  methods:{

  }

}
</script>

<style scoped>
.bottom-bar{
  background-color: red;
  height: 40px;
  position: relative;
  bottom: 44px;
}
.check-content{
  display: flex;
}
.check-button{
  width: 20px;
  height: 20px;
}
</style>
