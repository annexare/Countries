import fs from 'fs'

import * as es5Import from './index.es5.min.js'

interface IData {
  [key: string]: any
}

interface IExport {
  [key: string]: IData
}

const exportList = ['getEmojiFlag']
const exportDataList = ['continents', 'countries', 'languages', 'languagesAll']
const data: IExport = {
  continents: require('./continents.min.json'),
  countries: require('./countries.min.json'),
  languages: require('./languages.min.json'),
  languagesAll: require('./languages.all.min.json'),
}

const es5 = es5Import as IExport

test('has proper ES5 export', () => {
  expect(typeof es5).toBe('object')

  for (const prop of exportList) {
    expect(es5).toHaveProperty(prop)
  }

  for (const prop of exportDataList) {
    expect(es5).toHaveProperty(prop)

    const es5Props = Object.keys(es5[prop]) as string[]
    const dataProps = Object.keys(data[prop]) as string[]
    expect(es5Props).toEqual(dataProps)
  }
})

test('loads ES5 <script> properly', () => {
  const scriptEl = document.createElement('script')
  scriptEl.text = fs.readFileSync(__dirname + '/index.es5.min.js', { encoding: 'utf-8' })
  document.body.appendChild(scriptEl)

  expect(window.Countries).toBeDefined()

  const winCountries = window.Countries as IExport

  for (const prop of exportList) {
    expect(winCountries).toHaveProperty(prop)
  }

  for (const prop of exportDataList) {
    expect(winCountries).toHaveProperty(prop)

    const windowProps = Object.keys(winCountries[prop]) as string[]
    const dataProps = Object.keys(data[prop]) as string[]
    expect(windowProps).toEqual(dataProps)
  }
})
