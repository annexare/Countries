import chalk from 'chalk'
import { continents } from 'countries/data/continents.ts'
import { countries } from 'countries/data/countries.ts'
import type {
  ICountry,
  ILanguage,
  TContinentCode,
  TCountryCode,
  TLanguageCode,
} from 'countries/types.ts'

import { DATA_FILE, LF, SQL_EXT } from 'scripts/constants.ts'
import { languagesInUse } from 'scripts/data.ts'
import { getStringFromArray, saveTextFile } from 'scripts/utils.ts'

interface IDataField {
  name: string
  type: string

  key?: boolean
  unique?: boolean
}

function sqlHeader(table: string, fields: IDataField[]): string {
  return [
    `DROP TABLE IF EXISTS \`${table}\`;`,
    `CREATE TABLE \`${table}\` (`,
    '  ' +
      fields.map((field) => `\`${field.name}\` ${field.type}`).join(`,${LF}  `) +
      sqlKeys(fields),
    ') ENGINE=MyISAM DEFAULT CHARSET=utf8;',
  ].join(LF)
}

function sqlKeys(fields: IDataField[]) {
  const keys: string[] = []

  fields.forEach((field) => {
    let key = ''
    if (field.key || field.unique) {
      const name = `\`${field.name}\``
      key = `KEY ${name} (${name})`

      if (field.unique) {
        key = `UNIQUE ${key}`
      }

      keys.push(key)
    }
  })

  return (keys ? `,${LF}  ` : '') + keys.join(`,${LF}  `)
}

function sqlValues(table: string, fields: IDataField[], values: (string | number)[][]): string {
  if (!values || !values.length) {
    return ''
  }

  const lines = [
    `INSERT INTO \`${table}\` (\`${fields.map((field) => field.name).join('`, `')}\`) VALUES`,
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

  return `${lines.join(LF) + LF + valueLines.join(`,${LF}`)};`
}

function getCountryDataValues(data: ICountry, countryCode: TCountryCode) {
  const { name, native, phone, continent, capital, currency, languages } = data
  const values: [TCountryCode, string, string, string, TContinentCode, string, string, string] = [
    countryCode,
    name,
    native,
    phone.join(','),
    continent,
    capital,
    currency.join(','),
    getStringFromArray(languages),
  ]

  return values
}

function getLanguageDataValues(data: ILanguage, langCode: TLanguageCode) {
  const { name, native, rtl } = data
  const values: [TLanguageCode, string, string, 0 | 1] = [langCode, name, native, rtl ? 1 : 0]

  return values
}

export const generateSql = (): void => {
  console.log(chalk.bold('\nGenerating SQL file:\n'))

  /**
   * Continents
   */

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
  const continentList: string[][] = Object.keys(continents).map((key) => {
    return [key as string, continents[key as TContinentCode]]
  })

  /**
   * Countries
   */

  const maxCurrencyLength = Math.max(
    ...Object.values(countries).map(({ currency }) => currency.join(',').length)
  )
  const maxLanguagesLength = Math.max(
    ...Object.values(countries).map(({ languages }) => languages.join(',').length)
  )
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
      type: `VARCHAR(${maxCurrencyLength}) NOT NULL DEFAULT ''`,
    },
    {
      name: 'languages',
      type: `VARCHAR(${maxLanguagesLength}) NOT NULL DEFAULT ''`,
    },
  ]
  const countryList: string[][] = (Object.keys(countries) as TCountryCode[]).map((countryCode) =>
    getCountryDataValues(countries[countryCode], countryCode)
  )

  /**
   * Languages
   */

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
  const languageList: (string | number)[][] = []
  for (const langCode of Object.keys(languagesInUse) as TLanguageCode[]) {
    const data = languagesInUse[langCode]
    if (langCode && data) {
      languageList.push(getLanguageDataValues(data, langCode))
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
