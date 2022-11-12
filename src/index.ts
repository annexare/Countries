import { TContinents, TCountries, TLanguages } from './types'

import continentsData from '../dist/continents.min.json'
import countriesData from '../dist/countries.min.json'
import languagesData from '../dist/languages.min.json'
import languagesAllData from '../dist/languages.all.min.json'

export const continents = continentsData as TContinents
export const countries = countriesData as TCountries
export const languages = languagesData as TLanguages
export const languagesAll = languagesAllData as TLanguages

export { getEmojiFlag } from './getEmojiFlag'
export { Continent } from './continent-enum'
