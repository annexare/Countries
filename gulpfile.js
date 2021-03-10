'use strict'

const CONTINENTS = 'continents',
  COUNTRIES = 'countries',
  LANGUAGES = 'languages',
  LF = '\n',
  DATA = './data/',
  DATA_FILE = 'data',
  DIST = './dist/',
  DO_DATA = 'data',
  DO_EMOJI = 'emoji',
  DO_MINIMAL = 'minimal',
  JSON_EXT = 'json',
  JSON_TAB = 2,
  fs = require('fs'),
  { series } = require('gulp'),
  continents = require(DATA + CONTINENTS + '.json'),
  countries = require(DATA + COUNTRIES + '.json'),
  DEFAULT_TASKS = [DO_DATA, DO_EMOJI, DO_MINIMAL]

exports[DO_DATA] = function data(callback) {
  const fullData = {
    continents,
    countries: getCountriesWithEmoji(),
    languages: languagesInUse,
  }

  fs.writeFileSync(
    `${DIST}${DATA_FILE}.${JSON_EXT}`,
    JSON.stringify(fullData, false, JSON_TAB) + LF
  )
  fs.writeFileSync(`${DIST}${DATA_FILE}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(fullData) + LF)
  callback && callback()
}

exports[DO_EMOJI] = function emoji(callback) {
  const countriesEmoji = getCountriesWithEmoji()

  fs.writeFileSync(
    `${DIST}${COUNTRIES}.${DO_EMOJI}.${JSON_EXT}`,
    JSON.stringify(countriesEmoji, false, JSON_TAB) + LF
  )
  fs.writeFileSync(
    `${DIST}${COUNTRIES}.${DO_EMOJI}.${DO_MIN}.${JSON_EXT}`,
    JSON.stringify(countriesEmoji) + LF
  )
  callback && callback()
}

exports[DO_MINIMAL] = function minimal(callback) {
  // Countries: each item is a String country name in English
  const minCountryNames = {}
  Object.keys(countries).forEach((code) => {
    minCountryNames[code] = countries[code].name
  })
  fs.writeFileSync(
    `${DIST}${DO_MINIMAL}/${COUNTRIES}.en.${DO_MIN}.${JSON_EXT}`,
    JSON.stringify(minCountryNames) + LF
  )

  // Countries: each item is an Array of fields in order
  const minCountries = {}
  Object.keys(countries).forEach((code) => {
    minCountries[code] = getCountryDataValues(countries[code])
  })
  fs.writeFileSync(
    `${DIST}${DO_MINIMAL}/${COUNTRIES}.${DO_MINIMAL}.${DO_MIN}.${JSON_EXT}`,
    JSON.stringify(minCountries) + LF
  )

  // Languages: each item is a String language name in English
  const minLanguageNames = {}
  Object.keys(languagesInUse).forEach((code) => {
    minLanguageNames[code] = languagesInUse[code].name
  })
  fs.writeFileSync(
    `${DIST}${DO_MINIMAL}/${LANGUAGES}.en.${DO_MIN}.${JSON_EXT}`,
    JSON.stringify(minLanguageNames) + LF
  )

  // Languages: each item is an Array of fields in order
  const minLanguages = {}
  Object.keys(languagesInUse).forEach((code) => {
    minLanguages[code] = getLanguageDataValues(languagesInUse[code])
  })
  fs.writeFileSync(
    `${DIST}${DO_MINIMAL}/${LANGUAGES}.${DO_MINIMAL}.${DO_MIN}.${JSON_EXT}`,
    JSON.stringify(minLanguages) + LF
  )

  callback && callback()
}

exports.default = series(DEFAULT_TASKS.map((task) => exports[task]))

function getCountryDataValues(data, key = false) {
  const { name, native, phone, continent, capital, currency, languages } = data
  const values = [
    name,
    native,
    phone,
    continent,
    capital,
    currency,
    key ? getStringFromArray(languages) : languages,
  ]

  if (key) {
    values.unshift(key)
  }

  return values
}

function getLanguageDataValues(data, key = false) {
  const { name, native, rtl } = data
  const values = [name, native, rtl ? 1 : 0]

  if (key) {
    values.unshift(key)
  }

  return values
}

function getCountriesWithEmoji() {
  const { getEmojiFlag, getUnicode } = require('./dist/index.es5.min'),
    dataWithEmoji = {},
    countryCodes = Object.keys(countries)

  countryCodes.forEach((code) => {
    const emoji = getEmojiFlag(code),
      emojiU = getUnicode(emoji)

    dataWithEmoji[code] = Object.assign({}, countries[code], {
      emoji,
      emojiU,
    })
  })

  return dataWithEmoji
}

function getStringFromArray(arr) {
  if (!arr || !arr.length) {
    return ''
  }

  return arr.join(',')
}
