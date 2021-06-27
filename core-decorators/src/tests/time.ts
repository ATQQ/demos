import { time } from './../index'
class Test {
    @time()
    sayHello() {
        let i = 0
        while (i < 100000) {
            i++
        }
        console.log('success');
    }
}

const t = new Test()
t.sayHello()