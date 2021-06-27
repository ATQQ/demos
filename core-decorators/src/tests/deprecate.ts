import { deprecate, deprecated } from '../index'
class Test {
    @deprecate()
    sayHello1() {
        console.log('hello 1');
    }
    @deprecated('API弃用警告')
    sayHello2() {
        console.log('hello 2');
    }
    @deprecate('API弃用警告',{url:'https://www.baidu.com'})
    sayHello3() {
        console.log('hello 3');
    }
}

const t = new Test()
t.sayHello1()
t.sayHello2()
t.sayHello3()