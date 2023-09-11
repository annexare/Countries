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
      .replace(/export/g, 'declare')
      .replace(/import .* from '.*'\n/g, '')
      .replace('keyof typeof continents', "'" + Object.keys(continents).join("' | '") + "'")
      .replace('keyof typeof countries', "'" + Object.keys(countries).join("' | '") + "'")
      .replace('keyof typeof languages', "'" + Object.keys(languages).join("' | '") + "'") +
    [
      '',
      'declare const getCountryCode: (countryName: string) => TCountryCode | false',
      'declare const getCountryData: (iso2: TCountryCode) => ICountryData',
      'declare const getCountryDataList: () => ICountryData[]',
      'declare const getEmojiFlag: (countryCode: TCountryCode) => string',
      '',
      'declare const continents: TContinents',
      'declare const countries: TCountries',
      'declare const languages: TLanguages',
      '',
      'export { continents, countries, getCountryCode, getCountryData, getCountryDataList, getEmojiFlag, languages }',
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
