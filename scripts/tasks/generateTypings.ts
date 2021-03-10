import fs from 'fs'
import path from 'path'

import { continents, countries, languagesAll } from '../data'
import { saveTextFile } from '../utils'

export const generateTypings = (): void => {
  const current = fs.readFileSync(path.resolve(__dirname, '../../src/types.ts'), { encoding: 'utf-8' })
  const typings = current
    .replace(/export/g, 'declare')
    .replace(/import .* from '.*'\n/g, '')
    .replace('keyof typeof continents', "'" + Object.keys(continents).join("' | '") + "'")
    .replace('keyof typeof countries', "'" + Object.keys(countries).join("' | '") + "'")
    .replace('keyof typeof languages', "'" + Object.keys(languagesAll).join("' | '") + "'")

  saveTextFile('index.d.ts', typings.trim())
}
