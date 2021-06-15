# 计算浏览器LocalStorage最大存储容量

## 相关知识
**阿巴阿巴**

网上搜到的资料大多说的Chrome容量大小5M之类的，`LocalStorage`存储的内容格式为字符串

试验了一下，这个5M实际上指的存储内容字符串长度，即`length`等于 **5\*1024*1024**，并不是实际上的内容大小为5Mb

并且限制的是 key + value 的字符数不大于 5M(5\*1024*1024)😁

## 计算LocalStorage存储空间大小的方法

### [源码](./index.js)
直接访问[./index.html](./index.html)也可查看

* [线上访问地址](https://node-server-test-7fq6ugeaba9dce8-1256505457.tcloudbaseapp.com/storage/)

结果如下：

![图片](https://img.cdn.sugarat.top/mdImg/MTYyMzcyNjgyNjM1MA==623726826350)

### 实际多浏览器测试
使用[BrowserStack](https://live.browserstack.com/dashboard#os=Windows&os_version=7&browser=Chrome&browser_version=65.0&zoom_to_fit=true&full_screen=true&resolution=responsive-mode&url=https%3A%2F%2Fecom.meituan.com%2Fmeishi&speed=1),其提供了常见的各种浏览器环境，如下图所示

![图片](https://img.cdn.sugarat.top/mdImg/MTYyMzY4NDI3ODM1Mg==623684278352)

### 测试结果
>因为是 一次加 1M 进行测试可能存在误差

**字符个数**
* Firefox：5\*1024*1024
* Chrome：5\*1024*1024
* Opera:5\*1024*1024
* IE8/11:4\*1024*1024