'use strict';

const
    NAME = 'countries',
    COMMA = '","',
    LF = "\n",
    QUOTE = '"',

    DO_CSV = 'csv',
    DO_EMOJI = 'emoji',
    DO_MIN = 'min',
    DO_MINIMAL = 'minimal',
    DO_SQL = 'sql',

    JSON_EXT = 'json',
    fs = require('fs'),
    gulp = require('gulp'),
    data = require('./' + NAME + '.json');

gulp.task(DO_CSV, function (callback) {
    const continents = data.continents;
    const countryList = Object.keys(data.countries);
    const csvHeader = QUOTE + 'Code' + COMMA
        + Object.keys(data.countries.UA).map(key => titleCase(key)).join(COMMA)
        + QUOTE;
    const csvData = csvHeader + LF + countryList.map(code => {
        const country = Object.assign({}, data.countries[code]);
        country.continent = continents[country.continent];

        return QUOTE + code + COMMA + objectValues(country).join(COMMA) + QUOTE;
    }).join(LF);

    fs.writeFile(`./${NAME}.${DO_CSV}`, csvData + LF, callback);
});

gulp.task(DO_EMOJI, function (callback) {
    const
        emojiFlag = require('./emoji-flag'),
        dataWithEmoji = Object.assign({}, data, {
            countries: {}
        }),
        {countries} = data,
        countryCodes = Object.keys(countries);

    countryCodes.forEach(code => {
        const
            emoji = emojiFlag.getEmojiFlag(code),
            emojiU = emojiFlag.getUnicode(emoji);

        dataWithEmoji.countries[code] = Object.assign({}, countries[code], {
            emoji,
            emojiU,
        });
    });

    fs.writeFileSync(`./${NAME}.${DO_EMOJI}.${JSON_EXT}`, JSON.stringify(dataWithEmoji, false, 4) + LF);
    fs.writeFileSync(`./${NAME}.${DO_EMOJI}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(dataWithEmoji) + LF);
    callback && callback();
});

gulp.task(DO_MIN, function (callback) {
    fs.writeFile(`./${NAME}.${DO_MIN}.${JSON_EXT}`, JSON.stringify(data) + LF, callback);
});

gulp.task(DO_MINIMAL, function (callback) {
    let minimal = {},
        codes = Object.keys(data.countries);

    for (let code of codes) {
        minimal[code] = data.countries[code].name;
    }

    fs.writeFile(`./${NAME}.${DO_MINIMAL}.${JSON_EXT}`, JSON.stringify(minimal) + LF, callback);
});

gulp.task(DO_SQL, function (callback) {
    let continentFields = [{
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

        continentList = Object.keys(data.continents)
            .map(key => {
                return [key, data.continents[key]];
            }),
        countryList = Object.keys(data.countries)
            .map(key => {
                let country = data.countries[key],
                    values = [key];

                Object.keys(country).forEach(field => {
                    values.push(country[field]);
                });

                return values;
            }),
        sql;

    sql = sqlHeader('continents', continentFields)
        + LF + LF
        + sqlValues('continents', continentFields, continentList)
        + LF + LF
        + sqlHeader('countries', countryFields)
        + LF + LF
        + sqlValues('countries', countryFields, countryList);

    fs.writeFile(`./${NAME}.${DO_SQL}`, sql + LF, callback);
});

gulp.task('default', [DO_CSV, DO_EMOJI, DO_MIN, DO_MINIMAL, DO_SQL]);


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
        +  keys.join(',' + LF + '  ');
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
                .map(value => value.replace(/'/g, "''"))
                .join('\', \'')
            + '\')');
    });

    return lines.join(LF)
        + LF
        + valueLines.join(',' + LF)
        + ';';
}
