export { default as continents } from './continents.json'
export { default as countries } from './countries.emoji.json'
export { default as languages } from './languages.json'
export { default as languagesAll } from './languages.all.json'

// See: https://github.com/bestiejs/punycode.js#installation
// @ts-ignore
import { ucs2decode, ucs2encode } from 'punycode/punycode.es6'

const // "Regional Indicator Symbol Letter A" - "Latin Capital Letter A"
  UNICODE_BASE = 127462 - 'A'.charCodeAt(0),
  // Country code should contain exactly 2 uppercase characters from A..Z
  COUNTRY_CODE_REGEX = /^[A-Z]{2}$/

export const getEmojiFlag = (countryCode: string) => {
  if (!COUNTRY_CODE_REGEX.test(countryCode)) {
    return ''
  }

  return ucs2encode(countryCode.split('').map((letter) => UNICODE_BASE + letter.charCodeAt(0)))
}

export const getUnicode = (emoji: string) => {
  return ucs2decode(emoji)
    .map((code: number) => 'U+' + Number(code).toString(16).toUpperCase())
    .join(' ')
}
