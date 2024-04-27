const app = getApp()
import lottie from 'lottie-miniprogram'

Page({
    data:{
        showFull: false,
    },
    handleCloseFullScreen(){
        this.setData({
            showFull: false
        })
        this.clearInstance()
    },
    clearInstance(){
        try {
            this.ani?.stop?.()
        } catch (error) {
            console.log(error);
        }
    },
    init() {
        this.clearInstance()
        wx.createSelectorQuery().selectAll('#c1').node(res => {
            const canvas = res[0].node
            const context = canvas.getContext('2d')

            const width = 600
            const height = 600

            const { pixelRatio } = wx.getSystemInfoSync()
            canvas.width = width * pixelRatio
            canvas.height = height * pixelRatio

            context.scale(pixelRatio, pixelRatio)

            lottie.setup(canvas)
            this.ani = lottie.loadAnimation({
                loop: true,
                autoplay: true,
                path: "http://127.0.0.1:8080/json/data.json",
                rendererSettings: {
                    context,
                },
            })
        }).exec()
    },
    fullScreen() {
        this.clearInstance()
        this.setData({
            showFull: true
        })
        wx.createSelectorQuery().selectAll('#c2').node(res => {
            const canvas = res[0].node
            const context = canvas.getContext('2d')

            const { pixelRatio, windowWidth: width, windowHeight: height } = wx.getSystemInfoSync()
            canvas.width = width * pixelRatio
            canvas.height = height * pixelRatio
            context.scale(pixelRatio, pixelRatio)
            lottie.setup(canvas)
            this.ani = lottie.loadAnimation({
                loop: false,
                autoplay: true,
                path: "http://127.0.0.1:8080/json/data.json",
                rendererSettings: {
                    context,
                },
            })

            this.ani.onComplete = ()=>{
                console.log('播放完成');
                this.handleCloseFullScreen()
            }
        }).exec()
    },
    replaceText() {
        this.clearInstance()

        wx.createSelectorQuery().selectAll('#c1').node(async res => {
            const canvas = res[0].node
            const context = canvas.getContext('2d')

            const width = 600
            const height = 600

            const { pixelRatio } = wx.getSystemInfoSync()
            canvas.width = width * pixelRatio
            canvas.height = height * pixelRatio
            context.scale(pixelRatio, pixelRatio)
            lottie.setup(canvas)

            // 拉取JSON文件内容
            const jsonData = await new Promise((resolve, rej) => {
                wx.request({
                    url: 'http://127.0.0.1:8080/json/text-replace/data.json',
                    success: (res) => {
                        resolve(res.data)
                    },
                    fail: (err) => {
                        rej(err)
                    }
                })
            })
            // 随机生成1-100元的数字，保留两位小数
            const num = (Math.random() * 100).toFixed(2)
            // 替换内容
            const animationData = JSON.parse(
                JSON.stringify(jsonData)
                    .replace(/\$\{num\}/g, `${num}元`)
            )

            this.ani = lottie.loadAnimation({
                loop: true,
                autoplay: true,
                // 指定json内容
                animationData,
                // 设置依赖的图片资源位置
                assetsPath: 'http://127.0.0.1:8080/json/text-replace/images/',
                rendererSettings: {
                    context,
                },
            })
        }).exec()
    }
})
