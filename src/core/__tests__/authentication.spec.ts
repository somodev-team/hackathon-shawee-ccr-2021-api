import {
  verifyCallback,
  getAuthenticationMiddleware,
  JWT_SECRET,
} from '../middlewares/authentication.middleware'

describe('CORE Authentication', () => {
  it('should export string on JWT_SECRET const', () => {
    expect(typeof JWT_SECRET).toBe('string')
  })

  it('getAuthenticationMiddleware should return function', () => {
    expect(typeof getAuthenticationMiddleware()).toBe('function')
  })

  it('verifyCallback should not throw any error', () => {
    expect(
      verifyCallback('jwt-token', () => {
        return true
      })
    ).toBeTruthy()
  })
})
