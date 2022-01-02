import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

import { continents, countries, languagesAll } from '../data'
import { saveTextFile } from '../utils'

export const generateTypings = (): void => {
  console.log(chalk.bold('\nGenerating main type definitions file:\n'))

  const current = fs.readFileSync(path.resolve(__dirname, '../../src/types.ts'), {
    encoding: 'utf-8',
  })
  const typings = current
    .replace(/export/g, 'declare')
    .replace(/import .* from '.*'\n/g, '')
    .replace('keyof typeof continents', "'" + Object.keys(continents).join("' | '") + "'")
    .replace('keyof typeof countries', "'" + Object.keys(countries).join("' | '") + "'")
    .replace('keyof typeof languages', "'" + Object.keys(languagesAll).join("' | '") + "'")

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
