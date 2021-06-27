import { nonconfigurable } from "../index";

class Test {
    @nonconfigurable
    a(){
        
    }
    b(){

    }
}

let prototype:any = Test.prototype
delete prototype.b
console.log(Object.keys(Test.prototype)); // ['a']
delete prototype.a
console.log(Object.keys(Test.prototype));