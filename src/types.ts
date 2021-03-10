import continents from '../data/continents.json'
import countries from '../data/countries.json'
import languages from '../data/languages.json'

export type TContinentCode = keyof typeof continents
export type TCountryCode = keyof typeof countries
export type TLanguageCode = keyof typeof languages

export interface ICountry {
  /**
   * Capital in English.
   */
  capital: string
  /**
   * Continent alpha-2 code.
   */
  continent: TContinentCode
  /**
   * Currency alpha-3 codes, comma-separated.
   * TODO: Refactor to array of currencies.
   */
  currency: string
  /**
   * List of Country's spoken Languages (alpha-2 codes).
   */
  languages: TLanguageCode[]
  /**
   * Country name in English.
   */
  name: string
  /**
   * Country name written natively.
   */
  native: string
  /**
   * Calling phone codes, comma-separated.
   */
  phone: string
}

export interface ICountryCsv {
  /**
   * Capital in English.
   */
  capital: string
  /**
   * Continent name.
   */
  continent: string
  /**
   * Currency alpha-3 codes, comma-separated.
   */
  currency: string
  /**
   * List of Country's spoken Languages (alpha-2 codes), comma-separated.
   */
  languages: string
  /**
   * Country name in English.
   */
  name: string
  /**
   * Country name written natively.
   */
  native: string
  /**
   * Calling phone codes, comma-separated.
   */
  phone: string
  /**
   * Country flag Emoji.
   */
  emoji?: string
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
export type TLanguages = Record<TLanguageCode, ILanguage>
