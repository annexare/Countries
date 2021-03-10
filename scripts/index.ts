import fs from 'fs'

import { ICountryCsv, TContinents, TCountries, TCountryCode, TLanguages } from '../src/types'

import continentsData from '../data/continents.json'
import countriesData from '../data/countries.json'
import languagesAllData from '../data/languages.json'

const continents = continentsData as TContinents
const countries = countriesData as TCountries
const languagesAll = languagesAllData as TLanguages

import {
  getCountryDataCsv,
  getLanguagesInUse,
  getStringFromArray,
  getTitleCase,
  saveJsonFile,
} from './utils'

const languagesInUse = getLanguagesInUse(countries, languagesAll)

const CONTINENTS = 'continents'
const COUNTRIES = 'countries'
const LANGUAGES = 'languages'

const ALL = '.all'
const MIN = '.min'

const CSV_EXT = 'csv'
const DIST = './dist/'
const JSON_EXT = '.json'
const JSON_MIN = `${MIN}${JSON_EXT}`

const COMMA = '","'
const LF = '\n'
const QUOTE = '"'

// TODO: Split tasks into separate files

const minifyJsonData = () => {
  saveJsonFile(continents, CONTINENTS)
  saveJsonFile(countries, COUNTRIES)
  saveJsonFile(languagesInUse, LANGUAGES)
  saveJsonFile(languagesAll, `${LANGUAGES}${ALL}`)
}

const generateCsv = () => {
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

        return QUOTE + code + COMMA + getCountryDataCsv(country, COMMA) + QUOTE
      })
      .join(LF)

  fs.writeFileSync(`${DIST}${COUNTRIES}.${CSV_EXT}`, csvData + LF)
}

/**
 * Task execution
 */

minifyJsonData()
generateCsv()
