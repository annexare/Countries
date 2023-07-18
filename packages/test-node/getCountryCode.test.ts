import { getCountryCode } from 'src/getCountryCode.ts'

test('getCountryCode()', () => {
  expect(getCountryCode('Ukraine')).toBe('UA')
  expect(getCountryCode('Україна')).toBe('UA')
})
