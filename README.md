# Countries

Continents & countries: ISO 3166-1 alpha-2 code, name, languages, capital and currency, native name, calling codes. Lists are available in JSON and SQL formats.

## Usage

Here you have ready to use both JSON for most web apps and SQL files for some backend stuff.
Package is available via Bower: `bower install countries`.

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
            "capital": "EUR",
            "currency": "And",
            "languages": "ca"
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

# Credits

Prepared by [Annexare Studio](https://annexare.com/) from different public sources. Feel free to use it as you need in your apps or send updates into [this](https://github.com/annexare/Countries) public repository. It's under MIT license.
