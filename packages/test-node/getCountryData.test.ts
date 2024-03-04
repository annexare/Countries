import assert from 'node:assert'
import { test } from 'node:test'

import { countries } from 'src/data/countries.ts'
import { getCountryData, getCountryDataList } from 'src/getCountryData.ts'

test('getCountryData()', () => {
  const countryDataUA = getCountryData('UA')

  assert.equal(countryDataUA.iso2, 'UA')
  assert.equal(countryDataUA.iso3, 'UKR')
  assert.equal(countryDataUA.name, 'Ukraine')
})

test('getCountryDataList()', () => {
  const countryDataList = getCountryDataList()
  const countryCodeList = Object.keys(countries)

  assert.equal(countryDataList.length, countryCodeList.length)

  for (const countryData of countryDataList) {
    assert.equal(typeof countryData, 'object')
    assert(countryData.iso2)
    assert(countryData.iso3)
    assert(countryData.name)
  }
})
