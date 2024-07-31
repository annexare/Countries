import { TCountryCode } from './types.ts'
import { getCountryDataList } from './getCountryData.ts'

const countryDataList = getCountryDataList()

export const getCountryCode = (countryName: string): TCountryCode | false => {
  // Escape special RegExp characters
  const name = `${countryName}`
    .trim()
    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
    .replace(/-/g, '\\x2d')

  // Match exact country name, but case insensitive
  const nameRegex = new RegExp('^' + name + '$', 'i')

  return (
    countryDataList.find(({ name, native }) => nameRegex.test(name) || nameRegex.test(native))
      ?.iso2 || false
  )
}
