import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    // context={state,commit}
    addCart(context, payload) {
        //数组常用方法：push pop unshift shift sort reverse slice splice forEach map some filter every reduce flat join find
        let product = context.state.cartList.find(item => item.iid === payload.iid)
        if (product) {
            context.commit(ADD_COUNTER, product)
        } else {
            payload.count = 1
            payload.checked = true
            context.commit(ADD_TO_CART, payload)
        }
    }
}