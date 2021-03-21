import chalk from 'chalk'

import { ALL, CONTINENTS, COUNTRIES, LANGUAGES } from '../constants'
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
import { TCountries, TCountryCode } from '../../src/types'

export const minifyJsonData = (): void => {
  const countriesEmoji: TCountries = { ...countries }
  for (const code of Object.keys(countries)) {
    const country = countries[code as TCountryCode]
    countriesEmoji[code as TCountryCode] = Object.assign({}, country, {
      emoji: getEmojiFlag(code as TCountryCode),
    })
  }

  console.log(chalk.bold('\nMinifying JSON files:'))
  saveJsonFile(CONTINENTS, continents)
  saveJsonFile(COUNTRIES, countriesEmoji)
  saveJsonFile(`${COUNTRIES}2to3`, countries2to3)
  saveJsonFile(`${COUNTRIES}3to2`, countries3to2)
  saveJsonFile(LANGUAGES, languagesInUse)
  saveJsonFile(`${LANGUAGES}${ALL}`, languagesAll)
}
