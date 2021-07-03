import { mixin } from '../index'

const obj1 = {
    logA() {
        console.log(this.a);
    }
}

const obj2 = {
    printKeys() {
        console.log(Object.keys(this));
    }
}

@mixin(obj1, obj2)
class Test {
    public a = 1
}


const t: any = new Test()

t.logA() // 1
t.printKeys() // ['a']