import { isJPG, compressJPGImage, formatSize, createObjectURL, calculateCompressionPercentage } from './utils/index.js'

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
document.querySelector('#refresh').addEventListener('click', async (e) => {
  e.preventDefault();

  if (!originFile) {
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
  if (!file) {
    return
  }
  originFile = file
  // 显示下载按钮
  document.querySelector('#download').style.visibility = 'visible'

  // 类型卡控
  const isJpg = await isJPG(file)
  if (!isJpg) {
    alert('请选择 JPG 格式图片')
    return
  }
  // 压缩配置获取

  const { qualityInput, noCompressIfLargerInput = false, width, height, method } = getCompressConfig()

  const ops = {
    quality: parseFloat(qualityInput),
    noCompressIfLarger: !!noCompressIfLargerInput,
    width: +width,
    height: +height,
  };
  // 压缩图片
  const compressedFile = await compressJPGImage(file, method, ops)
  compressedResult = compressedFile

  // 页面显示更新
  document.querySelector('#origin-img').setAttribute('src', createObjectURL(file))
  document.querySelector('#compressed-img').setAttribute('src', createObjectURL(compressedFile))

  document.querySelector('#origin-size').textContent = formatSize(file.size)
  document.querySelector('#compressed-size').textContent = formatSize(compressedFile.size)
  document.querySelector('#compressed-size').style.color = file.size > compressedFile.size ? 'green' : 'red'

  document.querySelector('#compression-percentage').textContent = calculateCompressionPercentage(file.size, compressedFile.size)
}


function getCompressConfig() {
  const formData = new FormData(document.getElementById("configForm"));
  return Object.fromEntries(formData.entries())
}

