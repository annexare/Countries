import fs from 'node:fs'
import assert from 'node:assert'
import { describe, it } from 'node:test'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as mjs from '../../dist/mjs/index.js'
import * as source from 'src/index.ts'

const exportDataList: Partial<keyof typeof source>[] = ['continents', 'countries', 'languages']
const exportFnList: Partial<keyof typeof source>[] = ['getEmojiFlag']

function evalIIFE(name = 'Countries') {
  const script = fs.readFileSync('../../dist/index.iife.js', { encoding: 'utf-8' })
  eval(`this.${name} = (function () { ${script}\nreturn ${name}})()`)
}

describe('dist', () => {
  it('has proper CJS ES6 export', () => {
    assert.equal(typeof mjs, 'object')

    for (const prop of exportFnList) {
      assert(Object.hasOwn(mjs, prop))
    }

    for (const prop of exportDataList) {
      assert(Object.hasOwn(mjs, prop))

      const cjsKeys = Object.keys(mjs[prop])
      const srcKeys = Object.keys(source[prop])
      assert.deepEqual(cjsKeys, srcKeys)
    }
  })

  it('all English country names should contain only A-Z characters', () => {
    const nameReg = /^[a-z\s.()-]+$/i
    const nonAZ: string[] = []
    for (const c of Object.values(source.countries)) {
      if (!nameReg.test(c.name)) {
        nonAZ.push(c.name)
      }
    }

    // It helps see incorrect names right away in logs
    assert.deepEqual(nonAZ, [])
  })

  it('loads ES6 <script> properly', () => {
    const context: { Countries?: typeof source } = {}
    evalIIFE.call(context)

    const contextCountries = context.Countries

    assert(contextCountries)

    for (const prop of exportFnList) {
      assert(Object.hasOwn(contextCountries, prop))
    }

    for (const prop of exportDataList) {
      assert(Object.hasOwn(contextCountries, prop))

      const windowProps = Object.keys(contextCountries[prop]) as string[]
      const dataProps = Object.keys(source[prop]) as string[]
      assert.deepEqual(windowProps, dataProps)
    }
  })
})
