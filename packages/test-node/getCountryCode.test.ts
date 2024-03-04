import assert from 'node:assert'
import { test } from 'node:test'

import { getCountryCode } from 'src/getCountryCode.ts'

test('getCountryCode()', () => {
  assert.equal(getCountryCode('Ukraine'), 'UA')
  assert.equal(getCountryCode('uKraine'), 'UA')
  assert.equal(getCountryCode('Україна'), 'UA')
  assert.equal(getCountryCode('уКраїна'), 'UA')

  assert.equal(getCountryCode('Ukrain'), false)
  assert.equal(getCountryCode('Ukraine1'), false)
  assert.equal(getCountryCode('Unknown'), false)
})
