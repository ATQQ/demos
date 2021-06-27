# core-decorators库源码学习

## 前言
最近又温习了一遍TS装饰器，准备用装饰器改造一下[自己的轮子](https://github.com/ATQQ/node-server)

在改造之前，准备先学习一下优秀的装饰器开源库，站在巨人的肩膀上前行

根据一些博文的推荐，就选择了[core-decorators](https://github1s.com/jayphelps/core-decorators)

## 准备工作
可将[源码](https://github.com/jayphelps/core-decorators) clone到本地进行学习

也可直接利用github1s[在线预览](https://github1s.com/jayphelps/core-decorators)

### 搭建测试环境

全局安装ts-node与typescript两个依赖
```sh
npm install ts-node typescript -g
```

初始化ts配置文件（tsconfig.json）
```sh
tsc --init
```

将`noImplicitAny`,`noImplicitThis`设置为`false`，`experimentalDecorators`设置为**true**
```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    "target": "es5",                              
    "lib": ["ESNext","DOM"], 
    /* Strict Type-Checking Options */
    "strict": true,                                 /* Enable all strict type-checking options. */
    "noImplicitAny": false,                       
    "noImplicitThis": false,                      /* Raise error on 'this' expressions with an implied 'any' type. */
    "esModuleInterop": true,                        /* Enables emit interoperability between CommonJS and ES Modules via 
    /* Experimental Options */
    "experimentalDecorators": true,              /* Enables experimental support for ES7 decorators. */
    /* Advanced Options */
    "skipLibCheck": true,                           /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true        /* Disallow inconsistently-cased references to the same file. */
  }
}

```
编写示例测试

```ts
function defaultValue(str:string){
    return function(target,property){
        target[property] = str
    }
}

class User {

    @defaultValue('666')
    private _name: string | undefined
    constructor(name?:string) {
        if(name){
            this._name = name
        }
    }
    get name(){
        return this._name
    }
}

const a = new User()

console.log(a.name); // 666
```

运行,结果如上数的注释所示
```ts
ts-node first.ts
```

## 源码目录
![图片](https://img.cdn.sugarat.top/mdImg/MTYyNDcxMjM5NTAzMQ==624712395031)

简单数了一下大概有`17`个，咱一个个的挨着学，细细品

下面开始和大家一起学，由易到难