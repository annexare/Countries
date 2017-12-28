// Type definitions for // name // version
// Project: https://github.com/annexare/Countries
// Definitions by: Dmytro <https://github.com/z-ax>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.1

export interface Country {
  /**
   * Capital in English.
   */
  capital: string;
  /**
   * Continent alpha-2 code.
   */
  continent: string;
  /**
   * Currency alpha-3 codes, comma-separated.
   */
  currency: string;
  /**
   * Country flag Emoji.
   */
  emoji: string;
  /**
   * Country flag Emoji string unicode characters space-separated, e.g. "U+1F1FA U+1F1E6".
   */
  emojiU: string;
  /**
   * List of Country's spoken Languages (alpha-2 codes).
   */
  languages: string[];
  /**
   * Country name in English.
   */
  name: string;
  /**
   * Country name written natively.
   */
  native: string;
  /**
   * Calling phone codes, comma-separated.
   */
  phone: string;
}

export interface Language {
  /**
   * Language name in English.
   */
  name: string;
  /**
   * Language name written natively.
   */
  native: string;
  /**
   * Specified if Language is RTL.
   */
  rtl?: number;
}

/**
 * Continents, key-value object (key is alpha-2 code).
 */
export const continents: {
  // continents
};

/**
 * Countries, key-value object (key is alpha-2 code, uppercase).
 */
export const countries: {
  // countries
};

/**
 * Languages in use only, key-value object (key is alpha-2 code).
 */
export const languages: {
  // languages
};

/**
 * Languages, key-value object (key is alpha-2 code).
 * A complete list including not used by Countries list.
 */
export const languagesAll: {
  // languagesAll
};

/**
 * Returns country flag Emoji string.
 */
export function getEmojiFlag(countryCode: string): string;

/**
 * Returns country flag Emoji string unicode characters space-separated, e.g. "U+1F1FA U+1F1E6".
 */
export function getUnicode(emoji: string): string;
