<template>
  <div class="check-button" @click="itemClick" :class="{check:isChecked}">
    <img src="~@/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name:'CheckButton',
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  },
  components:{
  },
  methods:{
    itemClick(){
      this.$emit('checkBtnClick')
    }
  }

}
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border:1px solid #aaa;
}
.check{
  border-color: red;
  background-color: red;
}
</style>
