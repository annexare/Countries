const
  // "Regional Indicator Symbol Letter A" - "Latin Capital Letter A"
  UNICODE_BASE = 127462 - 'A'.charCodeAt(0),
  // Country code should contain exactly 2 uppercase characters from A..Z
  COUNTRY_CODE_REGEX = /^[A-Z]{2}$/,

  punycode = require('punycode');

const getEmojiFlag = (countryCode) => {
  if (!COUNTRY_CODE_REGEX.test(countryCode)) {
    return '';
  }

  return punycode.ucs2.encode(
    countryCode
      .split('')
      .map(letter => UNICODE_BASE + letter.charCodeAt(0))
  );
};

const getUnicode = (emoji) => {
  return punycode.ucs2.decode(emoji)
    .map(code => 'U+' + Number(code).toString(16).toUpperCase())
    .join(' ');
};

module.exports = {
  getEmojiFlag,
  getUnicode,
};
