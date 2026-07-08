import type { ICurrencyData, TCurrencies, TCurrencyCode } from './index'

export const currencies: TCurrencies
export const getCurrency: (code: TCurrencyCode) => ICurrencyData
export const getCurrencyByNumeric: (numeric: string | number) => ICurrencyData | undefined
