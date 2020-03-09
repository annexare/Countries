# Countries, Languages & Continents data

[![Monthly Downloads](https://img.shields.io/npm/dm/countries-list.svg)](https://www.npmjs.com/package/countries-list)
[![NPM](https://img.shields.io/npm/v/countries-list.svg "NPM package version")](https://www.npmjs.com/package/countries-list)
[![Packagist](https://img.shields.io/packagist/v/annexare/countries-list.svg "Packagist version")](https://packagist.org/packages/annexare/countries-list)
[![GitHub CI](https://github.com/annexare/Countries/workflows/build/badge.svg "GitHub CI")](https://github.com/annexare/Countries/actions)
[![Travis CI](https://travis-ci.org/annexare/Countries.svg "Travis CI")](https://travis-ci.org/annexare/Countries)
[![Twitter](https://img.shields.io/twitter/follow/annexare.svg?label=follow+@annexare)](https://twitter.com/annexare)

Continents & countries: **ISO 3166-1 alpha-2** code (with **alpha-2** to **alpha-3** set), name, **ISO 639-1** languages, capital and currency, native name, calling codes.
Lists are available in JSON, CSV and SQL formats.
Also, contains separate JSON files with additional country **Emoji** flags data.

## Version 2.0: Breaking changes

This version changes a lot in the data structures, and placement of the files.
So, if your projects depend on the old structure — specify previous versions, `<2.0.0`.

## Installation

Package is available via:

* **NPM** `npm install countries-list`
* **Composer / Packagist** `composer require annexare/countries-list`
* **Bower** `bower install countries`

## Usage

Module exports `continents`, `countries`, `languages`, `languagesAll` and functions:
* `getEmojiFlag(countryCode)`, where `countryCode` is alpha-2 `String`
* `getUnicode(emoji)`, where `emoji` is alpha-2 emoji flag `String`

Built files are in the `./dist` directory.
The `./data` directory contains source data.

The consistent data is available from `./dist/data.*` files (JSON, SQL).

**Note**: ES5 UMD build is here: `./dist/index.es5.min.js`.

**Note**: Country item `languages` field is an `Array` in JSON files to easily count and match items with a Language item.
But `currency` and `phone` calling codes may be a comma-separated `String`.

**Note**: Languages list only contains languages used in Countries data. Full list of known languages is exported as `languagesAll` from `./dist/languages.all.json`.

## Data example

```
{
  "continents": {
    "AF": "Africa",
    "AN": "Antarctica",
    "AS": "Asia",
    "EU": "Europe",
    "NA": "North America",
    "OC": "Oceania",
    "SA": "South America"
  },
  "countries": {
    "AE": {
      "name": "United Arab Emirates",
      "native": "دولة الإمارات العربية المتحدة",
      "phone": "971",
      "continent": "AS",
      "capital": "Abu Dhabi",
      "currency": "AED",
      "languages": [
        "ar"
      ],
      "emoji": "🇦🇪",
      "emojiU": "U+1F1E6 U+1F1EA"
    },
    ...
    "UA": {
      "name": "Ukraine",
      "native": "Україна",
      "phone": "380",
      "continent": "EU",
      "capital": "Kyiv",
      "currency": "UAH",
      "languages": [
        "uk"
      ],
      "emoji": "🇺🇦",
      "emojiU": "U+1F1FA U+1F1E6"
    }
  },
  "languages": {
    "ar": {
      "name": "Arabic",
      "native": "العربية",
      "rtl": 1
    },
    ...
    "uk": {
      "name": "Ukrainian",
      "native": "Українська"
    }
  }
}
```

## Contributing

Everything is generated from files in `./data/`, including SQL file.

Everything in `./dist/` is generated,
so please make data related changes **ONLY** to files from `./data/`, commit them.
Use `npm run build` command to build/test generated files.

## Credits

Prepared by [Annexare Studio](https://annexare.com/) from different public sources.
Feel free to use it as you need in your apps
or send updates into [this](https://github.com/annexare/Countries) public repository.
It's under MIT license.
