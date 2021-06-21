// 读取配置的环境变量
const dotenv = require('dotenv')

function load(parseEnvObj, prefix = '') {
  const { parsed } = parseEnvObj
  if (parsed && parsed instanceof Object) {
    Object.getOwnPropertyNames(parsed).forEach((k) => {
      if (k.indexOf(prefix) === 0) {
        process.env[k] = parsed[k]
      } else {
        process.env[k] = undefined
      }
    })
  }
}
function loadEnv(options = {}) {
  const { prefix = '' } = options
  const baseDir = process.cwd()
  // .env
  load(dotenv.config({ path: `${baseDir}/.env` }), prefix)
  // .env.local
  load(dotenv.config({ path: `${baseDir}/.env.local` }), prefix)
  // .env.[mode]
  load(dotenv.config({ path: `${baseDir}/.env.${process.env.NODE_ENV}` }), prefix)
  // .env.[mode].local
  load(dotenv.config({ path: `${baseDir}/.env.${process.env.NODE_ENV}.local` }), prefix)
}

module.exports = loadEnv