'use strict';

const
  NAME = 'Countries',
  CONTINENTS = 'continents',
  COUNTRIES = 'countries',
  LANGUAGES = 'languages',
  COMMA = '","',
  LF = "\n",
  QUOTE = '"',

  ALL = 'all',
  DATA = './data/',
  DATA_FILE = 'data',
  DIST = './dist/',

  DO_CSV = 'csv',
  DO_COPY = 'copy',
  DO_DATA = 'data',
  DO_EMOJI = 'emoji',
  DO_MIN = 'min',
  DO_MIN_ES5 = 'es5.min',
  DO_MINIMAL = 'minimal',
  DO_SQL = 'sql',

  JS_EXT = 'js',
  JSON_EXT = 'json',
  JSON_TAB = 2,
  fs = require('fs'),
  gulp = require('gulp'),
  continents = require(DATA + CONTINENTS + '.json'),
  countries = require(DATA + COUNTRIES + '.json'),
  languages = require(DATA + LANGUAGES + '.json'),

  DEFAULT_TASKS = [DO_COPY, DO_CSV, DO_DATA, DO_EMOJI, DO_MINIMAL, DO_MIN, DO_SQL];

const languagesInUse = getLanguagesInUse();


gulp.task('test', function () {
  const unused = [];
  Object.keys(languages).forEach(lang => {
    if (!languagesInUse.hasOwnProperty(lang)) {
      unused.push(lang);
    }
  });

  console.log(`Unused languages: ${unused.length} / ${Object.keys(languages).length}`);
  console.error(JSON.stringify(unused));
  console.info(JSON.stringify(Object.keys(languagesInUse)));
});

gulp.task(DO_COPY, function (callback) {
  fs.writeFileSync(`${DIST}${CONTINENTS}.${JSON_EXT}`, JSON.stringify(continents, false, JSON_TAB) + LF);
  fs.writeFileSync(`${DIST}${COUNTRIES}.${JSON_EXT}`, JSON.stringify(countries, false, JSON_TAB) + LF);
  fs.writeFileSync(`${DIST}${LANGUAGES}.${JSON_EXT}`, JSON.stringify(languagesInUse, false, JSON_TAB) + LF);
  fs.writeFileSync(`${DIST}${LANGUAGES}.${ALL}.${JSON_EXT}`, JSON.stringify(languages, false, JSON_TAB) + LF);
  callback && callback();
});

gulp.task(DO_CSV, function (callback) {
  const countryList = Object.keys(countries);
  const csvHeader = QUOTE + 'Code' + COMMA
    + Object.keys(countries.UA).map(key => titleCase(key)).join(COMMA)
    + QUOTE;
  const csvData = csvHeader + LF + countryList.map(code => {
    const country = Object.assign({}, countries[code]);
    country.continent = continents[country.continent];
    country.languages = getStringFromArray(country.languages);

    return QUOTE + code + COMMA + objectValues(getCountryDataOrdered(country)).join(COMMA) + QUOTE;
  }).join(LF);

  fs.writeFile(`${DIST}${COUNTRIES}.${DO_CSV}`, csvData + LF, callback);
});

gulp.task(DO_DATA, function (callback) {
  const fullData = {
    continents,
    countries: getCountriesWithEmoji(),
    languages: languagesInUse,
  };

  fs.writeFileSync(`${DIST}${DATA_FILE}.${JSON_EXT}`, JSON.stringify(fullData, false, JSON_TAB) + LF);
  fs.writeFileSync(`${DIST}${DATA_FILE}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(fullData) + LF);
  callback && callback();
});

gulp.task(DO_EMOJI, function (callback) {
  const countriesEmoji = getCountriesWithEmoji();

  fs.writeFileSync(`${DIST}${COUNTRIES}.${DO_EMOJI}.${JSON_EXT}`, JSON.stringify(countriesEmoji, false, JSON_TAB) + LF);
  fs.writeFileSync(`${DIST}${COUNTRIES}.${DO_EMOJI}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(countriesEmoji) + LF);
  callback && callback();
});

gulp.task(DO_MIN_ES5, function () {
  const babel = require('gulp-babel');
  const header = require('gulp-header');
  const pkg = require('./package.json');
  const uglify = require('gulp-uglify');
  const webpack = require('webpack-stream');

  const banner = '/*! <%= pkg.name %> v<%= pkg.version %> by Annexare | <%= pkg.license %> */\n';

  return gulp.src('dist/index.js')
    .pipe(webpack({
      output: {
        filename: `index.${DO_MIN_ES5}.${JS_EXT}`,
        libraryTarget: 'umd',
        library: NAME,
        umdNamedDefine: true,
      },
      stats: false
    }))
    .pipe(babel({
      presets: [
        ['env', {
          targets: {
            uglify: true
          }
        }]
      ]
    }))
    .pipe(uglify())
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest('dist/'));
});

gulp.task(DO_MIN, function (callback) {
  fs.writeFileSync(`${DIST}${COUNTRIES}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(countries) + LF);
  fs.writeFileSync(`${DIST}${CONTINENTS}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(continents) + LF);
  fs.writeFileSync(`${DIST}${LANGUAGES}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(languagesInUse) + LF);
  fs.writeFileSync(`${DIST}${LANGUAGES}.${ALL}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(languages) + LF);
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

  // Languages: each item is a String language name in English
  const minLanguageNames = {};
  Object.keys(languagesInUse).forEach(code => {
    minLanguageNames[code] = languagesInUse[code].name;
  });
  fs.writeFileSync(`${DIST}${DO_MINIMAL}/${LANGUAGES}.en.${DO_MIN}.${JSON_EXT}`, JSON.stringify(minLanguageNames) + LF);

  // Languages: each item is an Array of fields in order
  const minLanguages = {};
  Object.keys(languagesInUse).forEach(code => {
    minLanguages[code] = getLanguageDataValues(languagesInUse[code]);
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
    languageList = Object.keys(languagesInUse)
      .map(key => getLanguageDataValues(languagesInUse[key], key)),

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

  fs.writeFile(`${DIST}${DATA_FILE}.${DO_SQL}`, sql + LF, callback);
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

function getLanguagesInUse() {
  const usedList = [];
  Object.keys(countries).forEach(code => {
    const country = countries[code];
    if (country.languages && country.languages.length) {
      country.languages.forEach(lang => {
        if (usedList.indexOf(lang) < 0) {
          usedList.push(lang);
        }
      });
    }
  });

  const languagesInUse = {};
  usedList.sort().forEach(lang => {
    languagesInUse[lang] = Object.assign({}, languages[lang]);
  });

  // const unused = [];
  // Object.keys(languages).forEach(lang => {
  //   if (used.indexOf(lang) < 0) {
  //     unused.push(lang);
  //   }
  // });

  return languagesInUse;
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
