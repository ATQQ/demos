import enumable from "../core/enumable";
import enumerable from "../core/enumerable";
import nonenumerable from "../core/nonenumerable";

class Test {
    @nonenumerable
    a(){
        
    }
    @enumerable
    b(){

    }
    @enumable(false)
    c(){

    }
}

console.log(Object.getOwnPropertyDescriptor(Test.prototype,'a')?.enumerable === false); // true
console.log(Object.getOwnPropertyDescriptor(Test.prototype,'b')?.enumerable === true);  // true
console.log(Object.getOwnPropertyDescriptor(Test.prototype,'c')?.enumerable === false); // true

console.log(Object.keys(Test.prototype)); // ['b']
