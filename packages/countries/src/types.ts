import continents from 'src/data/continents.ts'
import countries from 'src/data/countries.ts'
import languages from 'src/data/languages.ts'

export type TContinentCode = keyof typeof continents
export type TCountryCode = keyof typeof countries
export type TLanguageCode = keyof typeof languages

export interface ICountry {
  /**
   * Capital in English.
   */
  capital: string
  /**
   * Main continent alpha-2 code.
   */
  continent: TContinentCode
  /**
   * Continent list alpha-2 codes (for transcontinental countries).
   */
  continents?: TContinentCode[]
  /**
   * Currency alpha-3 codes.
   */
  currency: string[]
  /**
   * List of Country's spoken Languages (alpha-2 codes).
   */
  languages: TLanguageCode[]
  /**
   * Country name in English.
   */
  name: string
  /**
   * Country name in the native language.
   */
  native: string
  /**
   * Specified in cases when entity is currently a part of another one.
   */
  parent?: TCountryCode
  /**
   * Calling phone codes.
   */
  phone: number[]
}

export interface ILanguage {
  /**
   * Language name in English.
   */
  name: string
  /**
   * Language name written natively.
   */
  native: string
  /**
   * Specified if Language is RTL.
   */
  rtl?: number
}

export type TContinents = Record<TContinentCode, string>
export type TCountries = Record<TCountryCode, ICountry>
export type TCountryToString = Record<TCountryCode, string>
export type TStringToCountry = Record<string, TCountryCode>
export type TLanguages = Record<TLanguageCode, ILanguage>
export type TLanguageToString = Record<TLanguageCode, string>
