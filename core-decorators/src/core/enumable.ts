export default function enumable(v = true) {
    return function (target, key, descriptor) {
        descriptor.enumerable = v
        return descriptor
    }
}