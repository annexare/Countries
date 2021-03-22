// Type definitions for countries-list
// Project: countries-list
// Definitions by: dmythro <https://github.com/dmythro>

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
      languagesAll: TLanguages,
      getEmojiFlag(countryCode: TCountryCode): string,
    }
  }
}
