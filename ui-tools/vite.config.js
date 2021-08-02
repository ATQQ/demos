const path = require('path')
const pkg = require('./package.json')

console.log(pkg.version)

module.exports = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      outDir: `dist/${pkg.version}/`,
      name: 'Onion',
      formats: ['umd', 'cjs', 'es', 'iife'],
    },
  },
}
