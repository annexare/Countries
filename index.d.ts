// Type definitions for // name // version
// Project: https://github.com/annexare/Countries
// Definitions by: Dmytro <https://github.com/dmythro>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.1

declare interface ICountry {
  /**
   * Capital in English.
   */
  capital: string
  /**
   * Continent alpha-2 code.
   */
  continent: string
  /**
   * Currency alpha-3 codes, comma-separated.
   */
  currency: string
  /**
   * List of Country's spoken Languages (alpha-2 codes).
   */
  languages: string[]
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

declare interface ICountryEmoji extends ICountry {
  /**
   * Country flag Emoji.
   */
  emoji?: string
}

declare interface ILanguage {
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
