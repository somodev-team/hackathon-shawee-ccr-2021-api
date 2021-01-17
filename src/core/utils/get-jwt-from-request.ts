import { IJwtObject } from '../middlewares/authentication.middleware'
import jwt from 'jsonwebtoken'

export function getJWTfromRequest(req: any): IJwtObject {
  const token = req.headers?.authorization?.split(' ')[1]
  if (!token) {
    throw Error('Token not found!')
  }
  const tokenData = jwt.decode(token, { json: true }) as IJwtObject
  return tokenData
}
