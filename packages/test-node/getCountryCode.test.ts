import assert from 'node:assert'
import { test } from 'node:test'

import { getCountryCode } from 'src/getCountryCode.ts'

test('getCountryCode()', () => {
  assert.equal(getCountryCode('Ukraine'), 'UA')
  assert.equal(getCountryCode('Україна'), 'UA')
})
