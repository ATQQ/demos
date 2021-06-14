# 计算浏览器LocalStorage最大存储容量

## 相关知识
**阿巴阿巴**

网上搜到的资料大多说的Chrome容量大小5M之类的，`LocalStorage`存储的内容格式为字符串

试验了一下，这个5M实际上指的存储内容字符串长度，即`length`等于 **5*1024*1024**，并不是实际上的内容大小为5Mb

并且限制的是 key + value 的字符数不大于 5M(5*1024*1024)😁

## 计算LocalStorage存储空间大小的方法

### [源码](./index.js)
直接访问[./index.html](./index.html)也可查看

TODO:线上地址

结果如下：

![图片](https://img.cdn.sugarat.top/mdImg/MTYyMzY4NTA3NTU4OQ==623685075589)

### 实际多浏览器测试
使用[BrowserStack](https://live.browserstack.com/dashboard#os=Windows&os_version=7&browser=Chrome&browser_version=65.0&zoom_to_fit=true&full_screen=true&resolution=responsive-mode&url=https%3A%2F%2Fecom.meituan.com%2Fmeishi&speed=1),其提供了常见的各种浏览器环境，如下图所示

![图片](https://img.cdn.sugarat.top/mdImg/MTYyMzY4NDI3ODM1Mg==623684278352)

