import type { continents } from './data/continents.ts'
import type { countries } from './data/countries.ts'
import type { currencies } from './data/currencies.ts'
import type { languages } from './data/languages.ts'

export type TContinentCode = keyof typeof continents
export type TCountryCode = keyof typeof countries
export type TCurrencyCode = keyof typeof currencies
export type TLanguageCode = keyof typeof languages

export interface ICountry {
  /**
   * Alternative and former names (previous ISO short names, common short forms),
   * matched by `getCountryCode` for backward-compatible reverse lookup.
   */
  alias?: string[]
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
  currency: TCurrencyCode[]
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

export interface ICurrency {
  /**
   * Currency name in English.
   */
  name: string
  /**
   * Currency name in the native language (Unicode CLDR, home locale).
   */
  native: string
  /**
   * Symbol for UI, from Unicode CLDR (narrow form).
   * Falls back to the ISO code where no distinct Latin symbol exists (e.g. 'CHF', 'KWD').
   */
  symbol: string
  /**
   * Symbol as used in the currency's home locale, from Unicode CLDR.
   */
  symbolNative: string
  /**
   * ISO 4217 three-digit numeric code, zero-padded (e.g. '980', '008').
   */
  numeric: string
  /**
   * Minor unit: number of decimal places (ISO 4217). 0 when there is no minor unit.
   */
  decimals: number
  /**
   * Set when the code is withdrawn from the current ISO 4217 list but still
   * referenced by country data (e.g. ANG, SLL, USS).
   */
  withdrawn?: boolean
}

export interface ICountryData extends ICountry {
  iso2: TCountryCode
  iso3: string
}

export interface ICurrencyData extends ICurrency {
  code: TCurrencyCode
}

export type TContinents = Record<TContinentCode, string>
export type TCountries = Record<TCountryCode, ICountry>
export type TCountryToString = Record<TCountryCode, string>
export type TStringToCountry = Record<string, TCountryCode>
export type TCurrencies = Record<TCurrencyCode, ICurrency>
export type TCurrencyToString = Record<TCurrencyCode, string>
export type TLanguages = Record<TLanguageCode, ILanguage>
export type TLanguageToString = Record<TLanguageCode, string>
