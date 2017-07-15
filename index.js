const { getEmojiFlag, getUnicode } = require('./emoji-flag');
const continents = require('./data/continents.json');
const countries = require('./dist/countries.emoji.json');
const languages = require('./data/languages.json');

module.exports = {
  continents,
  countries,
  getEmojiFlag,
  getUnicode,
  languages,
};
