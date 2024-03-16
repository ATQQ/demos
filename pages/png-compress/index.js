// 手动选择的图片
document.querySelector('#file').addEventListener('change',async (e)=> {
  const file = e.target.files[0]
  const isPng = await isPNG(file)
  if (isPng) {
    await compress(file)
    document.querySelector('#download').style.visibility = 'visible'
  } else {
    alert('请选择 PNG 格式图片')
  }
})

// 图片预览支持
const viewer = new Viewer(document.querySelector('table'))

let compressedResult = null
// 下载
document.querySelector('#download').addEventListener('click', (e) => {
  if (compressedResult) {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(compressedResult)
    a.download = compressedResult.name
    a.click()
  }
})
async function compress(file) {
    // 压缩图片
    const ops = {}
    const compressedFile = await compressPNGImage(file, ops)
    compressedResult = compressedFile
    document.querySelector('#origin-img').setAttribute('src', createObjectURL(file))
    document.querySelector('#compressed-img').setAttribute('src', createObjectURL(compressedFile))

    document.querySelector('#origin-size').textContent = formatSize(file.size)
    document.querySelector('#compressed-size').textContent = formatSize(compressedFile.size)
    document.querySelector('#compressed-size').style.color = file.size > compressedFile.size? 'green' :'red'

    document.querySelector('#compression-percentage').textContent = calculateCompressionPercentage(file.size, compressedFile.size)
}

function createObjectURL(file) {
  return URL.createObjectURL(file)
}

function calculateCompressionPercentage(originalSize, compressedSize) {
    if (originalSize === 0) {
      return 0
    }
    const percentageDecreased = ((originalSize - compressedSize) / originalSize) * 100
    return percentageDecreased.toFixed(2) // Returns the percentage with 2 decimal places
  }

function formatSize(
    size,
    pointLength,
    units,
  ) {
    let unit
    units = units || ['B', 'K', 'M', 'G', 'TB']
    // eslint-disable-next-line no-cond-assign
    while ((unit = units.shift()) && size > 1024) {
      size /= 1024
    }
    return (
      (unit === 'B'
        ? size
        : size.toFixed(pointLength === undefined ? 2 : pointLength)) + unit
    )
  }

async function compressPNGImage(file, ops = {}) {
    const { width, height, quality = 0.8, noCompressIfLarger = true } = ops
  
    const arrayBuffer = await file.arrayBuffer()
    const decoded = UPNG.decode(arrayBuffer)
    const rgba8 = UPNG.toRGBA8(decoded)
  
    const compressed = UPNG.encode(
      rgba8,
      width || decoded.width,
      height || decoded.height,
      256 * quality
    )
  
    const newFile = new File([compressed], file.name, { type: 'image/png' })
  
    if (!noCompressIfLarger) {
      return newFile
    }
  
    return file.size > newFile.size ? newFile : file
  }

async function isPNG(file) {
    // 提取前8个字节
    const arraybuffer = await file.slice(0, 8).arrayBuffer()
  
    // PNG 的前8字节16进制表示
    const signature = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]
    // const signature = [137, 80, 78, 71, 13, 10, 26, 10]
  
    // 转为 8位无符号整数数组 方便对比
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
    const source = new Uint8Array(arraybuffer)
  
    // 逐个字节对比
    for (let i = 0; i < signature.length; i++) {
      if (source[i] !== signature[i]) {
        return false
      }
    }
    return true
  }