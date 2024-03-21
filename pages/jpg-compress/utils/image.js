import { dataURItoFile } from './transform.js'

export async function isJPG(file) {
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
export async function compressJPGImage(file, method, ops = {}) {
    let newFile = file
    const { noCompressIfLarger = true } = ops
    
    if (method === 'canvas') {
        newFile = await compressImageByCanvas(file, ops)
    }

    if (!noCompressIfLarger) {
        return newFile
    }
    
    return file.size > newFile.size ? newFile : file
}

export async function compressImageByCanvas(file, options = {}) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const { quality } = options;
    let { width, height } = options
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