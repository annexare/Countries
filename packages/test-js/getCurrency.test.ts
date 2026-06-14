import { expect, test } from 'bun:test'

import { countries } from '../countries/src/data/countries.ts'
import { currencies } from '../countries/src/data/currencies.ts'
import { getCurrency, getCurrencyByNumeric } from '../countries/src/getCurrency.ts'

test('getCurrency()', () => {
  const uah = getCurrency('UAH')

  expect(uah.code).toBe('UAH')
  expect(uah.name).toBe('Ukrainian Hryvnia')
  expect(uah.native).toBe('українська гривня')
  expect(uah.symbol).toBe('₴')
  expect(uah.numeric).toBe('980')
  expect(uah.decimals).toBe(2)
})

test('getCurrencyByNumeric()', () => {
  expect(getCurrencyByNumeric('840')?.code).toBe('USD')
  // Accepts a number and zero-pads it (8 -> '008').
  expect(getCurrencyByNumeric(840)?.code).toBe('USD')
  expect(getCurrencyByNumeric(8)?.code).toBe('ALL')
  expect(getCurrencyByNumeric('392')?.code).toBe('JPY')
  // Active code wins over a withdrawn one sharing a numeric (532: XCG, not ANG).
  expect(getCurrencyByNumeric('532')?.code).toBe('XCG')
  expect(getCurrencyByNumeric('000')).toBeUndefined()
  // Non-numeric / prototype keys must not resolve to inherited properties.
  expect(getCurrencyByNumeric('__proto__')).toBeUndefined()
  expect(getCurrencyByNumeric('constructor')).toBeUndefined()
})

test('currencies data integrity', () => {
  for (const currency of Object.values(currencies)) {
    expect(currency.numeric).toMatch(/^\d{3}$/)
    expect(typeof currency.decimals).toBe('number')
    // Require at least one visible (non-whitespace, non-zero-width) code point.
    expect(currency.name).toMatch(/[^\p{White_Space}\p{Cf}\p{Cc}]/u)
    expect(currency.native).toMatch(/[^\p{White_Space}\p{Cf}\p{Cc}]/u)
    expect(currency.symbol).toMatch(/[^\p{White_Space}\p{Cf}\p{Cc}]/u)
    expect(currency.symbolNative).toMatch(/[^\p{White_Space}\p{Cf}\p{Cc}]/u)
  }
})

test('every country currency exists in the currencies table', () => {
  const missing = new Set<string>()
  for (const { currency } of Object.values(countries)) {
    for (const code of currency) {
      if (!(code in currencies)) {
        missing.add(code)
      }
    }
  }

  expect([...missing]).toEqual([])
})
