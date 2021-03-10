import chalk from 'chalk'

import { ICountryCsv, TContinents, TCountries, TCountryCode, TLanguages } from '../src/types'

import continentsData from '../data/continents.json'
import countriesData from '../data/countries.json'
import languagesAllData from '../data/languages.json'
import countries2to3Data from '../data/countries2to3.json'
import countries3to2Data from '../data/countries3to2.json'

const continents = continentsData as TContinents
const countries = countriesData as TCountries
const languagesAll = languagesAllData as TLanguages
const countries2to3 = countries2to3Data as Record<TCountryCode, string>
const countries3to2 = countries3to2Data as Record<string, TCountryCode>

import {
  getCountryDataToCsv,
  getLanguagesInUse,
  getStringFromArray,
  getTitleCase,
  saveJsonFile,
  saveTextFile,
} from './utils'

const languagesInUse = getLanguagesInUse(countries, languagesAll)

const CONTINENTS = 'continents'
const COUNTRIES = 'countries'
const LANGUAGES = 'languages'

const ALL = '.all'

const CSV_EXT = 'csv'

const COMMA = '","'
const LF = '\n'
const QUOTE = '"'

// TODO: Split tasks into separate files

const minifyJsonData = () => {
  console.log(chalk.bold('\nMinifying JSON files:'))
  saveJsonFile(CONTINENTS, continents)
  saveJsonFile(COUNTRIES, countries)
  saveJsonFile(`${COUNTRIES}2to3`, countries2to3)
  saveJsonFile(`${COUNTRIES}3to2`, countries3to2)
  saveJsonFile(LANGUAGES, languagesInUse)
  saveJsonFile(`${LANGUAGES}${ALL}`, languagesAll)
}

const generateCsv = () => {
  console.log(chalk.bold('\nGenerating CSV:'))
  const countryCodeList = Object.keys(countries) as TCountryCode[]
  const csvHeader =
    QUOTE +
    'Code' +
    COMMA +
    Object.keys(countries.UA)
      .map((key) => getTitleCase(key))
      .join(COMMA) +
    QUOTE
  const csvData =
    csvHeader +
    LF +
    countryCodeList
      .map((code: TCountryCode) => {
        const { name, native, phone, continent, capital, currency, languages } = countries[code]
        const country: ICountryCsv = {
          capital,
          continent: continents[continent],
          currency,
          languages: getStringFromArray(languages),
          name,
          native,
          phone,
        }

        return QUOTE + code + COMMA + getCountryDataToCsv(country, COMMA) + QUOTE
      })
      .join(LF)

  saveTextFile(`${COUNTRIES}.${CSV_EXT}`, csvData)
}

/**
 * Task execution
 */

minifyJsonData()
generateCsv()
