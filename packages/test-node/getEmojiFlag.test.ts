import assert from 'node:assert'
import { test } from 'node:test'

import { getEmojiFlag } from 'src/getEmojiFlag.ts'

test('getEmojiFlag()', () => {
  assert.equal(getEmojiFlag('UA'), '🇺🇦')
})
