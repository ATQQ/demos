export default function nonenumerable(target, key, descriptor) {
    descriptor.enumerable = false
    return descriptor
}