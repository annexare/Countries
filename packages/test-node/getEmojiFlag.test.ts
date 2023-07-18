import { getEmojiFlag } from 'src/getEmojiFlag.ts'

test('getEmojiFlag()', () => {
  expect(getEmojiFlag('UA')).toBe('🇺🇦')
})
