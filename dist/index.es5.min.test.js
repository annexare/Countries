const es5 = require('./index.es5.min.js');
const lib = require('./index.js');

test('has proper ES5 export', () => {
  expect(typeof es5).toBe('object');
  expect(typeof lib).toBe('object');

  Object.keys(lib).forEach(prop => {
    expect(es5.hasOwnProperty(prop)).toBeTruthy();
  });
});
