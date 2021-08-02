import './style.css'
import { initTool,handleElement,handleDistance } from './utils'

const onion = {
  init(haveTool = false) {
    // 避免重复引入

    // 如果有工具
    if (haveTool) {
      onion.toolDom = initTool((v) => {
        const { kj, cj } = v
        // 关闭已开启功能

        // 重新cloneBody
        // 先移除
        this.removeCloneBody()
        if (kj || cj) {
          this.cloneBody()
        }

        // 激活控件功能
        if (kj) {
          this.shadowRoot.addEventListener('click', handleElement)
        }
        // 激活测距功能
        if (cj) {
          this.shadowRoot.addEventListener('click', handleDistance)
        }
      })
    }
  },
  cloneBody() {
    const shadowRoot = document.createElement('div')
    document.body.append(shadowRoot)
    shadowRoot.attachShadow({ mode: 'open' });

    // 阻止触发默认事件
    shadowRoot.addEventListener('click', function (e) {
      e.preventDefault()
    })

    // 阻止页面滚动
    shadowRoot.addEventListener('touchmove', function (e) {
      e.preventDefault()
    }, { passive: false })

    // 使用拷贝页面作为新页面使用
    const tBody = document.body.cloneNode(true) as HTMLElement

    // 移除其中的script
    // 移除工具创建的tool-panel
    tBody.querySelectorAll('script').forEach(s => s.remove())
    tBody.querySelector('.tool-panel').remove()

    shadowRoot.append(tBody)
    const bodyStyle = getComputedStyle(document.body)

    shadowRoot.style.position = 'absolute'
    shadowRoot.style.left = bodyStyle.marginLeft
    shadowRoot.style.top = bodyStyle.marginTop
    shadowRoot.style.width = '100%'
    shadowRoot.style.height = `${document.body.scrollHeight}px`
    shadowRoot.style.minHeight = '100vh'

    this.shadowRoot = shadowRoot
  },
  removeCloneBody() {
    if (this.shadowRoot) {
      this.shadowRoot.remove()
    }
    this.shadowRoot = null
  },
  destroy() {

  },
  shadowRoot: null,
  toolDom: null
}

export default onion

if (import.meta.env.MODE === 'development') {
  onion.init(true)
}