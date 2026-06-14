/**
 * Generates `packages/countries/src/data/currencies.ts` from authoritative sources.
 *
 * - ISO 4217 numeric codes, minor units and the active currency set come from the
 *   official SIX list (https://www.six-group.com/en/products-services/financial-information/data-standards.html).
 * - Currency name, symbol and native symbol come from Unicode CLDR via the runtime `Intl` APIs.
 *
 * This is a manual, network-dependent refresh tool (like `version.ts`); it is NOT part of
 * `turbo build`. Re-run it when ISO 4217 publishes an update, then review and commit the diff:
 *   cd packages/scripts && bun run generate:currencies
 */
import { countries } from 'countries/data/countries.ts'
import type { ICurrency } from 'countries/types.ts'

// Note: SIX's URL genuinely misspells "currrency" (three r's); the corrected spelling 404s.
const SIX_LIST_ONE =
  'https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml'

/**
 * Codes withdrawn from the current ISO 4217 list (absent from SIX list-one) but still
 * referenced by, or recently used by, country data. Fully specified so their display data
 * stays stable whether or not a country still maps to them.
 * @see https://en.wikipedia.org/wiki/ISO_4217#Historical_codes
 */
const WITHDRAWN: Record<string, ICurrency> = {
  // Netherlands Antillean Guilder -> XCG (Caribbean Guilder)
  ANG: {
    name: 'Netherlands Antillean Guilder',
    native: 'Nederlands-Antilliaanse gulden',
    symbol: 'ANG',
    symbolNative: 'NAf.',
    numeric: '532',
    decimals: 2,
    withdrawn: true,
  },
  // Old Sierra Leonean Leone -> SLE (2022 redenomination)
  SLL: {
    name: 'Sierra Leonean Leone',
    native: 'Sierra Leonean Leone',
    symbol: 'SLL',
    symbolNative: 'SLL',
    numeric: '694',
    decimals: 2,
    withdrawn: true,
  },
  // US Dollar (Same day) — removed from ISO 4217
  USS: {
    name: 'US Dollar (Same day)',
    native: 'US Dollar (Same day)',
    symbol: 'USS',
    symbolNative: 'USS',
    numeric: '998',
    decimals: 2,
    withdrawn: true,
  },
}

