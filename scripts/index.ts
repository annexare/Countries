import fs from 'fs'

import { default as continents } from '../data/continents.json'
import { default as countries } from '../data/countries.json'
import { default as languagesAll } from '../data/languages.json'

import { getCountryDataCsv, getLanguagesInUse, getStringFromArray, getTitleCase } from './utils'

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
        const country = Object.assign({}, countries[code])
        country.continent = continents[country.continent]
        country.languages = getStringFromArray(country.languages)

        return (
          QUOTE + code + COMMA + getCountryDataCsv(country, COMMA) + QUOTE
        )
      })
      .join(LF)

  fs.writeFileSync(`${DIST}${COUNTRIES}.${CSV_EXT}`, csvData + LF)
}

/**
 * Task execution
 */

copyFiles()
generateCsv()
