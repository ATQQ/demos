import { lazyInitialize } from "..";

function getMaxArray(str=''){
    console.log(str,'init huge array');
    return new Array(100)
}

class Test{
    @lazyInitialize(()=>getMaxArray('a'))
    public a

    public b = getMaxArray('b')
}

const t = new Test()
const k = new Test()
k.a
k.a
console.log(k.a);
