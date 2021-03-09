export { default as continents } from './continents.json'
export { default as countries } from './countries.emoji.json'
export { default as languages } from './languages.json'
export { default as languagesAll } from './languages.all.json'

const // "Regional Indicator Symbol Letter A" - "Latin Capital Letter A"
  UNICODE_BASE = 127462 - 'A'.charCodeAt(0),
  // Country code should contain exactly 2 uppercase characters from A..Z
  COUNTRY_CODE_REGEX = /^[A-Z]{2}$/

export const getEmojiFlag = (countryCode: string): string => {
  if (!COUNTRY_CODE_REGEX.test(countryCode)) {
    return ''
  }

  return String.fromCodePoint(
    ...countryCode.split('').map((letter) => UNICODE_BASE + letter.toUpperCase().charCodeAt(0))
  )
}
