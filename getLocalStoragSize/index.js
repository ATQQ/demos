String.prototype.repeat = String.prototype.repeat || function (count) {
    'use strict';
    if (this == null) {
        throw new TypeError('can\'t convert ' + this + ' to object');
    }
    var str = '' + this;
    count = +count;
    if (count != count) {
        count = 0;
    }
    if (count < 0) {
        throw new RangeError('repeat count must be non-negative');
    }
    if (count == Infinity) {
        throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
        return '';
    }
    // 确保 count 是一个 31 位的整数。这样我们就可以使用如下优化的算法。
    // 当前（2014年8月），绝大多数浏览器都不能支持 1 << 28 长的字符串，所以：
    if (str.length * count >= 1 << 28) {
        throw new RangeError('repeat count must not overflow maximum string size');
    }
    var rpt = '';
    for (; ;) {
        if ((count & 1) == 1) {
            rpt += str;
        }
        count >>>= 1;
        if (count == 0) {
            break;
        }
        str += str;
    }
    return rpt;
}
function getStorageSize() {
    var oneM = 1024 * 1024
    var length = 0
    try {
        for (var i = 0; i < 15; i++) {
            // 一次加1024*1024个字符
            length += oneM
            // 清空
            localStorage.clear()
            var a = localStorage.setItem('a', '中'.repeat(length - 1))
        }
    } catch (error) {
        length -= oneM
    }
    localStorage.clear()
    // 得出最后结果

    return [
        '内容长度：' + length,
        'UTF-8(英文 - 1字节)内容大小：' + length + '字节' + formatSize(length),
        'UTF-8(中文 - 3字节)内容大小：' + length * 3 + '字节' + formatSize(length * 3),
        'UTF-16(中/英文 - 4字节)内容大小：' + length * 4 + '字节' + formatSize(length * 4),
    ]
}

/**
 * 转换单位
 * 来源于网络
 */
function formatSize(size, pointLength, units) {
    var unit
    units = units || ['B', 'K', 'M', 'G', 'TB']
    while ((unit = units.shift()) && size > 1024) {
        size /= 1024
    }
    return (unit === 'B' ? size : size.toFixed(pointLength === undefined ? 2 : pointLength)) + unit
}

var res = getStorageSize()

document.getElementById('content').value = res.join('\n')