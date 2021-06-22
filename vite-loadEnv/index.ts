import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import nodepath from 'path'
import fs from 'fs'

type Record<K extends keyof any, T> = {
  [P in K]: T;
};

interface Options {
  // 模式
  mode?: string
  // 环境变量配置文件所在目录
  envDir?: string
  // 允许前缀
  prefix?: string
  // 不写入到process.env上
  ignoreProcessEnv?: boolean
}

const defaultOptions: Options = {
  mode: 'development',
  envDir: process.cwd(),
  prefix: '',
  ignoreProcessEnv: false
}
export function loadEnv(options?: Options): Record<string, string> {
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

  const env: Record<string, string> = {}

  const envFiles = [
    /** mode local file */ `.env.${mode}.local`,
    /** mode file */ `.env.${mode}`,
    /** local file */ `.env.local`,
    /** default file */ `.env`
  ]

  for (const key in process.env) {
    if (key.startsWith(prefix) && env[key] === undefined) {
      env[key] = process.env[key] as string
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
      } as any)

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