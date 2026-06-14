import fs from 'node:fs'
import chalk from 'chalk'

import { MINIMAL_DIR } from 'scripts/constants.ts'
import { continents, countries, currencies, languages } from 'scripts/data.ts'
import { saveTextFile } from 'scripts/utils.ts'

export const generateTypings = (): void => {
  console.log(chalk.bold('\nGenerating main type definitions file:\n'))

  const current = fs.readFileSync('../countries/src/types.ts', {
    encoding: 'utf-8',
  })
  const typings =
    current
      .replace(/import .* from '.*'\n/g, '')
      .replace('keyof typeof continents', `'${Object.keys(continents).join("' | '")}'`)
      .replace('keyof typeof countries', `'${Object.keys(countries).join("' | '")}'`)
      .replace('keyof typeof currencies', `'${Object.keys(currencies).join("' | '")}'`)
      .replace('keyof typeof languages', `'${Object.keys(languages).join("' | '")}'`) +
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

  // Opt-in `countries-list/currencies` subpath typings (re-uses the types from index.d.ts).
  const currencyTypings = [
    "import type { ICurrencyData, TCurrencies, TCurrencyCode } from './index'",
    '',
    'export const currencies: TCurrencies',
    'export const getCurrency: (code: TCurrencyCode) => ICurrencyData',
    'export const getCurrencyByNumeric: (numeric: string | number) => ICurrencyData | undefined',
  ].join('\n')

  saveTextFile('currencies.d.ts', currencyTypings)
}

export const generateMinimalDataTypings = (
  fileName: string,
  varName: string,
  type: string
): void => {
  const fileContents = [
    `import type { ${type} } from '../'`,
    '',
    `declare const ${varName}: ${type}`,
    `export default ${varName}`,
  ].join('\n')

  saveTextFile(`${MINIMAL_DIR}/${fileName}.min.d.ts`, `${fileContents}\n`)
}
