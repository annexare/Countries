import { expect, test } from 'bun:test'

import { getEmojiFlag } from 'src/getEmojiFlag.ts'

test('getEmojiFlag()', () => {
  expect(getEmojiFlag('UA')).toBe('🇺🇦')
})
