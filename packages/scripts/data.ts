import { getCurrenciesInUse, getLanguagesInUse } from 'scripts/utils.ts'

export { continents } from 'countries/data/continents.ts'

import { countries } from 'countries/data/countries.ts'
import { currencies } from 'countries/data/currencies.ts'
import { languages } from 'countries/data/languages.ts'

export { countries, currencies, languages }

export const currenciesInUse = getCurrenciesInUse(countries, currencies)
export const languagesInUse = getLanguagesInUse(countries, languages)

export { countries2to3 } from 'countries/data/countries.2to3.ts'
export { countries3to2 } from 'countries/data/countries.3to2.ts'
