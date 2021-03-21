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
