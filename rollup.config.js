const jsonPlugin = require('@rollup/plugin-json')
const { terser: terserPlugin } = require('rollup-plugin-terser')
const typescriptPlugin = require('rollup-plugin-typescript2')
const pkg = require('./package.json')
const banner = `/*! ${pkg.name} v${pkg.version} by Annexare | ${pkg.license} */`

const dataList = ['countries.2to3', 'countries.3to2', 'countries.emoji']

const getConfig = (inputFile, outFile, moduleName) => ({
  input: `src/${inputFile}.ts`,
  treeshake: true,
  output: {
    amd: {
      id: moduleName,
    },
    banner,
    file: `dist/${outFile}.min.js`,
    format: 'umd',
    name: moduleName,
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
})

const getModuleName = (fileName) => {
  const result = fileName.toLowerCase().split(/[\s\.]+/)

  for (let i = 0; i < result.length; i++) {
    result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1)
  }

  return result.join('')
}

module.exports = [
  getConfig('index', 'index.es5', 'Countries'),
  ...dataList.map((dataName) =>
    getConfig(dataName + '.data', 'more/' + dataName, getModuleName(dataName))
  ),
]
