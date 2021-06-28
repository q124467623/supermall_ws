import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建store对象
const store = new Vuex.Store({
    //data():
    state: {
        cartList: []
    },
    mutations: {
        //mutations唯一的目的就是修改state中的状态
        //mutations中的每个方法尽可能完成的事情比较单一，下边的判断是两个事情
        addCart(state, payload) {
            //查找数组
            //数组常用方法：push pop unshift shift sort reverse slice splice forEach map some filter every reduce flat join find
            //let product = state.cartList.find(item => item.iid === payload.iid)和下边等价
            let product = null;
            state.cartList.forEach(item => {
                    if (item.iid === payload.iid) {
                        product = item;
                    }
                })
                //oldProduct为空是新的商品，否则一经有了
            if (product) {
                product.count += 1
            } else {
                product.count = 1
                state.cartList.push(payload)
            }

        }
    }
})

//3.挂载Vue实例上
export default store