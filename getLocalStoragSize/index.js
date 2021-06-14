function getStorageSize() {
    const oneM = 1024 * 1024
    let length = 0
    try {
        for (let i = 0; i < 15; i++) {
            // 一次加1024*1024个字符
            length += oneM
            // 清空
            localStorage.clear()
            const a = localStorage.setItem('a', '中'.repeat(length - 1))
        }
    } catch (error) {
        length -= oneM
    }
    localStorage.clear()
    // 得出最后结果
    const en = new Blob(['a'.repeat(length)])
    const zh = new Blob(['文'.repeat(length)])
    return [
        `内容长度：${length}`,
        `中文内容大小：${zh.size} 字节 ${formatSize(zh.size)}`,
        `英文内容大小：${en.size} 字节 ${formatSize(en.size)}`
    ]
}

/**
 * 转换单位
 * 来源于网络
 */
function formatSize(size, pointLength, units) {
    let unit
    units = units || ['B', 'K', 'M', 'G', 'TB']
    while ((unit = units.shift()) && size > 1024) {
        size /= 1024
    }
    return (unit === 'B' ? size : size.toFixed(pointLength === undefined ? 2 : pointLength)) + unit
}

const res = getStorageSize()

document.getElementById('content').value = res.join('\n')