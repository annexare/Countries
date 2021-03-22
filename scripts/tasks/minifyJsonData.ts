import chalk from 'chalk'

import { ALL, CONTINENTS, COUNTRIES, MORE_DIR, LANGUAGES } from '../constants'
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
import { TCountryCode, TCountryToString } from '../../src/types'

export const minifyJsonData = (): void => {
  console.log(chalk.bold('\nMinifying main JSON files:'))
  saveJsonFile(CONTINENTS, continents)
  saveJsonFile(COUNTRIES, countries)
  saveJsonFile(LANGUAGES, languagesInUse)
  saveJsonFile(`${LANGUAGES}${ALL}`, languagesAll)

  console.log(chalk.bold('\nMinifying data JSON files:'))
  saveJsonFile(`${MORE_DIR}${COUNTRIES}.2to3`, countries2to3)
  saveJsonFile(`${MORE_DIR}${COUNTRIES}.3to2`, countries3to2)

  // Country Emoji flags data
  const countriesEmoji = {} as TCountryToString
  const countryCodes = Object.keys(countries) as TCountryCode[]

  for (const code of countryCodes) {
    countriesEmoji[code] = getEmojiFlag(code as TCountryCode)
  }

  saveJsonFile(`${MORE_DIR}${COUNTRIES}.emoji`, countriesEmoji)
}
