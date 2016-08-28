'use strict';

const
    NAME = 'countries',
    LF = "\n",
    DO_MIN = 'min',
    DO_MINIMAL = 'minimal',
    DO_SQL = 'sql',
    fs = require('fs'),
    gulp = require('gulp'),
    countries = require('./' + NAME + '.json');

gulp.task(DO_MIN, function (callback) {
    fs.writeFile(`./${NAME}.${DO_MIN}.json`, JSON.stringify(countries) + LF, callback);
});

gulp.task(DO_MINIMAL, function (callback) {
    let minimal = {},
        codes = Object.keys(countries.countries);

    for (let code of codes) {
        minimal[code] = countries.countries[code].name;
    }

    fs.writeFile(`./${NAME}.${DO_MINIMAL}.json`, JSON.stringify(minimal) + LF, callback);
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

        continentList = Object.keys(countries.continents)
            .map(key => {
                return [key, countries.continents[key]];
            }),
        countryList = Object.keys(countries.countries)
            .map(key => {
                let country = countries.countries[key],
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

gulp.task('default', [DO_MIN, DO_MINIMAL, DO_SQL]);


function objectValues(item) {
    return Object.keys(item)
        .map(key => item[key]);
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
