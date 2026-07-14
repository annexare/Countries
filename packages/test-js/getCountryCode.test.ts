import { expect, test } from 'bun:test'

import { getCountryCode } from '../countries/src/getCountryCode.ts'

test('getCountryCode()', () => {
  expect(getCountryCode('Ukraine')).toBe('UA')
  expect(getCountryCode('uKraine')).toBe('UA')
  expect(getCountryCode('Україна')).toBe('UA')
  expect(getCountryCode('уКраїна')).toBe('UA')

  expect(getCountryCode('Ukrain')).toBe(false)
  expect(getCountryCode('Ukraine1')).toBe(false)
  expect(getCountryCode('Unknown')).toBe(false)

  // Should not care about leading/trailing spaces
  expect(getCountryCode(' Ukraine ')).toBe('UA')

  // More unicode tests
  expect(getCountryCode('မြန်မာ')).toBe('MM')
  expect(getCountryCode('澳門')).toBe('MO')

  // Special symbols
  expect(getCountryCode('Myanmar')).toBe('MM')
  expect(getCountryCode('Cocos (Keeling) Islands')).toBe('CC')
})

test('getCountryCode() resolves ISO short names', () => {
  expect(getCountryCode('Czechia')).toBe('CZ')
  expect(getCountryCode('Česko')).toBe('CZ')
  expect(getCountryCode('Cabo Verde')).toBe('CV')

  // Previous long-form names now resolve via aliases
  expect(getCountryCode('Czech Republic')).toBe('CZ')
  expect(getCountryCode('Česká republika')).toBe('CZ')
  expect(getCountryCode('Cape Verde')).toBe('CV')
})
