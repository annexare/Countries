// biome-ignore-all lint/performance/noDynamicNamespaceImportAccess: test file

// Validates the published bundles under the real Node.js runtime (CommonJS + ESM
// loaders), which the Bun-run test-js suite does not exercise. Imports only built
// dist artifacts — never the TS source — so it mirrors what a Node consumer resolves.

import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { describe, test } from 'node:test'

const require = createRequire(import.meta.url)

const expectedFns = ['getCountryCode', 'getCountryData', 'getCountryDataList', 'getEmojiFlag']
const expectedData = ['continents', 'countries', 'languages']

describe('dist under Node.js', () => {
  test('CJS main bundle loads via require()', () => {
    const cjs = require('../../dist/cjs/index.js')

    for (const fn of expectedFns) {
      assert.equal(typeof cjs[fn], 'function', `missing function: ${fn}`)
    }
    for (const key of expectedData) {
      assert.equal(typeof cjs[key], 'object', `missing data: ${key}`)
    }
    assert.equal(cjs.getEmojiFlag('UA'), '🇺🇦')
  })

  test('ESM main bundle loads via import()', async () => {
    const mjs = await import('../../dist/mjs/index.js')

    for (const fn of expectedFns) {
      assert.equal(typeof mjs[fn], 'function', `missing function: ${fn}`)
    }
    for (const key of expectedData) {
      assert.equal(typeof mjs[key], 'object', `missing data: ${key}`)
    }
    assert.equal(mjs.getEmojiFlag('UA'), '🇺🇦')
  })

  test('CJS currencies subpath loads via require()', () => {
    const cjs = require('../../dist/cjs/currencies.js')

    assert.equal(typeof cjs.getCurrency, 'function')
    assert.equal(typeof cjs.getCurrencyByNumeric, 'function')
    assert.equal(cjs.getCurrency('UAH').numeric, '980')
  })

  test('ESM currencies subpath loads via import()', async () => {
    const mjs = await import('../../dist/mjs/currencies.js')

    assert.equal(typeof mjs.getCurrency, 'function')
    assert.equal(mjs.getCurrencyByNumeric('840')?.code, 'USD')
  })
})
