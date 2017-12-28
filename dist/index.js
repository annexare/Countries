'use strict';

const continents = require('./continents.json');
const countries = require('./countries.emoji.json');
const languages = require('./languages.json');
const languagesAll = require('./languages.all.json');
const { ucs2 } = require('punycode');
const
  // "Regional Indicator Symbol Letter A" - "Latin Capital Letter A"
  UNICODE_BASE = 127462 - 'A'.charCodeAt(0),
  // Country code should contain exactly 2 uppercase characters from A..Z
  COUNTRY_CODE_REGEX = /^[A-Z]{2}$/;

const getEmojiFlag = (countryCode) => {
  if (!COUNTRY_CODE_REGEX.test(countryCode)) {
    return '';
  }

  return ucs2.encode(
    countryCode
      .split('')
      .map(letter => UNICODE_BASE + letter.charCodeAt(0))
  );
};

const getUnicode = (emoji) => {
  return ucs2.decode(emoji)
    .map(code => 'U+' + Number(code).toString(16).toUpperCase())
    .join(' ');
};

module.exports = {
  continents,
  countries,
  languages,
  languagesAll,

  getEmojiFlag,
  getUnicode,
};
