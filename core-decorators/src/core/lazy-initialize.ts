function createDefaultSetter(key) {
    return function set(newValue) {
        Object.defineProperty(this, key, {
            configurable: true,
            writable: true,
            enumerable: true,
            value: newValue
        });
        return newValue;
    };
}

export default function lazyInitialize(initializer): any {
    let t
    return function (target, key) {
        return {
            get() {
                t = t === undefined? initializer.call(this) : t
                return t;
            },
            set: createDefaultSetter(key)
        }
    }
}