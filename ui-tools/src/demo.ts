const colors = {
    bgRed: 'rgba(255,0,0,0.2)',
    bgBlue: 'rgba(0,111,255,0.2)',
    fontRed: 'red',
    fontBlue: 'blue'
}

function judgeBgImgEl(el) {
    return el && !!el.style.backgroundImage
}
function getAllImgEls(doc: any) {
    // 常规的
    const imgs = doc.querySelectorAll('img')

    // 递归获取非常规的
    const getBgIms = (el = doc.body as Element) => {
        const res = []
        if (el.childElementCount > 0) {
            Array.from(el.children).forEach(v => {
                res.push(...getBgIms(v))
            })
        }
        if (judgeBgImgEl(el)) {
            res.push(el)
        }
        return res
    }
    const bgImgs = getBgIms()
    return {
        imgs,
        bgImgs
    }
}

function addImgCover(img, bgc = 'rgba(255,0,0,0.2)') {
    // 如果有蒙层，则直接新的颜色
    if (img.getAttribute('cover')) {
        img.nextElementSibling.style.backgroundColor = bgc
        return
    }

    // 标记已经添加过蒙层
    img.setAttribute('cover', '1')

    const divParent = document.createElement('div')
    divParent.style.position = 'relative'

    const divChild = document.createElement('div')
    divChild.style.position = 'absolute'
    divChild.style.top = '0'
    divChild.style.width = '100%'
    divChild.style.height = '100%'
    divChild.style.backgroundColor = bgc

    divParent.appendChild(img.cloneNode())
    divParent.appendChild(divChild)

    img.replaceWith(divParent)
}

function addBgImgCover(bgImg, bgc = 'rgba(255,0,0,0.2)') {
    // 如果有蒙层，则直接新的颜色
    if (bgImg.getAttribute('cover')) {
        bgImg.children[0].style.backgroundColor = bgc
        return
    }

    // 标记已经添加过蒙层
    bgImg.setAttribute('cover', '1')

    const divChild = document.createElement('div')
    divChild.style.width = '100%'
    divChild.style.height = '100%'
    divChild.style.backgroundColor = bgc
    bgImg.appendChild(divChild)
}

function addTextCover(textEl, bgc = 'rgba(255,0,0,0.2)') {
    textEl.style.backgroundColor = bgc
}
function getAllTextEls(doc: any) {
    // 递归获取
    const getTextEls = (el = doc.body as Element) => {
        const res = []
        if (el.childElementCount === 0) {
            el.textContent.trim().length !== 0 && res.push(el)
        } else {
            // const elText = el.textContent.trim()
            // const childText = Array.from(el.children).map(el => el.textContent).join('').trim()
            // if (elText.length > childText.length) {
            //     res.push(el)
            // }
            Array.from(el.children).forEach(e => {
                res.push(...getTextEls(e))
            })
        }
        return res
    }
    return getTextEls()
}

export function changeTheme(theme: 'red' | 'blue', doc: Document) {
    let color = theme === 'red' ? colors.bgBlue : colors.bgRed;
    const bgColor = theme === 'red' ? colors.bgRed : colors.bgBlue;

    // 处理图片
    const { imgs, bgImgs } = getAllImgEls(doc)
    imgs.forEach((img) => {
        addImgCover(img, bgColor)
    })
    bgImgs.forEach((img) => {
        addBgImgCover(img, bgColor)
    })

    // 处理文字
    const textEls = getAllTextEls(doc)
    textEls.forEach(textEl => {
        addTextCover(textEl, color)
    })
}

// let theme = 'red'

// // 主题切换
// window.addEventListener('visibilitychange', (e) => {
//     if (document.hidden) {
//         theme = theme === 'red' ? 'blue' : 'red'
//         changeTheme(theme)
//     }
// })

// changeTheme(theme)