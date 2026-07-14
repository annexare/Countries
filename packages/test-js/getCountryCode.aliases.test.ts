import { expect, test } from 'bun:test'

import { getCountryCode } from '../countries/src/getCountryCode.ts'
import { getCountryDataList } from '../countries/src/getCountryData.ts'
import type { TCountryCode } from '../countries/src/types.ts'

test('getCountryCode() resolves alternative and former names', () => {
  expect(getCountryCode('Turkey')).toBe('TR')
  expect(getCountryCode('Cape Verde')).toBe('CV')
  expect(getCountryCode('Swaziland')).toBe('SZ')
  expect(getCountryCode('Macedonia')).toBe('MK')
  expect(getCountryCode('Burma')).toBe('MM')
  expect(getCountryCode('Myanmar (Burma)')).toBe('MM') // previously the name; kept resolvable
  expect(getCountryCode('Zaire')).toBe('CD')
  expect(getCountryCode('UK')).toBe('GB')
  expect(getCountryCode('America')).toBe('US')
  expect(getCountryCode('Holland')).toBe('NL')
  expect(getCountryCode('Persia')).toBe('IR')
  expect(getCountryCode('Ceylon')).toBe('LK')
})

test('getCountryCode() resolves colonial-era names and spelling variants', () => {
  expect(getCountryCode('Rhodesia')).toBe('ZW')
  expect(getCountryCode('Abyssinia')).toBe('ET')
  expect(getCountryCode('Gold Coast')).toBe('GH')
  expect(getCountryCode('Formosa')).toBe('TW')
  expect(getCountryCode('Byelorussia')).toBe('BY')
  expect(getCountryCode('Rumania')).toBe('RO')
  expect(getCountryCode("Cote d'Ivoire")).toBe('CI') // diacritic-free form of the native name
})

test('getCountryCode() alias matching is case-insensitive and trims', () => {
  expect(getCountryCode('  czech republic ')).toBe('CZ')
  expect(getCountryCode('BURMA')).toBe('MM')
})

test('getCountryCode() still returns false for unknown names', () => {
  expect(getCountryCode('Atlantis')).toBe(false)
})

test('every alias resolves to its own country', () => {
  for (const country of getCountryDataList()) {
    for (const alias of country.alias ?? []) {
      expect(getCountryCode(alias)).toBe(country.iso2)
    }
  }
})

// Guard against false-positives: no lookup string may resolve to more than one country.
// Every name, native name and alias must be unambiguous, so a returned code is trusted.
test('no name, native, or alias is ambiguous across countries', () => {
  const owners = new Map<string, TCountryCode>()
  const claim = (value: string, code: TCountryCode, kind: string) => {
    const key = value.trim().toLowerCase()
    const existing = owners.get(key)
    expect(
      existing === undefined || existing === code,
      `"${value}" (${kind}) maps to ${existing} and ${code}`
    ).toBe(true)
    owners.set(key, code)
  }

  for (const country of getCountryDataList()) {
    claim(country.name, country.iso2, 'name')
    claim(country.native, country.iso2, 'native')
    for (const alias of country.alias ?? []) claim(alias, country.iso2, 'alias')
  }
})
