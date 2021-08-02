export function h(tag: string) {
    return document.createElement(tag)
}
interface ToolCallBackValue {
    /**
     * 是否启动控件
     */
    kj: boolean,
    /**
     * 是否启动测距
     */
    cj: boolean
}
type ToolCallBack = (v: ToolCallBackValue) => void
export function initTool(callback: ToolCallBack) {
    // <div class="tool-panel">
    //   <button id="kj">
    //     控件
    //   </button>
    //   <button id="cj">
    //     测距
    //   </button>
    //   <button id="close">
    //     close
    //   </button>
    // </div>
    if(!callback){
        return void 0 
    }
    // 外层容器
    const toolTip = h('div')
    toolTip.classList.add('tool-panel')
    const style = h('style')
    style.textContent = `
    .active{
        color: red;
    }
    
    .tool-panel{
        position: fixed;
        right: 10px;
        bottom: 100px;
        z-index: 1000;
    }
    `
    toolTip.append(style)

    const kj = h('button')
    kj.textContent = '控件'
    const cj = h('button')
    cj.textContent = '测距'
    const close = h('button')
    close.textContent = 'X'
    toolTip.append(kj)
    toolTip.append(cj)
    toolTip.append(close)

    kj.addEventListener('click', function () {
        this.classList.toggle('active')
        cj.classList.remove('active')
        callback({
            kj: kj.classList.contains('active'),
            cj: cj.classList.contains('active')
        })
    })
    cj.addEventListener('click', function () {
        this.classList.toggle('active')
        kj.classList.remove('active')
        callback({
            kj: kj.classList.contains('active'),
            cj: cj.classList.contains('active')
        })
    })

    close.addEventListener('click', function () {
        callback({
            kj: false,
            cj: false
        })
        toolTip.remove()
    })
    document.body.append(toolTip)
    return toolTip
}

/**
 * 处理控件点击
 */
export function handleElement(e:HTMLElement){
    console.log(e);
}

/**
 * 处理测距
 */
export function handleDistance(e:HTMLElement){
    console.log(e);
}