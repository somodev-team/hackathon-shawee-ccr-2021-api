import express from 'express'
import passport from 'passport'
import { getAuthenticationMiddleware } from './core/middlewares/authentication.middleware'
import { router as usersRouter } from './modules/users/endpoints'
import { router as personProfileRouter } from './modules/person-profile/endpoints'
import { router as companyProfileRouter } from './modules/company-profile/endpoints'
import { router as requestsRouter } from './modules/requests/endpoints'

export function getAppRouter() {
  const router = express.Router()

  // Public routes
  router.use('/users', usersRouter)

  // Private routes
  router.use(getAuthenticationMiddleware())
  router.use(passport.authenticate('jwt', { session: false }))

  router.use('/person-profile', personProfileRouter)
  router.use('/company-profile', companyProfileRouter)

  router.use('/requests', requestsRouter)

  return router
}
