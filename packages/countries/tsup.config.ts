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
  outDir: '../../dist',
  outExtension: ({ format }) => ({
    js: `${format === 'iife' ? '.iife' : ''}.min.${format === 'esm' ? 'mjs' : 'js'}`,
  }),
  sourcemap: false,
  splitting: false,
  target: 'es6',
})
