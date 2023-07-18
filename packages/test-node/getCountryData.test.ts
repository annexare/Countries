import countries from 'src/data/countries.ts'
import { getCountryData, getCountryDataList } from 'src/getCountryData.ts'

test('getCountryData()', () => {
  const countryDataUA = getCountryData('UA')

  expect(countryDataUA.iso2).toBe('UA')
  expect(countryDataUA.iso3).toBe('UKR')
  expect(countryDataUA.name).toBe('Ukraine')
})

test('getCountryDataList()', () => {
  const countryDataList = getCountryDataList()
  const countryCodeList = Object.keys(countries)

  expect(countryDataList).toHaveLength(countryCodeList.length)

  for (const countryData of countryDataList) {
    expect(typeof countryData).toBe('object')
    expect(countryData.iso2).toBeTruthy()
    expect(countryData.iso3).toBeTruthy()
    expect(countryData.name).toBeTruthy()
  }
})
