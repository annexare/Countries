// biome-ignore-all lint/performance/noDynamicNamespaceImportAccess: test file

import { describe, expect, test } from 'bun:test'
import fs from 'node:fs'
import path from 'node:path'

// @ts-expect-error — built artifact, no types resolved at this path
import * as distCurrencies from '../../dist/mjs/currencies.js'
import * as source from '../countries/src/currencies.ts'

const distDir = path.resolve(import.meta.dir, '../../dist')

describe('dist currencies subpath', () => {
  test('built ESM bundle re-exports the public currencies API', () => {
    for (const name of ['currencies', 'getCurrency', 'getCurrencyByNumeric'] as const) {
      expect(Object.hasOwn(distCurrencies, name)).toBe(true)
    }
  })

  test('built bundle currency keys match source', () => {
    expect(Object.keys(distCurrencies.currencies)).toEqual(Object.keys(source.currencies))
  })

  test('getCurrency / getCurrencyByNumeric resolve from the built bundle', () => {
    expect(distCurrencies.getCurrency('UAH').numeric).toBe('980')
    expect(distCurrencies.getCurrencyByNumeric('840')?.code).toBe('USD')
  })

  test('currency dataset is kept out of the main bundle (opt-in only)', () => {
    // `symbolNative` exists only on currency records; finding it in the default
    // bundle would mean the currencies dataset leaked in and inflated its size.
    for (const file of ['index.iife.js', 'mjs/index.js', 'cjs/index.js']) {
      const bundle = fs.readFileSync(path.join(distDir, file), { encoding: 'utf-8' })
      expect(bundle.includes('symbolNative')).toBe(false)
    }
  })
})
