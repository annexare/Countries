import { defineConfig } from 'tsup'
import * as pkg from './package.json' // assert { type: 'json' }

export default defineConfig({
  banner: () => ({ js: `/*! countries-list v${pkg.version} by Annexare | MIT */` }),
  clean: false,
  dts: false,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  globalName: 'Countries',
  minify: true,
  outDir: '../../dist',
  outExtension: ({ format }) => ({
    js: `.${format === 'esm' ? 'mjs' : format === 'iife' ? 'iife.js' : 'js'}`,
  }),
  sourcemap: true,
  splitting: false,
  target: 'es6',
})
