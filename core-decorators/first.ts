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

console.log(a.name);
