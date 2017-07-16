'use strict';

const continents = require('./continents.json');
const countries = require('./countries.emoji.json');
const languages = require('./languages.json');
const languagesAll = require('./languages.all.json');
const { getEmojiFlag, getUnicode } = require('../emoji-flag');

module.exports = {
  continents,
  countries,
  languages,
  languagesAll,

  getEmojiFlag,
  getUnicode,
};
