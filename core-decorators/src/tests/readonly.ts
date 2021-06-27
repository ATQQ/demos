import { readonly } from '../index';
class Test {
    hello1(){
        console.log('hello1');
    }

    @readonly
    hello2(){
        console.log('hello2');
    }
}

const t = new Test();
t.hello1 = function(){
    console.log('1');
}

t.hello1()

t.hello2 = function(){
    console.log('2');
}

t.hello2()