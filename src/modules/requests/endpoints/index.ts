import express from 'express'
import { requestAcceptController } from './accept'
import { requestCreateController } from './create'

const router = express.Router()

router.post(
  '/create',
  requestCreateController.handle.bind(requestCreateController)
)

router.post(
  '/accept',
  requestAcceptController.handle.bind(requestAcceptController)
)

export { router }
