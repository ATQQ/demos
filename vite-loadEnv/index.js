const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const nodepath = require('path')
const fs = require('fs')

const defaultOptions = {
  mode: 'development',
  envDir: process.cwd(),
  prefix: '',
  ignoreProcessEnv: false
}
function loadEnv(options){
  // 设置默认值
  options = Boolean(options) ? options : {}
  Object.assign(options, defaultOptions, options)
  const { mode, envDir, prefix, ignoreProcessEnv } = options
  if (mode === 'local') {
    throw new Error(
      `"local" cannot be used as a mode name because it conflicts with ` +
      `the .local postfix for .env files.`
    )
  }

  const env = {}

  const envFiles = [
    /** mode local file */ `.env.${mode}.local`,
    /** mode file */ `.env.${mode}`,
    /** local file */ `.env.local`,
    /** default file */ `.env`
  ]

  for (const key in process.env) {
    if (key.startsWith(prefix) && env[key] === undefined) {
      env[key] = process.env[key]
    }
  }

  for (const file of envFiles) {
    const fullpath = nodepath.join(envDir, file)
    const path = fs.existsSync(fullpath) ? fullpath : undefined

    if (path) {
      const parsed = dotenv.parse(fs.readFileSync(path), {
        debug: !!process.env.DEBUG || undefined
      })

      dotenvExpand({
        parsed,
        ignoreProcessEnv
      })

      for (const [key, value] of Object.entries(parsed)) {
        if (key.startsWith(prefix) && env[key] === undefined) {
          env[key] = value
        } else if (key === 'NODE_ENV') {
          process.env.NODE_ENV = value
        }
      }
    }
  }
  return env
}
module.exports = {
    loadEnv
}