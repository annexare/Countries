import { currencies } from './data/currencies.ts'
import type { ICurrency, ICurrencyData, TCurrencyCode } from './types.ts'

export const getCurrency = (code: TCurrencyCode): ICurrencyData => ({
  ...currencies[code],
  code,
})

// ISO 4217 numeric code -> alpha-3 code, in a null-prototype map so arbitrary input
// (e.g. '__proto__', 'constructor') can't resolve to inherited properties. Active codes
// win over withdrawn ones sharing a numeric (e.g. 532 resolves to XCG, not withdrawn ANG).
const numericIndex: Record<string, TCurrencyCode> = Object.create(null)
for (const code of Object.keys(currencies) as TCurrencyCode[]) {
  const { numeric, withdrawn }: ICurrency = currencies[code]
  if (!withdrawn || numericIndex[numeric] === undefined) {
    numericIndex[numeric] = code
  }
}

export const getCurrencyByNumeric = (numeric: string | number): ICurrencyData | undefined => {
  const key = String(numeric).padStart(3, '0')
  const code = /^\d{3}$/.test(key) ? numericIndex[key] : undefined
  return code ? getCurrency(code) : undefined
}
