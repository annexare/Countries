'use strict';

const
  CONTINENTS = 'continents',
  COUNTRIES = 'countries',
  LANGUAGES = 'languages',
  COMMA = '","',
  LF = "\n",
  QUOTE = '"',

  ALL = 'all',
  DATA = './data/',
  DIST = './dist/',

  DO_CSV = 'csv',
  DO_COPY = 'copy',
  DO_DATA = 'data',
  DO_EMOJI = 'emoji',
  DO_MIN = 'min',
  DO_MINIMAL = 'minimal',
  DO_SQL = 'sql',

  JSON_EXT = 'json',
  JSON_TAB = 2,
  fs = require('fs'),
  gulp = require('gulp'),
  continents = require(DATA + CONTINENTS + '.json'),
  countries = require(DATA + COUNTRIES + '.json'),
  languages = require(DATA + LANGUAGES + '.json'),

  DEFAULT_TASKS = [DO_COPY, DO_CSV, DO_DATA, DO_EMOJI, DO_MINIMAL, DO_MIN, DO_SQL];


gulp.task(DO_COPY, function (callback) {
  fs.writeFileSync(`${DIST}${CONTINENTS}.${JSON_EXT}`, JSON.stringify(continents, false, JSON_TAB) + LF);
  fs.writeFileSync(`${DIST}${COUNTRIES}.${JSON_EXT}`, JSON.stringify(countries, false, JSON_TAB) + LF);
  fs.writeFileSync(`${DIST}${LANGUAGES}.${JSON_EXT}`, JSON.stringify(languages, false, JSON_TAB) + LF);
  callback && callback();
});

gulp.task(DO_CSV, function (callback) {
  const countryList = Object.keys(countries);
  const csvHeader = QUOTE + 'Code' + COMMA
    + Object.keys(countries.UA).map(key => titleCase(key)).join(COMMA)
    + QUOTE;
  const csvData = csvHeader + LF + countryList.map(code => {
    const country = Object.assign({}, countries[code]);
    const { languages } = country;
    country.continent = continents[country.continent];
    country.languages = getStringFromArray(languages);

    return QUOTE + code + COMMA + objectValues(getCountryDataOrdered(country)).join(COMMA) + QUOTE;
  }).join(LF);

  fs.writeFile(`${DIST}${COUNTRIES}.${DO_CSV}`, csvData + LF, callback);
});

gulp.task(DO_DATA, function (callback) {
  const fullData = {
    continents,
    countries: getCountriesWithEmoji(),
    languages,
  };

  fs.writeFileSync(`${DIST}${ALL}.${JSON_EXT}`, JSON.stringify(fullData, false, JSON_TAB) + LF);
  fs.writeFileSync(`${DIST}${ALL}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(fullData) + LF);
  callback && callback();
});

gulp.task(DO_EMOJI, function (callback) {
  const countriesEmoji = getCountriesWithEmoji();

  fs.writeFileSync(`${DIST}${COUNTRIES}.${DO_EMOJI}.${JSON_EXT}`, JSON.stringify(countriesEmoji, false, JSON_TAB) + LF);
  fs.writeFileSync(`${DIST}${COUNTRIES}.${DO_EMOJI}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(countriesEmoji) + LF);
  callback && callback();
});

