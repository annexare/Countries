import fs from 'node:fs'

import '../../dist/index.iife.d.ts'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as cjs from '../../dist/index.min.js'
import { continents, countries, languages, getEmojiFlag } from 'src/index.ts'

const source = {
  continents,
  countries,
  languages,
  getEmojiFlag,
} as const

const exportDataList: Partial<keyof typeof source>[] = ['continents', 'countries', 'languages']
const exportFnList: Partial<keyof typeof source>[] = ['getEmojiFlag']

describe('dist', () => {
  test('has proper CJS ES6 export', () => {
    expect(typeof cjs).toBe('object')

    for (const prop of exportFnList) {
      expect(cjs).toHaveProperty(prop)
    }

    for (const prop of exportDataList) {
      expect(cjs).toHaveProperty(prop)

      const cjsKeys = Object.keys(cjs[prop])
      const srcKeys = Object.keys(source[prop])
      expect(cjsKeys).toEqual(srcKeys)
    }
  })

  test('all English country names should contain only A-Z characters', () => {
    const nameReg = /^[a-z\s.()-]+$/i
    const nonAZ: string[] = []
    for (const c of Object.values(countries)) {
      if (!nameReg.test(c.name)) {
        nonAZ.push(c.name)
      }
    }

    // It helps see incorrect names right away in logs
    expect(nonAZ).toMatchObject([])
  })

  test('loads ES6 <script> properly', () => {
    const scriptEl = document.createElement('script')
    scriptEl.text = fs.readFileSync('../../dist/index.iife.min.js', { encoding: 'utf-8' })
    document.body.appendChild(scriptEl)

    expect(window.Countries).toBeDefined()

    const winCountries = window.Countries

    for (const prop of exportFnList) {
      expect(winCountries).toHaveProperty(prop)
    }

    for (const prop of exportDataList) {
      expect(winCountries).toHaveProperty(prop)

      const windowProps = Object.keys(winCountries[prop]) as string[]
      const dataProps = Object.keys(source[prop]) as string[]
      expect(windowProps).toEqual(dataProps)
    }
  })
})