const tag = (block: string, name: string): string => {
  // Opening tag must end with `>` or a space+attributes, so `<Ccy>` is not matched by `<CcyNm>`.
  const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`))
  return match ? match[1].trim() : ''
}

const fetchActive = async (): Promise<
  Map<string, { numeric: string; decimals: number; sixName: string }>
> => {
  const res = await fetch(SIX_LIST_ONE)
  if (!res.ok) throw new Error(`SIX list-one fetch failed: ${res.status}`)
  const xml = await res.text()

  const active = new Map<string, { numeric: string; decimals: number; sixName: string }>()
  for (const m of xml.matchAll(/<CcyNtry>([\s\S]*?)<\/CcyNtry>/g)) {
    const block = m[1]
    const code = tag(block, 'Ccy')
    if (!/^[A-Z]{3}$/.test(code) || active.has(code)) continue
    const minor = tag(block, 'CcyMnrUnts')
    active.set(code, {
      numeric: tag(block, 'CcyNbr'),
      decimals: minor === 'N.A.' || minor === '' ? 0 : Number(minor),
      sixName: tag(block, 'CcyNm').replace(/\s+/g, ' '),
    })
  }
  return active
}

// Currency -> representative locale (primary country's main language), for the native symbol.
const buildHomeLocale = (): ((code: string) => string) => {
  const primary = new Map<string, string>()
  const fallback = new Map<string, string>()
  for (const [cc, data] of Object.entries(countries)) {
    const list = data.currency as readonly string[]
    if (list[0] && !primary.has(list[0])) primary.set(list[0], cc)
    for (const cur of list) if (!fallback.has(cur)) fallback.set(cur, cc)
  }
  return (code) => {
    const cc = primary.get(code) ?? fallback.get(code)
    if (!cc) return 'en'
    const lang = (countries[cc as keyof typeof countries].languages as readonly string[])[0]
    return lang ? `${lang}-${cc}` : 'en'
  }
}

const displayNamesCache = new Map<string, Intl.DisplayNames>()
const displayNamesFor = (locale: string): Intl.DisplayNames => {
  let dn = displayNamesCache.get(locale)
  if (!dn) {
    dn = new Intl.DisplayNames([locale], { type: 'currency' })
    displayNamesCache.set(locale, dn)
  }
  return dn
}

const cleanName = (name: string): string =>
  // Drop ICU historic date-range suffixes like "(1964–2022)" (any dash) but keep "(Same day)".
  name.replace(/\s*\(\d{4}[^)]*\d{4}\)\s*$/, '').trim()

const titleCase = (s: string): string =>
  s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())

const nameOf = (code: string, sixName: string): string => {
  try {
    const icu = displayNamesFor('en').of(code)
    if (icu && icu !== code) return cleanName(icu)
  } catch {
    // ICU rejects codes it does not know — fall back to the SIX name.
  }
  return sixName ? titleCase(sixName) : code
}

// Currency name in its home locale's language (falls back to the English name).
const nativeOf = (code: string, locale: string, sixName: string): string => {
  try {
    const icu = displayNamesFor(locale).of(code)
    if (icu && icu !== code) return cleanName(icu)
  } catch {
    // Unknown locale/code — fall back below.
  }
  return nameOf(code, sixName)
}

const symbolOf = (code: string, locale: string): string => {
  try {
    const part = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: code,
      currencyDisplay: 'narrowSymbol',
    })
      .formatToParts(0)
      .find((p) => p.type === 'currency')
    const value = part?.value ?? ''
    // CLDR can return a visually-empty symbol (e.g. CVE native -> U+200B); fall back to the code.
    return /[^\p{White_Space}\p{Cf}\p{Cc}]/u.test(value) ? value : code
  } catch {
    return code
  }
}

const quote = (s: string): string => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`

const main = async (): Promise<void> => {
  const active = await fetchActive()
  const homeLocale = buildHomeLocale()

  const result: Record<string, ICurrency> = {}

  // Active codes: numeric/decimals from ISO 4217, display data from CLDR.
  for (const [code, entry] of active) {
    result[code] = {
      name: nameOf(code, entry.sixName),
      native: nativeOf(code, homeLocale(code), entry.sixName),
      symbol: symbolOf(code, 'en'),
      symbolNative: symbolOf(code, homeLocale(code)),
      numeric: entry.numeric,
      decimals: entry.decimals,
    }
  }

  // Withdrawn codes: fully specified, no reliable country to derive from.
  for (const [code, currency] of Object.entries(WITHDRAWN)) {
    if (!result[code]) result[code] = currency
  }

  const codes = Object.keys(result).sort()
  const body = codes
    .map((code) => {
      const c = result[code]
      const lines = [
        `  ${code}: {`,
        `    name: ${quote(c.name)},`,
        `    native: ${quote(c.native)},`,
        `    symbol: ${quote(c.symbol)},`,
        `    symbolNative: ${quote(c.symbolNative)},`,
        `    numeric: ${quote(c.numeric)},`,
        `    decimals: ${c.decimals},`,
      ]
      if (c.withdrawn) lines.push('    withdrawn: true,')
      lines.push('  },')
      return lines.join('\n')
    })
    .join('\n')

  const file = `import type { ICurrency } from '../types.ts'

export const currencies = {
${body}
} as const satisfies Record<string, ICurrency>
`

  const inUse = new Set<string>()
  for (const data of Object.values(countries))
    for (const cur of data.currency as readonly string[]) inUse.add(cur)
  const missing = [...inUse].filter((c) => !result[c]).sort()
  if (missing.length > 0) {
    // Fail before writing — never emit a table missing codes that countries reference.
    throw new Error(`In-use currency codes missing from generated table: ${missing.join(', ')}`)
  }

  await Bun.write('../countries/src/data/currencies.ts', file)

  console.log(
    `ISO 4217: ${active.size} active + ${Object.keys(WITHDRAWN).length} withdrawn = ${codes.length} total`
  )
  console.log(`In use by countries: ${inUse.size}`)
  console.log('Wrote ../countries/src/data/currencies.ts')
}

await main()
