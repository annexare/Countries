# Countries, Languages & Continents data

[![Monthly Downloads](https://img.shields.io/npm/dm/countries-list.svg)](https://www.npmjs.com/package/countries-list)
[![NPM](https://img.shields.io/npm/v/countries-list.svg 'NPM package version')](https://www.npmjs.com/package/countries-list)
[![Packagist](https://img.shields.io/packagist/v/annexare/countries-list.svg 'Packagist version')](https://packagist.org/packages/annexare/countries-list)
[![CI: JS](https://github.com/annexare/Countries/workflows/Countries%20JS/badge.svg 'CI: JS')](https://github.com/annexare/Countries/actions)
[![CI: PHP](https://github.com/annexare/Countries/workflows/Countries%20PHP/badge.svg 'CI: PHP')](https://github.com/annexare/Countries/actions)
[![Twitter](https://img.shields.io/twitter/follow/annexare.svg?label=follow+@annexare)](https://twitter.com/annexare)

Continents & countries: **ISO 3166-1 alpha-2** code (with **alpha-2** to **alpha-3** set), name, **ISO 639-1** languages, capital, **ISO 4217** currencies (with symbols & numeric codes), native name, calling codes.
Lists are available in JSON, CSV and SQL formats.
Also, contains separate JSON files with additional country **Emoji** flags data.

## Version 3.0: Breaking changes

Version 3 comes with some data structure changes.
It was completely reworked under the hood with **TypeScript**, **ESM** exports and a **Bun workspaces** monorepo structure.

Everything is strongly typed so you can easily use data with auto-complete in your IDE.

**Note**: If your projects depend on the old structure, carefully specify required versions in your dependencies.

## Installation

Package is available via:

- **Bun** `bun add countries-list`
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

## Currencies (ISO 4217)

Full **ISO 4217** currency data — English and native **name**, UI **symbol**, native symbol, 3-digit **numeric** code and minor-unit **decimals** — is an **opt-in** import via the `countries-list/currencies` subpath, so it does not affect the main bundle size:

```ts
import type { ICurrency, ICurrencyData, TCurrencyCode } from 'countries-list'
import { currencies, getCurrency, getCurrencyByNumeric } from 'countries-list/currencies'

// Minimal maps (code -> value)
import currencySymbols from 'countries-list/minimal/currencies.symbol.min.json'
import currencyNumbers from 'countries-list/minimal/currencies.numeric.min.json'

currencies.UAH // { name: 'Ukrainian Hryvnia', native: 'українська гривня', symbol: '₴', symbolNative: '₴', numeric: '980', decimals: 2 }
getCurrency('JPY') // ICurrencyData: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', decimals: 0, ... }
getCurrencyByNumeric('840') // ICurrencyData for USD — numeric lookup, e.g. for banking
```

The dataset covers the complete active ISO 4217 list plus a few withdrawn codes still referenced by country data (e.g. `ANG`, flagged with `withdrawn: true`). `symbol` falls back to the ISO code where a currency has no distinct Latin glyph (e.g. `CHF`, `KWD`); the local glyph is then in `symbolNative`. Symbols come from Unicode CLDR (ISO 4217 itself defines no symbols).

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

const currencies = {
  // ...
  UAH: {
    name: 'Ukrainian Hryvnia',
    native: 'українська гривня',
    symbol: '₴',
    symbolNative: '₴',
    numeric: '980',
    decimals: 2,
  },
  // ...
}
```

## Contributing to this repository

Everything is generated from strongly typed files in `packages/countries/src`, including SQL file.

Everything in `dist` is generated,
so please make data related changes **ONLY** to files from `packages/countries`, commit them.
Use `bun run build` / `bun run test` to build/test generated files.

The `currencies` dataset (`packages/countries/src/data/currencies.ts`) is generated from the official ISO 4217 list and Unicode CLDR via `packages/scripts/generateCurrencies.ts`. Refresh it with `cd packages/scripts && bun run generate:currencies` (requires network) when ISO 4217 publishes an update, rather than editing the data by hand.

## Credits

Prepared by [Annexare Studio](https://annexare.com/) from different public sources.
Feel free to use it as you need in your apps
or send updates into [this](https://github.com/annexare/Countries) public repository.
It's under MIT license.
