import { TCountryCode } from './types.ts'
import { getCountryDataList } from './getCountryData.ts'

const countryDataList = getCountryDataList()

export const getCountryCode = (countryName: string): TCountryCode | false => {
  // Match exact country name, but case insensitive
  const nameRegex = new RegExp('^' + countryName + '$', 'i')

  return (
    countryDataList.find(({ name, native }) => nameRegex.test(name) || nameRegex.test(native))
      ?.iso2 || false
  )
}
