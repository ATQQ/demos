// 手动选择的图片
document.querySelector('#file').addEventListener('change', async (e) => {
  const file = e.target.files[0]
  compress(file)
})

const $cv = document.querySelector('#cv')
// 粘贴图片
$cv.addEventListener('paste', function (e) {
  // 阻止触发默认的粘贴事件
  e.preventDefault();

  let { items } = e.clipboardData;
  for (const item of items) {
    if (item.kind === "file" && item.type.startsWith("image")) {
      //上传的文件对象
      let file = item.getAsFile();
      compress(file)
      return;
    }
  }
})

// 禁用默认的拖拽触发的内容
document.addEventListener('drop', function (e) {
  e.preventDefault()
}, true)
document.addEventListener('dragover', function (e) {
  e.preventDefault()
}, true)

// 拖拽图片
$cv.addEventListener('drop', function (e) {
  let { files } = e.dataTransfer;
  for (const file of files) {
    if (file.type.startsWith("image")) {
      compress(file)
      return;
    }
  }
})

// 图片预览支持
const viewer = new Viewer(document.querySelector('table'))
let originFile = null
let compressedResult = null
// 下载支持
document.querySelector('#download').addEventListener('click', (e) => {
  if (compressedResult) {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(compressedResult)
    a.download = compressedResult.name
    a.click()
  }
})

// 新配置重新生成
document.querySelector('#refresh').addEventListener('click', async () => {
  if(!originFile){
    alert('请先选择图片')
    return
  }
  compress(originFile)
})

/**
 * 压缩图片
 * @param {File} file 图片文件对象
 */
async function compress(file) {
  if(!file){
    return
  }
  originFile = file
  // 显示下载按钮
  document.querySelector('#download').style.visibility = 'visible'

  // 类型卡控
  const isPng = await isPNG(file)
  if (!isPng) {
    alert('请选择 PNG 格式图片')
    return
  }

  // 压缩配置获取
  const qualityInput = document.getElementById('qualityInput');
  const noCompressIfLargerInput = document.getElementById('noCompressIfLargerInput');
  const widthInput = document.getElementById('widthInput');
  const heightInput = document.getElementById('heightInput');
  const ops = {
    quality: parseFloat(qualityInput.value),
    noCompressIfLarger: noCompressIfLargerInput.checked,
    width: parseInt(widthInput.value),
    height: parseInt(heightInput.value)
  };

  // 压缩图片
  const compressedFile = await compressPNGImage(file, ops)
  compressedResult = compressedFile

  // 页面显示更新
  document.querySelector('#origin-img').setAttribute('src', createObjectURL(file))
  document.querySelector('#compressed-img').setAttribute('src', createObjectURL(compressedFile))

  document.querySelector('#origin-size').textContent = formatSize(file.size)
  document.querySelector('#compressed-size').textContent = formatSize(compressedFile.size)
  document.querySelector('#compressed-size').style.color = file.size > compressedFile.size ? 'green' : 'red'

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
  const { quality = 0.8, noCompressIfLarger = true } = ops
  let { width, height } = ops
  const arrayBuffer = await file.arrayBuffer()
  const decoded = UPNG.decode(arrayBuffer)
  const rgba8 = UPNG.toRGBA8(decoded)

  // 如果只指定了宽度或高度，则按比例缩放
  if (width && !height) {
    height = Math.round(decoded.height * (width / decoded.width))
  } else if (!width && height) {
    width = Math.round(decoded.width * (height / decoded.height))
  }

  const compressed = UPNG.encode(
    rgba8,
    width || decoded.width,
    height || decoded.height,
    256 * quality
  )

  const newFile = new File([compressed], file.name || `${date.now()}.png`, { type: 'image/png' })

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