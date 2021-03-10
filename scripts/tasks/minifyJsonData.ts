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

export const minifyJsonData = (): void => {
  console.log(chalk.bold('\nMinifying JSON files:'))
  saveJsonFile(CONTINENTS, continents)
  saveJsonFile(COUNTRIES, countries)
  saveJsonFile(`${COUNTRIES}2to3`, countries2to3)
  saveJsonFile(`${COUNTRIES}3to2`, countries3to2)
  saveJsonFile(LANGUAGES, languagesInUse)
  saveJsonFile(`${LANGUAGES}${ALL}`, languagesAll)
}
