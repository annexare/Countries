const fs = require('fs')

const es5 = require('./index.es5.min.js')
const exportList = [
  'continents',
  'countries',
  'languages',
  'languagesAll',
  'getEmojiFlag',
  'getUnicode'
]
const exportDataList = [
  'continents',
  'countries',
  'languages',
  'languagesAll'
]
const data = {
  continents: require('./continents.json'),
  countries: require('./countries.emoji.json'),
  languages: require('./languages.json'),
  languagesAll: require('./languages.all.json')
}

test('has proper ES5 export', () => {
  expect(typeof es5).toBe('object')

  for (const prop of exportList) {
    expect(Object.prototype.hasOwnProperty.call(es5, prop)).toBeTruthy()
  }

  for (const prop of exportDataList) {
    expect(Object.keys(es5[prop])).toEqual(Object.keys(data[prop]))
  }
})

test('loads ES5 <script> properly', () => {
  const scriptEl = document.createElement('script')
  scriptEl.text = fs.readFileSync(__dirname + '/index.es5.min.js')
  document.body.appendChild(scriptEl)

  expect(window.Countries).toBeDefined()

  for (const prop of exportList) {
    expect(Object.prototype.hasOwnProperty.call(window.Countries, prop)).toBeTruthy()
  }

  for (const prop of exportDataList) {
    expect(Object.keys(window.Countries[prop])).toEqual(Object.keys(data[prop]))
  }
})
