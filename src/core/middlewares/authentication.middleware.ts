import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UserTypeType } from '../../modules/users/user.model'

export const JWT_SECRET = `${process.env.JWT_SECRET}`

export interface IJwtObject {
  user: {
    id: string
    username: string
    type: UserTypeType
    profileDone: boolean
  }
}

export const verifyCallback = (jwt_payload: any, next: any) => {
  return next(null, jwt_payload)
}

export function getAuthenticationMiddleware() {
  const strategy = new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    verifyCallback
  )

  passport.use(strategy)
  return passport.initialize()
}
