<template>
  <div class="bottom-bar">
    <div class="check-content" @click="allClick">
      <check-button class="check-button" :is-checked="isSelectAll"/>
      <span>全选</span>
    </div>
    <div class="total-price">合计:￥ {{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'

export default {
  components: { CheckButton },
  name:'CartBottomBar',
  data(){
    return {
    }
  },
  props:{
    CheckButton
  },
  methods:{
    allClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item =>{item.checked = false})
      }else{
        this.cartList.forEach(item =>{item.checked = true})
      }
    },
    calcClick(){
      if(!this.checkLength){
        this.$toast.show('请选择购买商品',2000)
      }
    }
  },
  computed:{
    ...mapGetters(['cartLength','cartList']),
    totalPrice(){
      // this.isSelectAll()
      //方法1我的方法：
      // let sumPrice = 0
      // this.cartList.forEach(item => { sumPrice += item.count* item.realPrice *(item.checked? 1:0) });
      // return sumPrice.toFixed(2)

      //方法2老师：
      return this.$store.state.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue,item) =>{
        return preValue + item.realPrice * item.count
      },0)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item=>{
        return item.checked
      }).length
    },
    isSelectAll(){
      if(this.cartList.length === 0){
        return false
      }else{
        // this.isAllChecked =  !this.cartList.some(item => {return !item.checked})
        return this.checkLength === this.cartList.length? true:false
      }
    },
  },

}
</script>

<style scoped>
.bottom-bar{
  background-color: #eee;
  height: 40px;
  display: flex;
  font-size: 15px;
}
.check-content{
  display: flex;
  position: relative;
  width: 60px;
  top: 10px;
  margin-left: 10px;
}
.check-button{
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.total-price {
  display: flex;
  position: relative;
  flex: 1;
  top: 10px;
  margin-left: 30px;
}
.calculate {
  width: 90px;
  background-color: rgb(255, 0, 0);
  color: #fff;
  text-align: center;
  line-height: 40px;
}

</style>
