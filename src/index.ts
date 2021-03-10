import { TContinents, TCountries, TCountryCode, TLanguages } from './types'

import continentsData from '../dist/continents.json'
import countriesData from '../dist/countries.emoji.json'
import languagesData from '../dist/languages.json'
import languagesAllData from '../dist/languages.all.json'

export const continents = (continentsData as TContinents)
export const countries = (countriesData as TCountries)
export const languages = (languagesData as TLanguages)
export const languagesAll = (languagesAllData as TLanguages)

const // "Regional Indicator Symbol Letter A" - "Latin Capital Letter A"
  UNICODE_BASE = 127462 - 'A'.charCodeAt(0),
  // Country code should contain exactly 2 uppercase characters from A..Z
  COUNTRY_CODE_REGEX = /^[A-Z]{2}$/

export const getEmojiFlag = (countryCode: TCountryCode): string =>
  COUNTRY_CODE_REGEX.test(countryCode)
    ? String.fromCodePoint(
        ...countryCode.split('').map((letter) => UNICODE_BASE + letter.toUpperCase().charCodeAt(0))
      )
    : ''
