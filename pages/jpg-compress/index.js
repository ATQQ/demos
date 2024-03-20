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

async function compressImageByCanvas(file, options = {}) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const { quality } = options;
  let { width, height} = options
  const reader = new FileReader();

  let _resolve, _reject
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })

  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {

      // 如果只指定了宽度或高度，则另一个按比例缩放
      if (width && !height) {
        height = Math.round(img.height * (width / img.width))
      } else if (!width && height) {
        width = Math.round(img.width * (height / img.height))
      }

      // 设置 canvas 的宽高与图片一致
      canvas.width = height || img.width;
      canvas.height = width || img.height;

      // 在 canvas 上绘制图片
      ctx.drawImage(img, 0, 0);

      // 获取压缩后的图片数据
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      
      _resolve(dataURItoFile(compressedDataUrl, file.name))
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
  return promise
}

function dataURItoFile(dataURI, fileName) {
  const arr = dataURI.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
}

function compressJPGImage(file, method, ops = {}) {
  if(method === 'canvas'){
    return compressImageByCanvas(file, ops)
  }
  return file
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

async function isJPG(file) {
  // 提取前4个字节
  const arraybuffer = await file.slice(0, 4).arrayBuffer()

  // JPG 的前8字节16进制表示（2种情况）
  const signature1 = [0xFF, 0xD8, 0xFF, 0xE0]
  const signature2 = [0xFF, 0xD8, 0xFF, 0xE1]
  // 转为 8位无符号整数数组 方便对比
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
  const source = new Uint8Array(arraybuffer)

  // 逐个字节对比
  for (let i = 0; i < signature1.length; i++) {
    if (source[i] !== signature1[i] && source[i] !== signature2[i]) {
      return false
    }
  }
  return true
}