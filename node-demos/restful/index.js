const { URL } = require('url')
const querystring = require('querystring')
const http = require('http');
/**
 * 
 * 创建 http 服务，简单返回
 */
const server = http.createServer(async (req, res) => {
    // 获取 get 参数
    const url = new URL(req.url,`http://${req.headers.host}`)

    const pathname = url.pathname
    const paramStr = url.search.slice(1)
    console.log(querystring.parse(paramStr));
    param = url.searchParams;

    // 过滤非拉取用户信息请求
    if ('/v1/userinfos' != pathname) {
        return setResInfo(res, false, 'path not found');
    }
    // 参数校验，没有包含参数时返回错误
    if (!param || !param.get('user_ids')) {
        return setResInfo(res, false, 'params error');
    }
    // queryData
    // 从 db 查询数据，并获取，有可能返回空数据
    const userInfo = [{ name: 'abc' }];
    return setResInfo(res, true, 'success', userInfo);
});

server.listen(3000)
/**
 * 
 * @description 设置响应数据
 * @param object res http res
 * @param boolean ret boolean
 * @param string message string
 * @param object dataInfo object
 * @param int httpStatus
 */
function setResInfo(res, ret, message, dataInfo, httpStatus = 200) {
    let retInfo = {};
    if (!ret) {
        retInfo = {
            'ret': -1,
            'message': message ? message : 'error',
            'data': {}
        };
    } else {
        retInfo = {
            'ret': 0,
            'message': message ? message : 'success',
            'data': dataInfo ? dataInfo : {}
        };
    }
    res.writeHead(httpStatus, { 'Content-Type': 'text/plain' });
    res.write(JSON.stringify(retInfo));
    res.end();
    return;
}