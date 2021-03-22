import chalk from 'chalk'

import { ALL, CONTINENTS, COUNTRIES, MINIMAL_DIR, MORE_DIR, LANGUAGES } from '../constants'
import {
  continents,
  countries,
  countries2to3,
  countries3to2,
  languagesInUse,
  languagesAll,
} from '../data'
import { saveJsonFile } from '../utils'
import { getEmojiFlag } from '../../src/getEmojiFlag'
import { TCountryCode, TCountryToString, TLanguageCode, TLanguageToString } from '../../src/types'

import { generateMoreTypings } from './generateTypings'

export const minifyJsonData = (): void => {
  console.log(chalk.bold('\nMinifying main JSON files:\n'))

  saveJsonFile(CONTINENTS, continents)
  saveJsonFile(COUNTRIES, countries)
  saveJsonFile(LANGUAGES, languagesInUse)
  saveJsonFile(`${LANGUAGES}${ALL}`, languagesAll)

  console.log(chalk.bold('\nMinifying data JSON files:\n'))

  saveJsonFile(`${MORE_DIR}${COUNTRIES}.2to3`, countries2to3)
  generateMoreTypings(`${COUNTRIES}.2to3`, `${COUNTRIES}2to3`, 'TCountryToString')

  saveJsonFile(`${MORE_DIR}${COUNTRIES}.3to2`, countries3to2)
  generateMoreTypings(`${COUNTRIES}.3to2`, `${COUNTRIES}3to2`, 'TStringToCountry')

  const countryCodes = Object.keys(countries) as TCountryCode[]
  const languageCodes = Object.keys(languagesInUse) as TLanguageCode[]

  const countriesEmoji = {} as TCountryToString
  const countriesEn = {} as TCountryToString
  const countriesNative = {} as TCountryToString

  const languagesEn = {} as TLanguageToString
  const languagesNative = {} as TLanguageToString

  for (const code of countryCodes) {
    countriesEmoji[code] = getEmojiFlag(code as TCountryCode)
    countriesEn[code] = countries[code].name
    countriesNative[code] = countries[code].native
  }

  for (const lang of languageCodes) {
    languagesEn[lang] = languagesAll[lang].name
    languagesNative[lang] = languagesAll[lang].native
  }

  saveJsonFile(`${MORE_DIR}${COUNTRIES}.emoji`, countriesEmoji)
  generateMoreTypings(`${COUNTRIES}.emoji`, `${COUNTRIES}Emoji`, 'TCountryToString')

  console.log(chalk.bold('\nGenerating minimal data JSON files:\n'))

  saveJsonFile(`${MINIMAL_DIR}${COUNTRIES}.en`, countriesEn)
  saveJsonFile(`${MINIMAL_DIR}${COUNTRIES}.native`, countriesNative)

  saveJsonFile(`${MINIMAL_DIR}${LANGUAGES}.en`, languagesEn)
  saveJsonFile(`${MINIMAL_DIR}${LANGUAGES}.native`, languagesNative)
}
