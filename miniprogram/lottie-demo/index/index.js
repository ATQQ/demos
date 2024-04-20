const app = getApp()
import lottie from 'lottie-miniprogram'

Page({
    init() {
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
        wx.createSelectorQuery().selectAll('#c2').node(res => {
            const canvas = res[0].node
            const context = canvas.getContext('2d')
            
            const { pixelRatio, windowWidth: width, windowHeight: height } = wx.getSystemInfoSync()
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
    }
})
