const $file = document.getElementById('file')
const $lists = document.getElementById('lists')
const $textarea = document.getElementById('textarea')
const $img = document.getElementById('img')

// 选择目录
$file.onchange = function () {
    const files = this.files
    // 全部清空
    $lists.innerHTML = ''
    // 拆解目录
    for (const f of files) {
        f.paths = f.webkitRelativePath.split('/')
    }
    appendDir($lists, files)
}

$lists.addEventListener('click', function (e) {
    const $li = e.target

    // 不是li不管
    if ($li.tagName.toLowerCase() !== 'li') {
        return
    }

    const path = $li.getAttribute('path')
    const deep = +$li.getAttribute('deep')

    const files = $file.files

    for (const f of files) {
        // 点击的文件
        if (f.webkitRelativePath === path) {
            // 预览内容
            previewFile(f)
            return
        } 
    }

    // 有子项，且未被添加过
    if ($li.children.length === 0) {
        appendDir($li, files, deep + 1)
    }
})


function appendDir(parent, files, deep = 0) {
    const $ul = document.createElement('ul')
    const dirs = new Set()
    for (const f of files) {
        const p = f.paths[deep]
        if (deep === 0) {
            dirs.add(p)
        } else {
            const parentP = parent.getAttribute('path')
            if (f.webkitRelativePath.startsWith(parentP)) {
                dirs.add([parentP, p].join('/'))
            }
        }
    }
    for (const d of dirs) {
        const $li = document.createElement('li')
        const idx = d.lastIndexOf('/') + 1
        $li.textContent = idx===0 ? d : d.slice(idx)
        $li.setAttribute('path', d)
        $li.setAttribute('deep', deep)
        $ul.appendChild($li)
    }
    if (dirs.size !== 0) {
        parent.appendChild($ul)
    }
}

function readFile2Text(file) {
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    return new Promise(resolve=>{
        fileReader.onload = function () {
            const buf = this.result
            const textDecoder = new TextDecoder('utf8')
            resolve(textDecoder.decode(buf))
        }
    })
}

function previewFile(file){
    if(file.type.startsWith('image/')){
        $img.style.display = 'block'
        $textarea.style.display = 'none'
        $img.src = URL.createObjectURL(file)
    }else{
        readFile2Text(file).then(text=>{
            $img.style.display = 'none'
            $textarea.style.display = 'block'
            $textarea.value = text
        })
    }
}