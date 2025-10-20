// biome-ignore-all lint/performance/noDynamicNamespaceImportAccess: test file

import { describe, expect, test } from 'bun:test'
import fs from 'node:fs'
import * as source from 'src/index.ts'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as mjs from '../../dist/mjs/index.js'

const exportDataList: Partial<keyof typeof source>[] = ['continents', 'countries', 'languages']
const exportFnList: Partial<keyof typeof source>[] = ['getEmojiFlag']

function evalIIFE(name = 'Countries') {
  const script = fs.readFileSync('../../dist/index.iife.js', { encoding: 'utf-8' })
  // biome-ignore lint/security/noGlobalEval: -
  eval(`this.${name} = (function () { ${script}\nreturn ${name}})()`)
}

describe('dist', () => {
  test('has proper CJS ES6 export', () => {
    expect(typeof mjs).toBe('object')

    for (const prop of exportFnList) {
      expect(Object.hasOwn(mjs, prop)).toBe(true)
    }

    for (const prop of exportDataList) {
      expect(Object.hasOwn(mjs, prop)).toBe(true)

      const cjsKeys = Object.keys(mjs[prop])
      const srcKeys = Object.keys(source[prop])
      expect(cjsKeys).toEqual(srcKeys)
    }
  })

  test('all English country names should contain only A-Z characters', () => {
    const nameReg = /^[a-z\s.()-]+$/i
    const nonAZ: string[] = []
    for (const c of Object.values(source.countries)) {
      if (!nameReg.test(c.name)) {
        nonAZ.push(c.name)
      }
    }

    // It helps see incorrect names right away in logs
    expect(nonAZ).toEqual([])
  })

  test('loads ES6 <script> properly', () => {
    const context: { Countries?: typeof source } = {}
    evalIIFE.call(context)

    const contextCountries = context.Countries

    expect(contextCountries).toBeTruthy()
    expect(contextCountries).toBeObject()

    for (const prop of exportFnList) {
      expect(contextCountries).toHaveProperty(prop)
    }

    for (const prop of exportDataList) {
      expect(contextCountries).toHaveProperty(prop)

      // biome-ignore lint/style/noNonNullAssertion: -
      const windowProps = Object.keys(contextCountries![prop]) as string[]
      const dataProps = Object.keys(source[prop]) as string[]
      expect(windowProps).toEqual(dataProps)
    }
  })
})
