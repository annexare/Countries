// Type definitions for countries-list
// Project: countries-list
// Definitions by: dmythro <https://github.com/dmythro>

/// <reference path="index.d.ts" />

export const continents: TContinents
export const countries: TCountries
export const languages: TLanguages
export const languagesAll: TLanguages

export function getEmojiFlag(countryCode: TCountryCode): string

declare global {
  interface Window {
    Countries: {
      continents: TContinents,
      countries: TCountries,
      languages: TLanguages,
      getEmojiFlag(countryCode: TCountryCode): string,
    }
  }
}
