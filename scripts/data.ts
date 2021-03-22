import { TContinents, TCountries, TCountryCode, TLanguages } from '../src/types'
import { getLanguagesInUse } from './utils'

import continentsData from '../data/continents.json'
import countriesData from '../data/countries.json'
import languagesAllData from '../data/languages.json'
import countries2to3Data from '../data/countries.2to3.json'
import countries3to2Data from '../data/countries.3to2.json'

export const continents = continentsData as TContinents
export const countries = countriesData as TCountries
export const languagesAll = languagesAllData as TLanguages
export const countries2to3 = countries2to3Data as Record<TCountryCode, string>
export const countries3to2 = countries3to2Data as Record<string, TCountryCode>

export const languagesInUse = getLanguagesInUse(countries, languagesAll)
