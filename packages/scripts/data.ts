import { getLanguagesInUse } from 'scripts/utils.ts'

export { default as continents } from 'src/data/continents.ts'
import countries from 'src/data/countries.ts'
import languages from 'src/data/languages.ts'

export { countries, languages }

export const languagesInUse = getLanguagesInUse(countries, languages)

export { default as countries2to3 } from 'src/data/countries.2to3.ts'
export { default as countries3to2 } from 'src/data/countries.3to2.ts'
