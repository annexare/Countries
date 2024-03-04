import { continents } from './data/continents.ts'
import { countries } from './data/countries.ts'
import { languages } from './data/languages.ts'

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
   * Example: Åland is an autonomous and demilitarised region of Finland and has own ISO code.
   * @see: https://en.wikipedia.org/wiki/Åland
   * @todo: Type should be TCountryCode, but need to resolve cyclic referencing on dynamically generated type.
   */
  partOf?: string
  /**
   * Calling phone codes.
   */
  phone: number[]
  /**
   * Specified in cases when entity is not a part of the main ISO 3166-1 standart, but a User assigned code.
   * @see: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#User-assigned_code_elements
   */
  userAssigned?: boolean
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

export interface ICountryData extends ICountry {
  iso2: TCountryCode
  iso3: string
}

export type TContinents = Record<TContinentCode, string>
export type TCountries = Record<TCountryCode, ICountry>
export type TCountryToString = Record<TCountryCode, string>
export type TStringToCountry = Record<string, TCountryCode>
export type TLanguages = Record<TLanguageCode, ILanguage>
export type TLanguageToString = Record<TLanguageCode, string>
