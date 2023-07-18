import { TCountryCode } from './types.ts'
import { getCountryDataList } from './getCountryData.ts'

const countryDataList = getCountryDataList()

export const getCountryCode = (countryName: string): TCountryCode | false =>
  countryDataList.find(({ name, native }) => countryName === name || countryName === native)
    ?.iso2 || false
