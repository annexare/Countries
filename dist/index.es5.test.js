const fs = require('fs')

const es5 = require('./index.es5.min.js')

const exportList = ['continents', 'countries', 'languages', 'languagesAll', 'getEmojiFlag']
const exportDataList = ['continents', 'countries', 'languages', 'languagesAll']
const data = {
  continents: require('./continents.min.json'),
  countries: require('./countries.emoji.min.json'),
  languages: require('./languages.min.json'),
  languagesAll: require('./languages.all.min.json'),
}

test('has proper ES5 export', () => {
  expect(typeof es5).toBe('object')

  for (const prop of exportList) {
    expect(es5).toHaveProperty(prop)
  }

  for (const prop of exportDataList) {
    expect(Object.keys(es5[prop])).toEqual(Object.keys(data[prop]))
  }
})

test('loads ES5 <script> properly', () => {
  const scriptEl = document.createElement('script')
  scriptEl.text = fs.readFileSync(__dirname + '/index.es5.min.js', { encoding: 'utf-8' })
  document.body.appendChild(scriptEl)

  expect(window.Countries).toBeDefined()

  for (const prop of exportList) {
    expect(window.Countries).toHaveProperty(prop)
  }

  for (const prop of exportDataList) {
    expect(Object.keys(window.Countries[prop])).toEqual(Object.keys(data[prop]))
  }
})
