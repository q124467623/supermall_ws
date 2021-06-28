
import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default {
  //context={state,commit}
  addCart(context, payload) {
    // console.log(payload);
    //查找数组
    //数组常用方法：push pop unshift shift sort reverse slice splice forEach map some filter every reduce flat join find
    let product = context.state.cartList.find(item => item.iid === payload.iid)
    if (product) {
      context.commit(ADD_COUNTER,product)
    } else {
      payload.count = 1
      // console.log(product.count);
      // state.cartList.push(payload)
      context.commit(ADD_TO_CART,payload)
      // console.log(this.cartList);
    }
  }
}