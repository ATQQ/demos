import { createObjectURL, dataURItoFile } from './transform.js'

export async function isJPG(file) {
    // 提取前3个字节
    const arraybuffer = await file.slice(0, 3).arrayBuffer()

    // JPG 的前3字节16进制表示
    const signature = [0xFF, 0xD8, 0xFF]
    // 转为 8位无符号整数数组 方便对比
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
    const source = new Uint8Array(arraybuffer)

    // 逐个字节对比
    return source.every((value, index) => value === signature[index])
}
export async function compressJPGImage(file, method, ops = {}) {
    let newFile = file
    const { noCompressIfLarger = true } = ops

    if (method === 'canvas') {
        newFile = await compressImageByCanvas(file, ops)
    }
    if (method === 'browser-image-compression') {
        newFile = await compressImageByImageCompression(file, ops)
    }
    if (method === 'Compressor') {
        newFile = await compressImageByCompressor(file, ops)
    }

    if (!noCompressIfLarger) {
        return newFile
    }

    return file.size > newFile.size ? newFile : file
}

export async function compressImageByCanvas(file, options = {}) {
    const { quality } = options;
    let { width, height } = options

    let _resolve, _reject
    const promise = new Promise((resolve, reject) => {
        _resolve = resolve
        _reject = reject
    })

    const img = new Image();
    img.onload = function () {

        // 如果只指定了宽度或高度，则另一个按比例缩放
        if (width && !height) {
            height = Math.round(img.height * (width / img.width))
        } else if (!width && height) {
            width = Math.round(img.width * (height / img.height))
        }
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 设置 canvas 的宽高与图片一致
        canvas.width = width || img.width;
        canvas.height = height || img.height;

        // 在 canvas 上绘制图片
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // 获取压缩后的图片数据
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        _resolve(dataURItoFile(compressedDataUrl, file.name))
    };

    img.src = createObjectURL(file);
    return promise
}

export function compressImageByImageCompression(file, options = {}) {
    let { width, height, quality } = options
    return window.imageCompression(file, {
        maxSizeMB: Math.round(file.size / (1024 * 1024) * quality),
        maxWidthOrHeight: width || height || undefined,
        libURL: 'https://cdn.staticfile.net/browser-image-compression/2.0.2/browser-image-compression.js'
    })
}

export async function compressImageByCompressor(file, options = {}) {
    let { width, height, quality } = options
    return new Promise((resolve, reject) => {
        new Compressor(file, {
            quality,
            width: width || undefined,
            height: height || undefined,
            success(result) {
                resolve(result)
            },
            error(err) {
                reject(err)
            },
        })
    })
}