const jsonPlugin = require('@rollup/plugin-json')
const { terser: terserPlugin } = require('rollup-plugin-terser')
const typescriptPlugin = require('rollup-plugin-typescript2')
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
    jsonPlugin({
      compact: true,
    }),
    typescriptPlugin(),
    terserPlugin({
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
