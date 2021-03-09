export const getCountryDataCsv = (
  { name, native, phone, continent, capital, currency, languages }: ICountryCsv,
  joinWith: string
) => [name, native, phone, continent, capital, currency, languages].join(joinWith)

export const getLanguagesInUse = (
  countries: Record<string, ICountry>,
  languagesAll: Record<string, ILanguage>
) => {
  const usedList: string[] = []
  Object.keys(countries).forEach((code) => {
    const country = countries[code]
    if (country.languages && country.languages.length) {
      country.languages.forEach((lang) => {
        if (usedList.indexOf(lang) < 0) {
          usedList.push(lang)
        }
      })
    }
  })

  const languagesInUse: Record<string, ILanguage> = {}
  usedList.sort().forEach((lang) => {
    languagesInUse[lang] = Object.assign({}, languagesAll[lang])
  })

  // const unused = [];
  // Object.keys(languages).forEach(lang => {
  //   if (used.indexOf(lang) < 0) {
  //     unused.push(lang);
  //   }
  // });

  return languagesInUse
}

export const getStringFromArray = (arr: string[]) => {
  if (!arr || !arr.length) {
    return ''
  }

  return arr.join(',')
}

export const getTitleCase = (text: string): string => {
  let result = text.toLowerCase().split(' ')

  for (let i = 0; i < result.length; i++) {
    result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1)
  }

  return result.join(' ')
}
