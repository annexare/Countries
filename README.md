# Countries, Languages & Continents data

[![Monthly Downloads](https://img.shields.io/npm/dm/countries-list.svg)](https://www.npmjs.com/package/countries-list)
[![NPM](https://img.shields.io/npm/v/countries-list.svg 'NPM package version')](https://www.npmjs.com/package/countries-list)
[![Packagist](https://img.shields.io/packagist/v/annexare/countries-list.svg 'Packagist version')](https://packagist.org/packages/annexare/countries-list)
[![CI: JS](https://github.com/annexare/Countries/workflows/Countries%20JS/badge.svg 'CI: JS')](https://github.com/annexare/Countries/actions)
[![CI: PHP](https://github.com/annexare/Countries/workflows/Countries%20PHP/badge.svg 'CI: PHP')](https://github.com/annexare/Countries/actions)
[![Twitter](https://img.shields.io/twitter/follow/annexare.svg?label=follow+@annexare)](https://twitter.com/annexare)

Continents & countries: **ISO 3166-1 alpha-2** code (with **alpha-2** to **alpha-3** set), name, **ISO 639-1** languages, capital and **ISO 4217** currency codes, native name, calling codes.
Lists are available in JSON, CSV and SQL formats.
Also, contains separate JSON files with additional country **Emoji** flags data.

## Version 3.0: Breaking changes

Version 3 comes with some data structure changes.
It was completely reworked under the hood with **TypeScript**, **ESM** exports and **Turborepo** file structure.

Everything is strongly typed so you can easily use data with auto-complete in your IDE.

**Note**: If your projects depend on the old structure, carefully specify required versions in your dependencies.

## Installation

Package is available via:

- **NPM** `npm install countries-list`
- **Composer / Packagist** `composer require annexare/countries-list`

## Usage (version 3.x)

Module exports `continents`, `countries`, `languages` and utility functions.

```ts
// Interfaces and types
import type {
  ICountry,
  ICountryData,
  ILanguage,
  TContinentCode,
  TCountryCode,
  TLanguageCode,
} from 'countries-list'

// Main data and utils
import { continents, countries, languages } from 'countries-list'
// Utils
import { getCountryCode, getCountryData, getCountryDataList, getEmojiFlag } from 'countries-list'

// Minimal data in JSON
import countries2to3 from 'countries-list/minimal/countries.2to3.min.json'
import countries3to2 from 'countries-list/minimal/countries.3to2.min.json'
import languageNames from 'countries-list/minimal/languages.native.min'

getCountryCode('Ukraine') // 'UA'
getCountryCode('Україна') // 'UA'
getCountryData('UA') // ICountryData
```

Built files are in the `dist` directory of this repository, and `packages/countries` directory contains source data.

**Note**: JS build contains ES modules, CommonJS and IIFE (for now)

- CJS `cjs/index.js`
- ESM `mjs/index.js`
- IIFE `index.iife.js`

## Data structure examples

```ts
const continents = {
  AF: 'Africa',
  AN: 'Antarctica',
  AS: 'Asia',
  EU: 'Europe',
  NA: 'North America',
  OC: 'Oceania',
  SA: 'South America',
}

const countries = {
  // ...
  UA: {
    name: 'Ukraine',
    native: 'Україна',
    phone: [380],
    continent: 'EU',
    capital: 'Kyiv',
    currency: ['UAH'],
    languages: ['uk'],
  },
  // ...
}

const languages = {
  // ...
  uk: {
    name: 'Ukrainian',
    native: 'Українська',
  },
  ur: {
    name: 'Urdu',
    native: 'اردو',
    rtl: 1,
  },
  // ...
}
```

## Contributing to this repository

Everything is generated from strongly typed files in `packages/countries/src`, including SQL file.

Everything in `dist` is generated,
so please make data related changes **ONLY** to files from `packages/countries`, commit them.
Use `npm run build` (or `turbo build`, `turbo test`) command to build/test generated files.

## Credits

Prepared by [Annexare Studio](https://annexare.com/) from different public sources.
Feel free to use it as you need in your apps
or send updates into [this](https://github.com/annexare/Countries) public repository.
It's under MIT license.
