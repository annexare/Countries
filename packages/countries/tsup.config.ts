import path from 'path'
import { defineConfig, type Options } from 'tsup'
import pkg from './package.json' with { type: 'json' }

const shared: Options = {
  banner: () => ({ js: `/*! countries-list v${pkg.version} by Annexare | MIT */` }),
  clean: false,
  dts: false,
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
    js: `${format === 'iife' ? '.iife' : ''}.js`,
  }),
  sourcemap: false,
  splitting: false,
  target: 'esnext',
}

export default defineConfig([
  {
    ...shared,
    entry: ['src/index.ts'],
    format: ['cjs', 'esm', 'iife'],
    globalName: 'Countries',
  },
  // Opt-in `countries-list/currencies` subpath — ESM/CJS only, kept out of the main
  // bundle and the IIFE global so the default bundle size is unaffected.
  {
    ...shared,
    entry: ['src/currencies.ts'],
    format: ['cjs', 'esm'],
  },
])
