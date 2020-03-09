const {
  continents,
  countries,
  languages,
  languagesAll,

  getEmojiFlag,
  getUnicode,
} = require('./index.js');

const countries2to3 = require('./countries2to3.json')
const countries3to2 = require('./countries3to2.json')

const TYPE_OBJECT = 'object';
const TYPE_STRING = 'string';
const TEST_COUNTRY_CODE = 'UA';
const TEST_EMOJI = '🇺🇦';
const TEST_EMOJI_U = 'U+1F1FA U+1F1E6';

const expectObjectOf = (data, dataType) => () => {
  expect(typeof data).toBe(TYPE_OBJECT);

  Object.keys(data).forEach(key => {
    expect(typeof data[key]).toBe(dataType);
  })
}

const expectToHaveKeysOf = (data, keyList, dataType) => () => {
  keyList.forEach(key => {
    expect(typeof data[key]).toBe(dataType);
  })

  Object.keys(data).forEach(dataKey => {
    expect(keyList.includes(dataKey)).toBe(true);
  })
}

const countryCodeList = Object.keys(countries)

test('"continents" has proper type and structure', expectObjectOf(continents, TYPE_STRING));
test('"countries" has proper type and structure', expectObjectOf(countries, TYPE_OBJECT));
test('"languages" has proper type and structure', expectObjectOf(languages, TYPE_OBJECT));
test('"languagesAll" has proper type and structure', expectObjectOf(languagesAll, TYPE_OBJECT));

test('"getEmojiFlag()" empty country code', () => expect(getEmojiFlag()).toBe(''));
test('"getEmojiFlag()" wrong country code', () => expect(getEmojiFlag(42)).toBe(''));
test('"getEmojiFlag()" UA country code properly', () => expect(getEmojiFlag(TEST_COUNTRY_CODE)).toBe(TEST_EMOJI));

test('"getUnicode()" converts properly', () => expect(getUnicode(TEST_EMOJI)).toBe(TEST_EMOJI_U));

test('"countries2to3" has proper type and structure', expectObjectOf(countries2to3, TYPE_STRING));
test('"countries2to3" has proper list of keys', expectToHaveKeysOf(countries2to3, countryCodeList, TYPE_STRING));

test('"countries3to2" has proper type and structure', expectObjectOf(countries3to2, TYPE_STRING));
test('"countries3to2" has proper list of keys', expectToHaveKeysOf(countries3to2, Object.values(countries2to3), TYPE_STRING));
