import { debounce } from './utils'
import BackTop from '@/components/content/backTop/BackTop'
import { BACK_POSITION } from "@/common/const";


export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null, //加这个可以让对监听的事件进行保存，使得Home组件和Detail组件各自执行自己的事件
            newRefresh: null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemImgListener = () => { this.newRefresh() }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        listenShowBackTop(position) {
            //1.判断BackTop是否显示
            this.isShowBackTop = position.y < BACK_POSITION
        },
        backClick() {
            // console.log(this.$refs.scroll.scroll);
            this.$refs.scroll.scrollTo(0, 0)
        },
    },
}