# Countries

[![Monthly Downloads](https://img.shields.io/npm/dm/countries-list.svg)](https://www.npmjs.com/package/countries-list)
[![NPM](https://img.shields.io/npm/v/countries-list.svg "NPM package version")](https://www.npmjs.com/package/countries-list)
[![Packagist](https://img.shields.io/packagist/v/annexare/countries-list.svg "Packagist version")](https://packagist.org/packages/annexare/countries-list)

Continents & countries: **ISO 3166-1 alpha-2** code, name, **ISO 639-1** languages, capital and currency, native name, calling codes.
Lists are available in JSON, CSV and SQL formats.
Also, contains separate JSON files with additional country **Emoji** flags data.

# Version 2.0: Breaking changes

This version changes a lot in the data structures, and placement of the files.
So, if your projects depend on the old structure — specify previous versions, `<2.0.0`.

The `./data` directory contains source data.
Built files are in the `./dist` directory.
Module exports `continents`, `countries`, `languages` and functions `getEmojiFlag(countryCode)` and `getUnicode(emoji)`.

**Note**: Languages is an array. Currencies, calling codes may be a comma-separated list.

## Usage

Here you have ready to use JSON for the most of web apps, CSV and SQL files for some backend stuff.

Package is available via:

* **NPM** `npm install countries-list`
* **Composer / Packagist** `composer require annexare/countries-list`
* **Bower** `bower install countries`

## Examples

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

Everything is generated from files in `./data`, including SQL file.

Everything in `./dist` is generated,
so please make data related changes **ONLY** to files from `./data`
and then run `gulp` default command to commit generated files as well.

## Credits

Prepared by [Annexare Studio](https://annexare.com/) from different public sources.
Feel free to use it as you need in your apps
or send updates into [this](https://github.com/annexare/Countries) public repository.
It's under MIT license.
