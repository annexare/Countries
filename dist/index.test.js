const {
  continents,
  countries,
  languages,
  languagesAll,

  getEmojiFlag,
  getUnicode,
} = require('./index.js');

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

test('"continents" has proper type and structure', expectObjectOf(continents, TYPE_STRING));
test('"countries" has proper type and structure', expectObjectOf(countries, TYPE_OBJECT));
test('"languages" has proper type and structure', expectObjectOf(languages, TYPE_OBJECT));
test('"languagesAll" has proper type and structure', expectObjectOf(languagesAll, TYPE_OBJECT));

test('"getEmojiFlag()" empty country code', () => expect(getEmojiFlag()).toBe(''));
test('"getEmojiFlag()" wrong country code', () => expect(getEmojiFlag(42)).toBe(''));
test('"getEmojiFlag()" UA country code properly', () => expect(getEmojiFlag(TEST_COUNTRY_CODE)).toBe(TEST_EMOJI));

test('"getUnicode()" converts properly', () => expect(getUnicode(TEST_EMOJI)).toBe(TEST_EMOJI_U));
