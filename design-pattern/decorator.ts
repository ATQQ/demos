function helloWorld(target) {
    // target === 目标类
    target.prototype.sayHello = function () {
        console.log('hello world');
    }
    return target
}

function expired(target, name, descriptor): any {
    console.log('fun:', name, 'is expired');
    return descriptor.value
}

function defaultValue(v: any) {
    return function (target, name) {
        target[name] = v
    }
}
function printParamPos(target, name, idx) {
    console.log('paramCount:', target[name].length, 'paramPos:', idx);
}

function configurable(value: boolean) {
    return function (target, name, descriptor) {
        descriptor.configurable = value;
    };
}
function enumerable(value: boolean) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
function writable(value:boolean){
    return function (target, propertyKey, descriptor) {
        descriptor.writable = value;
    };
}

@helloWorld
class Router {
    private _x: number
    private _y: number
    constructor(x, y) {
        this._x = x
        this._y = y
    }

    @enumerable(true)
    get x() {
        return this._x
    }

    get y() {
        return this._y
    }

    set x(v) {
        this._x = v
    }
    sayHello() {
        throw new Error("Method not implemented.");
    }

    @expired
    hello() {
        // ...code
    }
    @expired
    hello2() {
        // ...code
    }
    @defaultValue('666')
    public name: string | undefined

    hello3(@printParamPos name: string) {
        console.log('hello3', name);
    }
    static hello4(@printParamPos name: string) {
        console.log('hello4', name);
    }
}



const r = new Router(1, 2)
Router.hello4('123')
// r.sayHello() // hello world
// console.log(r.name);
// r.hello3('456')

console.log(r.x);
console.log(Object.keys(r));

// r.x = 123
// console.log(r.x);