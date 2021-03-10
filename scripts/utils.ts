import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

import { ICountryCsv, TCountries, TLanguageCode, TLanguages } from '../src/types'

const DIST = path.resolve(__dirname, '../dist/') + '/'
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
  languagesAll: TLanguages
): Partial<TLanguages> => {
  const inUseList: TLanguageCode[] = []

  // Languages in use processing
  Object.values(countries).forEach((country) => {
    if (country.languages && country.languages.length) {
      country.languages.forEach((lang) => {
        if (!inUseList.includes(lang)) {
          inUseList.push(lang)
        }
      })
    }
  })
  console.log('Languages in use:', inUseList.length)

  const languagesInUse: Partial<TLanguages> = {}
  inUseList.sort().forEach((lang) => {
    languagesInUse[lang] = Object.assign({}, languagesAll[lang])
  })

  // Languages not in use check
  const notInUseList: TLanguageCode[] = []
  const languageCodes = Object.keys(languagesAll) as TLanguageCode[]
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

  try {
    fs.writeFileSync(filePath, data + LF)
  } catch (e) {
    console.error(`Could not save file: "${filePath}"`, e)
    return false
  }

  console.log('Saved', chalk.blue(path.relative(process.cwd(), filePath)))
  return true
}

export const saveJsonFile = (fileName: string, data: any): boolean =>
  saveTextFile(`${fileName}${JSON_MIN_EXT}`, JSON.stringify(data))
