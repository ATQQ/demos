import { $ } from 'bun'
// user config
const originName = 'demos'

// not care
const compressPkgName = `${originName}.tar.gz`
const user = 'root'
const origin = 'sugarat.top'
const fullOrigin = `${originName}.${origin}`
const baseServerDir = '/www/wwwroot'
const destDir = ''

await $`npm run build`

console.log('压缩生成', compressPkgName);
await $`tar -zvcf ${compressPkgName} dist`

console.log('上传压缩包到服务器');
await $`scp ${compressPkgName} ${user}@${origin}:./`
await $`rm -rf ${compressPkgName}`

console.log('解压到服务器');
await $`ssh -p22 ${user}@${origin} "tar -xf ${compressPkgName} -C ${baseServerDir}/${fullOrigin}/${destDir}"`
