const DEFAULT_MSG = 'This function will be removed in future versions.';

interface Options{
    url?:string
}

export default function deprecate(msg = DEFAULT_MSG, options:Options = {}) {
    return function (target, key, descriptor) {
        // 如果被装饰对象不是函数，直接抛出错误
        if (typeof descriptor.value !== 'function') {
            throw new SyntaxError('Only functions can be marked as deprecated');
        }

        // 生成方法的签名（反应来自与xx类xx方法）
        const methodSignature = `${target.constructor.name}#${key}`;

        // 如果有线上地址的文档描述原因，则展示一下这个地址
        if (options.url) {
            msg += `\n\n    See ${options.url} for more details.\n\n`;
        }

        return {
            ...descriptor,
            value: function deprecationWrapper() {
                console.warn(`DEPRECATION ${methodSignature}: ${msg}`);
                return descriptor.value.apply(this, arguments);
            }
        };
    }
}