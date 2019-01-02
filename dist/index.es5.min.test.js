const fs = require('fs');
const es5 = require('./index.es5.min.js');
const lib = require('./index.js');

test('has proper ES5 export', () => {
  expect(typeof es5).toBe('object');
  expect(typeof lib).toBe('object');

  Object.keys(lib).forEach(prop => {
    expect(es5.hasOwnProperty(prop)).toBeTruthy();
  });
});

test('loads ES5 <script> properly', () => {
  const scriptEl = document.createElement('script');
  scriptEl.text = fs.readFileSync(__dirname + '/index.es5.min.js');
  document.body.appendChild(scriptEl);

  expect(window.Countries).toBeDefined();

  Object.keys(lib).forEach(prop => {
    expect(window.Countries.hasOwnProperty(prop)).toBeTruthy();
  });
});
