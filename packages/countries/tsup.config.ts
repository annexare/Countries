import path from 'path'
import { defineConfig } from 'tsup'
import { default as pkg } from './package.json' assert { type: 'json' }

export default defineConfig({
  banner: () => ({ js: `/*! countries-list v${pkg.version} by Annexare | MIT */` }),
  clean: false,
  dts: false,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  globalName: 'Countries',
  minify: true,
  esbuildOptions(options, { format }) {
    if (format === 'iife' || format === 'cjs') {
      options.outdir = `../../dist${format === 'cjs' ? '/cjs' : ''}`
      options.tsconfig = path.resolve('./tsconfig-cjs.json')
      options.target = 'es6'
    } else {
      options.outdir = '../../dist/mjs'
    }
  },
  outExtension: ({ format }) => ({
    // js: `${format === 'iife' ? '.iife' : ''}.min.${format === 'esm' ? 'mjs' : 'js'}`,
    js: `${format === 'iife' ? '.iife' : ''}.js`,
  }),
  sourcemap: false,
  splitting: false,
  target: 'esnext',
})
