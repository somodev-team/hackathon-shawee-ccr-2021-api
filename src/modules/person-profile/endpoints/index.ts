import express from 'express'
import { personProfileGetController } from './get'
import { personProfileUpdateController } from './update'

const router = express.Router()

router.post(
  '/update',
  personProfileUpdateController.handle.bind(personProfileUpdateController)
)

router.get(
  '/:userId',
  personProfileGetController.handle.bind(personProfileGetController)
)

export { router }
