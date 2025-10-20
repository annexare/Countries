import { expect, test } from 'bun:test'

import { getCountryCode } from 'src/getCountryCode.ts'

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
  expect(getCountryCode('Myanmar (Burma)')).toBe('MM')
  expect(getCountryCode('Cocos (Keeling) Islands')).toBe('CC')
})
