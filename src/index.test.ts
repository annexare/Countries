import { continents, countries, languages, languagesAll, getEmojiFlag } from './index'
import { TCountryCode } from './types'

import countries2to3 from '../dist/countries2to3.min.json'
import countries3to2 from '../dist/countries3to2.min.json'

const TYPE_OBJECT = 'object'
const TYPE_STRING = 'string'
const TEST_COUNTRY_CODE: TCountryCode = 'UA'
const TEST_EMOJI = '🇺🇦'

const expectObjectOf = (data: any, dataType: string) => () => {
  expect(typeof data).toBe(TYPE_OBJECT)

  Object.keys(data).forEach((key) => {
    expect(data).toHaveProperty(key)
    expect(typeof data[key]).toBe(dataType)
  })
}

const expectToHaveKeysOf = (data: any, keyList: string[], dataType: string) => () => {
  keyList.forEach((key) => {
    expect(typeof data[key]).toBe(dataType)
  })

  Object.keys(data).forEach((dataKey) => {
    expect(keyList.includes(dataKey)).toBe(true)
  })
}

const countryCodeList = Object.keys(countries)

test('"continents" has proper type and structure', expectObjectOf(continents, TYPE_STRING))
test('"countries" has proper type and structure', expectObjectOf(countries, TYPE_OBJECT))
test('"languages" has proper type and structure', expectObjectOf(languages, TYPE_OBJECT))
test('"languagesAll" has proper type and structure', expectObjectOf(languagesAll, TYPE_OBJECT))

test('"getEmojiFlag()" empty country code', () => expect(getEmojiFlag('' as TCountryCode)).toBe(''))
test('"getEmojiFlag()" UA country code properly', () =>
  expect(getEmojiFlag(TEST_COUNTRY_CODE)).toBe(TEST_EMOJI))

test('"countries2to3" has proper type and structure', expectObjectOf(countries2to3, TYPE_STRING))
test(
  '"countries2to3" has proper list of keys',
  expectToHaveKeysOf(countries2to3, countryCodeList, TYPE_STRING)
)

test('"countries3to2" has proper type and structure', expectObjectOf(countries3to2, TYPE_STRING))
test(
  '"countries3to2" has proper list of keys',
  expectToHaveKeysOf(countries3to2, Object.values(countries2to3), TYPE_STRING)
)
