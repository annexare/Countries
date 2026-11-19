import chalk from 'chalk'
import * as currenciesExports from 'countries/currencies.ts'
import * as indexExports from 'countries/index.ts'

import { saveTextFile } from 'scripts/utils.ts'
import pkg from '../../countries/package.json' with { type: 'json' }

const BANNER = `/*! countries-list v${pkg.version} by Annexare | MIT */`
const GLOBAL_NAME = 'Countries'
const SRC = '../countries/src/'
const USE_STRICT = '"use strict";'

const ENTRIES = {
  currencies: currenciesExports,
  index: indexExports,
}

const bundle = async (entry: string, format: 'cjs' | 'esm'): Promise<string> => {
  const { outputs } = await Bun.build({
    entrypoints: [`${SRC}${entry}.ts`],
    format,
    minify: true,
  })

  return (await outputs[0].text()).trim()
}

const saveBundle = (fileName: string, code: string): void => {
  if (!saveTextFile(fileName, code)) {
    throw new Error(`Could not save bundle: "${fileName}"`)
  }
}

export const buildBundles = async (): Promise<void> => {
  console.log(chalk.bold('\nBuilding bundles:\n'))

  for (const [entry, entryExports] of Object.entries(ENTRIES)) {
    const esm = await bundle(entry, 'esm')
    saveBundle(`mjs/${entry}.js`, `${BANNER}\n${esm}`)

    const cjs = await bundle(entry, 'cjs')
    // Never executed: it lets Node detect the named exports when this file is imported from ESM.
    const namedExportsHint = `0&&(module.exports={${Object.keys(entryExports).join(',')}});`
    saveBundle(`cjs/${entry}.js`, `${BANNER}\n${USE_STRICT}${cjs}\n${namedExportsHint}`)

    if (entry === 'index') {
      // Bun cannot name an IIFE global, so the CommonJS bundle is wrapped to expose its exports.
      const iife = `var ${GLOBAL_NAME}=(()=>{var module={exports:{}};${cjs}\nreturn module.exports})();`
      saveBundle('index.iife.js', `${BANNER}\n${USE_STRICT}${iife}`)
    }
  }
}