gulp.task(DO_MIN, function (callback) {
  fs.writeFileSync(`${DIST}${COUNTRIES}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(countries) + LF);
  fs.writeFileSync(`${DIST}${CONTINENTS}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(continents) + LF);
  fs.writeFileSync(`${DIST}${LANGUAGES}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(languages) + LF);
  callback && callback();
});

gulp.task(DO_MINIMAL, function (callback) {
  // Countries: each item is a String country name in English
  const minCountryNames = {};
  Object.keys(countries).forEach(code => {
    minCountryNames[code] = countries[code].name;
  });
  fs.writeFileSync(`${DIST}${DO_MINIMAL}/${COUNTRIES}.en.${DO_MIN}.${JSON_EXT}`, JSON.stringify(minCountryNames) + LF);

  // Countries: each item is an Array of fields in order
  const minCountries = {};
  Object.keys(countries).forEach(code => {
    minCountries[code] = getCountryDataValues(countries[code]);
  });
  fs.writeFileSync(`${DIST}${DO_MINIMAL}/${COUNTRIES}.${DO_MINIMAL}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(minCountries) + LF);

  // Languages: each item is an Array of fields in order
  const minLanguages = {};
  Object.keys(languages).forEach(code => {
    minLanguages[code] = getLanguageDataValues(languages[code]);
  });
  fs.writeFileSync(`${DIST}${DO_MINIMAL}/${LANGUAGES}.${DO_MINIMAL}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(minLanguages) + LF);

  callback && callback();
});

gulp.task(DO_SQL, function (callback) {
  const
    continentFields = [{
      name: 'code',
      type: 'VARCHAR(2)  NOT NULL DEFAULT \'\'',
      unique: true
    }, {
      name: 'name',
      type: 'VARCHAR(15) NOT NULL DEFAULT \'\''
    }],
    countryFields = [{
      name: 'code',
      type: 'VARCHAR(2)  NOT NULL DEFAULT \'\'',
      unique: true
    }, {
      name: 'name',
      type: 'VARCHAR(50) NOT NULL DEFAULT \'\''
    }, {
      name: 'native',
      type: 'VARCHAR(50) NOT NULL DEFAULT \'\''
    }, {
      name: 'phone',
      type: 'VARCHAR(15) NOT NULL DEFAULT \'\''
    }, {
      name: 'continent',
      type: 'VARCHAR(2) NOT NULL DEFAULT \'\'',
      key: true
    }, {
      name: 'capital',
      type: 'VARCHAR(50) NOT NULL DEFAULT \'\''
    }, {
      name: 'currency',
      type: 'VARCHAR(30) NOT NULL DEFAULT \'\''
    }, {
      name: 'languages',
      type: 'VARCHAR(30) NOT NULL DEFAULT \'\''
    }],
    languageFields = [{
      name: 'code',
      type: 'VARCHAR(2)  NOT NULL DEFAULT \'\'',
      unique: true
    }, {
      name: 'name',
      type: 'VARCHAR(50) NOT NULL DEFAULT \'\''
    }, {
      name: 'native',
      type: 'VARCHAR(50) NOT NULL DEFAULT \'\''
    }, {
      name: 'rtl',
      type: 'TINYINT(1) NOT NULL DEFAULT 0'
    }],

    continentList = Object.keys(continents)
      .map(key => {
        return [key, continents[key]];
      }),
    countryList = Object.keys(countries)
      .map(key => getCountryDataValues(countries[key], key)),
    languageList = Object.keys(languages)
      .map(key => getLanguageDataValues(languages[key], key)),

    sql = ''
      // Continents
      + sqlHeader('continents', continentFields)
      + LF + LF
      + sqlValues('continents', continentFields, continentList)
      + LF + LF
      // Languages
      + sqlHeader('languages', languageFields)
      + LF + LF
      + sqlValues('languages', languageFields, languageList)
      + LF + LF
      // Countries
      + sqlHeader('countries', countryFields)
      + LF + LF
      + sqlValues('countries', countryFields, countryList);

  fs.writeFile(`${DIST}${ALL}.${DO_SQL}`, sql + LF, callback);
});

gulp.task('default', DEFAULT_TASKS);


function getCountryDataOrdered(data) {
  const { name, native, phone, continent, capital, currency, languages } = data;

  return {
    name, native, phone, continent, capital, currency, languages
  };
}
function getCountryDataValues(data, key = false) {
  const { name, native, phone, continent, capital, currency, languages } = data;
  const values = [
    name, native, phone, continent, capital, currency, key ? getStringFromArray(languages) : languages
  ];

  if (key) {
    values.unshift(key);
  }

  return values;
}
function getLanguageDataValues(data, key = false) {
  const { name, native, rtl } = data;
  const values = [
    name, native, rtl ? 1 : 0
  ];

  if (key) {
    values.unshift(key);
  }

  return values;
}
function getCountriesWithEmoji() {
  const
    { getEmojiFlag, getUnicode } = require('./emoji-flag'),
    dataWithEmoji = {},
    countryCodes = Object.keys(countries);

  countryCodes.forEach(code => {
    const
      emoji = getEmojiFlag(code),
      emojiU = getUnicode(emoji);

    dataWithEmoji[code] = Object.assign({}, countries[code], {
      emoji,
      emojiU,
    });
  });

  return dataWithEmoji;
}
function getStringFromArray(arr) {
  if (!arr || !arr.length) {
    return '';
  }

  return arr.join(',');
}
function objectValues(item) {
  return Object.keys(item)
    .map(key => item[key]);
}
function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}
function sqlHeader(table, fields) {
  let lines = [
    'DROP TABLE IF EXISTS `' + table + '`;',
    'CREATE TABLE `' + table + '` (',
    '  '
    + fields
      .map(field => '`' + field.name + '` ' + field.type)
      .join(',' + LF + '  ')
    + sqlKeys(fields),
    ') ENGINE=MyISAM DEFAULT CHARSET=utf8;'
  ];

  return lines.join(LF);
}
function sqlKeys(fields) {
  let keys = [];

  fields.forEach(field => {
    let key = false;
    if (field.key || field.unique) {
      let name = '`' + field.name + '`';
      key = 'KEY ' + name + ' (' + name + ')';

      if (field.unique) {
        key = 'UNIQUE ' + key;
      }

      keys.push(key);
    }
  });

  return (keys ? ',' + LF + '  ' : '')
    + keys.join(',' + LF + '  ');
}
function sqlValues(table, fields, values) {
  if (!values || !values.length) {
    return '';
  }

  let lines = [
    'INSERT INTO `' + table + '` (`'
    + fields
      .map(field => field.name)
      .join('`, `')
    + '`) VALUES'
  ],
    valueLines = [];

  values.forEach(values => {
    valueLines.push(
      '  (\''
      + values
        .map(value => {
          if (typeof value === 'string') {
            return value.replace(/'/g, "''");
          }

          return value;
        })
        .join('\', \'')
      + '\')');
  });

  return lines.join(LF)
    + LF
    + valueLines.join(',' + LF)
    + ';';
}
