import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default {
  //mutations唯一的目的就是修改state中的状态
  //mutations中的每个方法尽可能完成的事情比较单一，下边的判断是两个事情
  [ADD_COUNTER](state , payload){
    payload.count++
    console.log("payload.count++ :",payload.count);
  },
  [ADD_TO_CART](state,payload){
    payload.count = 1
    state.cartList.push(payload)
  }
}