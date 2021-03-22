declare module 'countries-list' {
  export const continents: TContinents
  export const countries: TCountries
  export const languages: TLanguages
  export const languagesAll: TLanguages

  export function getEmojiFlag(countryCode: TCountryCode): string
}
