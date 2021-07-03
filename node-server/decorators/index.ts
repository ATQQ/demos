import path from 'path'

export function Router(prefix = '') {
    return function (target) {
        target.prototype._prefix = prefix;
        target.prototype._routes = []
    };
}

export function Route(method: Method, path: string, options?: any) {
    return function (target, key, descriptor) {
        if (typeof target[key] !== 'function') {
            throw new TypeError('not function')
        }
        const fn = descriptor.value
        target[key]._route = {
            method,
            path,
            // 避免循环引用
            callback: fn.bind(this),
            options
        }
    }
}

export function GetRoute(path, options?: any) {
    return Route('get', path, options)
}

export function PostRoute(path, options?: any) {
    return Route('post', path, options)
}

export function DelRoute(path, options?: any) {
    return Route('delete', path, options)
}

export function PutRoute(path, options?: any) {
    return Route('put', path, options)
}

type Method = 'get' | 'post' | 'put' | 'delete' | 'option'

type Callback = (req: any, res: any) => void

export interface Route {
    method: Method
    path: string
    callback: Callback
    options?: any
}

export class iRouter {
    _prefix?: string;
    getRoutes(): Route[] {
        const keys: string[] = Object.keys(this.__proto__)
        const prefix = this._prefix ?? ''
        const routes = keys.reduce<Route[]>((pre, k) => {
            const _route: Route = this[k]._route
            if (_route) {
                _route.path = path.join(prefix, _route.path)
                pre.push(_route)
            }
            return pre
        }, [])
        return routes
    }
    private __proto__(__proto__: any): string[] {
        throw new Error("Method not implemented.");
    }
}
