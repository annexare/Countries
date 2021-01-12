const json = require('@rollup/plugin-json')
const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const pkg = require('./package.json')
const banner = `/*! ${pkg.name} v${pkg.version} by Annexare | ${pkg.license} */`

module.exports = {
  input: 'dist/index.js',
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
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
    }),
    terser({
      ecma: 5,
      format: {
        comments: function (node, comment) {
          if (comment.type == 'comment2') {
            // multiline comment
            return /countries-list|@preserve|@license|@cc_on/i.test(comment.value)
          }
        },
      },
      ie8: true,
    }),
  ],
}
