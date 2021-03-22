import { ICountry, ILanguage, TContinentCode, TCountryCode, TLanguageCode } from '../../src/types'
import { DATA_FILE, LF, SQL_EXT } from '../constants'
import { continents, countries, languagesInUse } from '../data'
import { getStringFromArray, saveTextFile } from '../utils'

interface IDataField {
  name: string
  type: string

  key?: boolean
  unique?: boolean
}

function sqlHeader(table: string, fields: IDataField[]): string {
  return [
    'DROP TABLE IF EXISTS `' + table + '`;',
    'CREATE TABLE `' + table + '` (',
    '  ' +
      fields.map((field) => '`' + field.name + '` ' + field.type).join(',' + LF + '  ') +
      sqlKeys(fields),
    ') ENGINE=MyISAM DEFAULT CHARSET=utf8;',
  ].join(LF)
}

function sqlKeys(fields: IDataField[]) {
  const keys: string[] = []

  fields.forEach((field) => {
    let key = ''
    if (field.key || field.unique) {
      const name = '`' + field.name + '`'
      key = 'KEY ' + name + ' (' + name + ')'

      if (field.unique) {
        key = 'UNIQUE ' + key
      }

      keys.push(key)
    }
  })

  return (keys ? ',' + LF + '  ' : '') + keys.join(',' + LF + '  ')
}

function sqlValues(table: string, fields: IDataField[], values: (string | number)[][]): string {
  if (!values || !values.length) {
    return ''
  }

  const lines = [
    'INSERT INTO `' + table + '` (`' + fields.map((field) => field.name).join('`, `') + '`) VALUES',
  ]
  const valueLines: string[] = []

  values.forEach((row) => {
    valueLines.push(
      "  ('" +
        row
          .map((value) => {
            if (typeof value === 'string') {
              return value.replace(/'/g, "''")
            }

            return value
          })
          .join("', '") +
        "')"
    )
  })

  return lines.join(LF) + LF + valueLines.join(',' + LF) + ';'
}

function getCountryDataValues(data: ICountry, key = '') {
  const { name, native, phone, continent, capital, currency, languages } = data
  const values: string[] = [
    name,
    native,
    phone.join(','),
    continent,
    capital,
    currency.join(','),
    (key ? getStringFromArray(languages) : languages) as string,
  ]

  if (key) {
    values.unshift(key as string)
  }

  return values
}

function getLanguageDataValues(data: ILanguage, key = '') {
  const { name, native, rtl } = data
  const values = [name, native, rtl ? 1 : 0]

  if (key) {
    values.unshift(key as string)
  }

  return values
}

export const generateSql = (): void => {
  const continentFields: IDataField[] = [
    {
      name: 'code',
      type: "VARCHAR(2)  NOT NULL DEFAULT ''",
      unique: true,
    },
    {
      name: 'name',
      type: "VARCHAR(15) NOT NULL DEFAULT ''",
    },
  ]
  const countryFields: IDataField[] = [
    {
      name: 'code',
      type: "VARCHAR(2)  NOT NULL DEFAULT ''",
      unique: true,
    },
    {
      name: 'name',
      type: "VARCHAR(50) NOT NULL DEFAULT ''",
    },
    {
      name: 'native',
      type: "VARCHAR(50) NOT NULL DEFAULT ''",
    },
    {
      name: 'phone',
      type: "VARCHAR(15) NOT NULL DEFAULT ''",
    },
    {
      name: 'continent',
      type: "VARCHAR(2) NOT NULL DEFAULT ''",
      key: true,
    },
    {
      name: 'capital',
      type: "VARCHAR(50) NOT NULL DEFAULT ''",
    },
    {
      name: 'currency',
      type: "VARCHAR(30) NOT NULL DEFAULT ''",
    },
    {
      name: 'languages',
      type: "VARCHAR(30) NOT NULL DEFAULT ''",
    },
  ]
  const languageFields: IDataField[] = [
    {
      name: 'code',
      type: "VARCHAR(2)  NOT NULL DEFAULT ''",
      unique: true,
    },
    {
      name: 'name',
      type: "VARCHAR(50) NOT NULL DEFAULT ''",
    },
    {
      name: 'native',
      type: "VARCHAR(50) NOT NULL DEFAULT ''",
    },
    {
      name: 'rtl',
      type: 'TINYINT(1) NOT NULL DEFAULT 0',
    },
  ]
  const continentList: string[][] = Object.keys(continents).map((key) => {
    return [key as string, continents[key as TContinentCode]]
  })

  const countryList: string[][] = Object.keys(countries).map((key) =>
    getCountryDataValues(countries[key as TCountryCode], key as string)
  )

  const languageList: (string | number)[][] = []
  for (const key of Object.keys(languagesInUse)) {
    const lang = languagesInUse[key as TLanguageCode]
    if (lang) {
      languageList.push(getLanguageDataValues(lang, key as string))
    }
  }

  const sql =
    '' +
    // Continents
    sqlHeader('continents', continentFields) +
    LF +
    LF +
    sqlValues('continents', continentFields, continentList) +
    LF +
    LF +
    // Languages
    sqlHeader('languages', languageFields) +
    LF +
    LF +
    sqlValues('languages', languageFields, languageList) +
    LF +
    LF +
    // Countries
    sqlHeader('countries', countryFields) +
    LF +
    LF +
    sqlValues('countries', countryFields, countryList)

  saveTextFile(`${DATA_FILE}.${SQL_EXT}`, sql)
}
