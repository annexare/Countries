const { getEmojiFlag, getUnicode } = require('./emoji-flag');
const continents = require('./dist/continents.json');
const countries = require('./dist/countries.emoji.json');
const languages = require('./dist/languages.json');

module.exports = {
  continents,
  countries,
  getEmojiFlag,
  getUnicode,
  languages,
};
