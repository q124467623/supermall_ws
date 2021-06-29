import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    //方法1：简单写法,state是累积的数据集，payload是每次传过来的数据
    // addCart(state, payload) {
    //     let product = state.cartList.find(item => item.iid === payload.iid)
    //     if (product) {
    //         product.count += 1
    //     } else {
    //         payload.count = 1
    //         state.cartList.push(payload)
    //     }
    //     console.log(product.count);
    // },

    //mutations唯一的目的就是修改state中的状态
    //mutations中的每个方法尽可能完成的事情比较单一，下边的判断是两个事情
    //方法2：重构
    [ADD_COUNTER](state, payload) {
        payload.count++;
    },
    [ADD_TO_CART](state, payload) {
        state.cartList.push(payload)
    }
}