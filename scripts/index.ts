import fs from 'fs'

import { default as continentsData } from '../data/continents.json'
import { default as countriesData } from '../data/countries.json'
import { default as languagesAllData } from '../data/languages.json'

const continents = continentsData as TContinents
const countries = countriesData as TCountries
const languagesAll = languagesAllData as TLanguages

import {
  getCountryDataCsv,
  getLanguagesInUse,
  getStringFromArray,
  getTitleCase,
} from './utils'

const languagesInUse = getLanguagesInUse(countries, languagesAll)

const CONTINENTS = 'continents'
const COUNTRIES = 'countries'
const LANGUAGES = 'languages'

const ALL = 'all'
const CSV_EXT = 'csv'
const DIST = './dist/'
const JSON_EXT = 'json'
const JSON_TAB = 2

const COMMA = '","'
const LF = '\n'
const QUOTE = '"'

const copyFiles = () => {
  fs.writeFileSync(
    `${DIST}${CONTINENTS}.${JSON_EXT}`,
    JSON.stringify(continents, undefined, JSON_TAB) + LF
  )
  fs.writeFileSync(
    `${DIST}${COUNTRIES}.${JSON_EXT}`,
    JSON.stringify(countries, undefined, JSON_TAB) + LF
  )
  fs.writeFileSync(
    `${DIST}${LANGUAGES}.${JSON_EXT}`,
    JSON.stringify(languagesInUse, undefined, JSON_TAB) + LF
  )
  fs.writeFileSync(
    `${DIST}${LANGUAGES}.${ALL}.${JSON_EXT}`,
    JSON.stringify(languagesAll, undefined, JSON_TAB) + LF
  )
}

const generateCsv = () => {
  const countryList = Object.keys(countries)
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
    countryList
      .map((code) => {
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

copyFiles()
generateCsv()
