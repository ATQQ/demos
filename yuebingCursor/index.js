const size = '30px'
const orbitSize = '40px'
function createCursor() {
    const cursor = h()
    cursor.id = 'cursor'

    addStyles(cursor, `
    #cursor{
        background-image:url(https://img.cdn.sugarat.top/mdImg/MTYzMTMyNDYwNTgzMQ==631324605831);
        width:${size};
        height:${size};
        background-size:${size} ${size};
        position:fixed;
        display:none;
        cursor:none;
        transform: translate(-30%, -20%);
        pointer-events: none;
    }
    `)
    document.body.append(cursor)
    return cursor
}
const cursor = createCursor()

function addStyles(target, styles) {
    const style = document.createElement('style')
    style.textContent = styles
    target.append(style)
}

function h(tag = 'div') {
    return document.createElement(tag)
}
function refreshCursorPos(x, y) {
    cursor.style.display = 'block'
    cursor.style.cursor = 'none'
    cursor.style.opacity = 1
    cursor.style.left = `${x}px`
    cursor.style.top = `${y}px`
    if (refreshCursorPos.timer) {
        clearTimeout(refreshCursorPos.timer)
    }
    refreshCursorPos.timer = setTimeout(() => {
        // 3s 后消失
        cursor.style.opacity = 0
        cursor.style.cursor = 'auto'
    }, 500)
}

const refreshOrbit = (function () {
    const ybCounts = 5
    const posList = []
    const domList = []
    for (let i = 0; i < ybCounts; i++) {
        const d = h()
        d.classList.add('orbit')
        domList.push(d)        
        document.body.append(d)
    }
    addStyles(document.body,`
    .orbit{
        background-image:url(https://img.cdn.sugarat.top/mdImg/MTYzMTMyNDMwODg2Nw==631324308867);
        width:${orbitSize};
        height:${orbitSize};
        background-size:${orbitSize} ${orbitSize};
        position:fixed;
        display:none;
        cursor:none;
        pointer-events: none;
    }
    `)
    // 简单的节流处理
    let now = 0
    return function (x, y) {
        // 刷新位置
        const maxScale = 1.5
        const minScale = maxScale / domList.length
        posList.forEach(({ x, y }, idx) => {
            const dom = domList[idx]
            dom.style.display = 'block'
            dom.style.left = `${x}px`
            dom.style.top = `${y}px`
            dom.style.transform = `scale(${(idx+1)*minScale}) translate(10%,10%)`
            if(dom.timer){
                clearTimeout(dom.timer)
            }
            dom.timer = setTimeout(()=>{
                dom.style.display = 'none'
            },50*(idx+1))
        })

        const nowTime = Date.now()
        // 20ms 节流时间
        if (now + 40 > nowTime) {
            return
        }
        now = nowTime
        posList.push({
            x, y
        })
        // 只展示5个残影
        if (posList.length === 6) {
            posList.shift()
        }
    }
})()

window.addEventListener('touchmove', function (e) {
    const { clientX, clientY } = e.changedTouches[0]
    refreshCursorPos(clientX, clientY)
})

window.addEventListener('mousemove', function (e) {
    const { clientX, clientY } = e
    e.target.style.cursor = 'none'
    if(window._timer){
        clearTimeout(window._timer)
    }
    window._timer = setTimeout(()=>{
        e.target.style.cursor = 'auto'
    },500)
    refreshCursorPos(clientX, clientY)
    refreshOrbit(clientX, clientY)
})