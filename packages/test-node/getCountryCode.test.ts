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

  // Should not care about leading/trailing spaces
  assert.equal(getCountryCode(' Ukraine '), 'UA')

  // More unicode tests
  assert.equal(getCountryCode('မြန်မာ'), 'MM')
  assert.equal(getCountryCode('澳門'), 'MO')

  // Special symbols
  assert.equal(getCountryCode('Myanmar (Burma)'), 'MM')
  assert.equal(getCountryCode('Cocos (Keeling) Islands'), 'CC')
})
