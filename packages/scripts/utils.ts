import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import prettyBytes from 'pretty-bytes'

import { ICountryCsv } from 'scripts/types.ts'
import { TCountries, TLanguageCode, TLanguages } from 'countries/types.ts'

const DIST = '../../dist/'
const LF = '\n'
const MIN_EXT = '.min'

const JSON_EXT = '.json'
const JSON_MIN_EXT = `${MIN_EXT}${JSON_EXT}`

export const getCountryDataToCsv = (
  { name, native, phone, continent, capital, currency, languages }: ICountryCsv,
  joinWith: string
): string => [name, native, phone, continent, capital, currency, languages].join(joinWith)

export const getLanguagesInUse = (
  countries: TCountries,
  languages: TLanguages
): Partial<TLanguages> => {
  const inUseList: TLanguageCode[] = []

  // Languages in use processing
  Object.values(countries).forEach((c) => {
    if (c.languages && c.languages.length) {
      c.languages.forEach((lang) => {
        if (!inUseList.includes(lang)) {
          inUseList.push(lang)
        }
      })
    }
  })
  console.log('Languages in use:', inUseList.length)

  const languagesInUse: Partial<TLanguages> = {}
  inUseList.sort().forEach((lang) => {
    languagesInUse[lang] = Object.assign({}, languages[lang])
  })

  // Languages not in use check
  const notInUseList: TLanguageCode[] = []
  const languageCodes = Object.keys(languages) as TLanguageCode[]
  languageCodes.forEach((lang) => {
    if (!inUseList.includes(lang)) {
      notInUseList.push(lang)
    }
  })
  console.log('Unused languages:', notInUseList.length, `(${notInUseList.join(', ')})`)

  return languagesInUse
}

export const getStringFromArray = (arr: string[]): string => {
  if (!arr || !arr.length) {
    return ''
  }

  return arr.join(',')
}

export const getTitleCase = (text: string): string => {
  const result = text.toLowerCase().split(' ')

  for (let i = 0; i < result.length; i++) {
    result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1)
  }

  return result.join(' ')
}

export const saveTextFile = (fileName: string, data: string): boolean => {
  const filePath = `${DIST}${fileName}`
  const relativePath = path.relative(process.cwd(), filePath)

  try {
    fs.writeFileSync(filePath, data + LF)
  } catch (e) {
    console.error(`Could not save file: "${relativePath}"`, e)
    return false
  }

  const stats = fs.statSync(filePath)
  console.log(
    'Saved',
    chalk.blue(path.relative('../../', filePath)),
    chalk.bold(prettyBytes(stats.size))
  )
  return true
}

export const saveJsonFile = (fileName: string, data: unknown): boolean =>
  saveTextFile(`${fileName}${JSON_MIN_EXT}`, JSON.stringify(data))
