# Countries

[![Monthly Downloads](https://img.shields.io/npm/dm/countries-list.svg)](https://www.npmjs.com/package/countries-list)
[![NPM](https://img.shields.io/npm/v/countries-list.svg "NPM package version")](https://www.npmjs.com/package/countries-list)
[![Packagist](https://img.shields.io/packagist/v/annexare/countries-list.svg "Packagist version")](https://packagist.org/packages/annexare/countries-list)

Continents & countries: ISO 3166-1 alpha-2 code, name, languages, capital and currency, native name, calling codes.
Lists are available in JSON, CSV and SQL formats.
Also, contains separate JSON files with additional country **Emoji** flags data.

**Note**: Languages, currencies, calling codes may be a comma-separated list.

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
        "AD": {
            "name": "Andorra",
            "native": "Andorra",
            "phone": "376",
            "continent": "EU",
            "capital": "Andorra la Vella",
            "currency": "EUR",
            "languages": "ca"
        },
        ...
        "CH": {
            "name": "Switzerland",
            "native": "Schweiz",
            "phone": "41",
            "continent": "EU",
            "capital": "Bern",
            "currency": "CHE,CHF,CHW",
            "languages": "de,fr,it"
        },
        ...
    }
}
```

Also, there's a minimal JSON file with only country by code object:

```
{
  ...
  "UA":"Ukraine",
  ...
  "US":"United States"
  ...
}
```

## Contributing

Everything's generated from `countries.json`, including SQL file.
But generated files are in repository, so in future please make changes to this file and
run `gulp` default command.

## Credits

Prepared by [Annexare Studio](https://annexare.com/) from different public sources. Feel free to use it as you need in your apps or send updates into [this](https://github.com/annexare/Countries) public repository. It's under MIT license.
