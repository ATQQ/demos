/**
 * 获取对象上的每个属性的描述符
 */
function getOwnPropertyDescriptors(obj) {
    const descs = {};
    Object.getOwnPropertyNames(obj).forEach(key => {
        descs[key] = Object.getOwnPropertyDescriptor(obj, key)
    })
    return descs;
}

function handleClass(target, mixins) {
    if (!mixins.length) {
        throw new SyntaxError(`@mixin() class ${target.name} requires at least one mixin as an argument`);
    }
    for (let i = 0; i < mixins.length; i++) {
        const descs = getOwnPropertyDescriptors(mixins[i])
        const keys = Object.getOwnPropertyNames(mixins[i])

        for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            if (!target.prototype.hasOwnProperty(key)) {
                Object.defineProperty(target.prototype, key, descs[key])
            }
        }
    }
}
export default function mixin(...objs) {
    return function (target) {
        return handleClass(target, objs)
    }
}