import { TCountryCode } from './types.ts'

// "Regional Indicator Symbol Letter A" - "Latin Capital Letter A"
const UNICODE_BASE = 127462 - 'A'.charCodeAt(0)

// Country code should contain exactly 2 uppercase characters from A..Z
const COUNTRY_CODE_REGEX = /^[A-Z]{2}$/

export const getEmojiFlag = (countryCode: TCountryCode): string =>
  COUNTRY_CODE_REGEX.test(countryCode)
    ? String.fromCodePoint(
        ...countryCode.split('').map((letter) => UNICODE_BASE + letter.toUpperCase().charCodeAt(0))
      )
    : ''
