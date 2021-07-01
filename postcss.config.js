module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375, // UI设计稿的宽度
            viewportHeight: 667, // UI设计稿的宽度
            unitPrecision: 5, // 转换后的精度，即小数点位数
            viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
            selectorBlackList: ['ignore', 'tab-bar'], //不需要转换的类
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
            unitToConvert: "px", // 要转化的单位
            // propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，
            replace: true, // 是否转换后直接更换属性值
            exclude: [/TabBar/], // 设置忽略文件，用正则做目录名匹配：1）^abc表示以abc开头 2）abc$表示以abc结尾
            landscape: false, // 是否处理横屏情况
        }
    }
}