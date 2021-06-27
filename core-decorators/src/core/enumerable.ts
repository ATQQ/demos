export default function enumerable(target, key, descriptor) {
    descriptor.enumerable = true
    return descriptor
}