import { getLanguagesInUse } from 'scripts/utils.ts'

export { default as continents } from 'countries/data/continents.ts'
import countries from 'countries/data/countries.ts'
import languages from 'countries/data/languages.ts'

export { countries, languages }

export const languagesInUse = getLanguagesInUse(countries, languages)

export { default as countries2to3 } from 'countries/data/countries.2to3.ts'
export { default as countries3to2 } from 'countries/data/countries.3to2.ts'
