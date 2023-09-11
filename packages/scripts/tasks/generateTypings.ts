import chalk from 'chalk'
import fs from 'node:fs'

import { continents, countries, languages } from 'scripts/data.ts'
import { saveTextFile } from 'scripts/utils.ts'

export const generateTypings = (): void => {
  console.log(chalk.bold('\nGenerating main type definitions file:\n'))

  const current = fs.readFileSync('../countries/src/types.ts', {
    encoding: 'utf-8',
  })
  const typings =
    current
      .replace(/import .* from '.*'\n/g, '')
      .replace('keyof typeof continents', "'" + Object.keys(continents).join("' | '") + "'")
      .replace('keyof typeof countries', "'" + Object.keys(countries).join("' | '") + "'")
      .replace('keyof typeof languages', "'" + Object.keys(languages).join("' | '") + "'") +
    [
      '',
      'export const getCountryCode: (countryName: string) => TCountryCode | false',
      'export const getCountryData: (iso2: TCountryCode) => ICountryData',
      'export const getCountryDataList: () => ICountryData[]',
      'export const getEmojiFlag: (countryCode: TCountryCode) => string',
      '',
      'export const continents: TContinents',
      'export const countries: TCountries',
      'export const languages: TLanguages',
      '',
    ].join('\n')

  saveTextFile('index.d.ts', typings.trim())
}

export const generateMoreTypings = (fileName: string, varName: string, type: string): void => {
  const fileContents = [
    '/// <reference path="../index.d.ts" />',
    '',
    `declare const ${varName}: ${type}`,
    `export default ${varName}`,
  ].join('\n')

  saveTextFile(`more/${fileName}.min.d.ts`, fileContents + '\n')
}
