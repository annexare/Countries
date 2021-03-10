const json = require('@rollup/plugin-json')
const typescript = require('@rollup/plugin-typescript')
const pkg = require('./package.json')
const banner = `/*! ${pkg.name} v${pkg.version} by Annexare | ${pkg.license} */`

module.exports = {
  input: 'src/index.ts',
  treeshake: true,
  output: {
    amd: {
      id: 'Countries',
    },
    banner,
    file: 'dist/index.es5.min.js',
    format: 'umd',
    name: 'Countries',
  },
  plugins: [
    json({
      compact: true,
    }),
    typescript(),
  ],
}
