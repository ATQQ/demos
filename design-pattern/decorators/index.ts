/**
 * 弃用指定API提示
 * @param msg 
 * @returns 
 */
export function deprecate(msg = 'This function will be removed in future versions.') {
    return function (target, key, descriptor) {
        const methodSignature = `${target.constructor.name}#${key}`;
        return {
            ...descriptor,
            value: function () {
                console.warn(`DEPRECATION ${methodSignature}: ${msg}`);
                return descriptor.value.apply(this, arguments);
            }
        };
    }
}