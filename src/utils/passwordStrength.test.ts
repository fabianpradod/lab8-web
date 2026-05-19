import { calculatePasswordStrength } from './passwordStrength'

describe('calculatePasswordStrength', () => {
  it('returns vacía for empty string', () => {
    expect(calculatePasswordStrength('')).toBe('vacía')
  })

  it('returns débil for password shorter than 8 characters', () => {
    expect(calculatePasswordStrength('abc')).toBe('débil')
  })

  it('returns débil for exactly 7 characters', () => {
    expect(calculatePasswordStrength('abcdefg')).toBe('débil')
  })

  it('returns débil for only symbols but fewer than 8 characters', () => {
    expect(calculatePasswordStrength('!!!!!!!')).toBe('débil')
  })

  it('returns media for exactly 8 characters with no numbers or symbols', () => {
    expect(calculatePasswordStrength('abcdefgh')).toBe('media')
  })

  it('returns media for 8+ characters with no numbers or symbols', () => {
    expect(calculatePasswordStrength('abcdefghi')).toBe('media')
  })

  it('returns fuerte for 8+ characters with at least one number', () => {
    expect(calculatePasswordStrength('abcdefg1')).toBe('fuerte')
  })

  it('returns muy fuerte for 8+ characters with a number and a symbol', () => {
    expect(calculatePasswordStrength('abcdefg1!')).toBe('muy fuerte')
  })
})