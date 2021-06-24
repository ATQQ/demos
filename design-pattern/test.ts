import { deprecate } from './decorators/index'

class TestClass {
    @deprecate()
    hello(name: string) {
        console.log('hello', name);
    }
}

const a = new TestClass()

a.hello('world')
