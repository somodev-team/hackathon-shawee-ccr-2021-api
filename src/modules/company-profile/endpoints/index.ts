import express from 'express'
import { companyProfileGetController } from './get'
import { companyProfileListController } from './list'
import { companyProfileUpdateController } from './update'

const router = express.Router()

router.post(
  '/update',
  companyProfileUpdateController.handle.bind(companyProfileUpdateController)
)

router.get(
  '/list',
  companyProfileListController.handle.bind(companyProfileListController)
)

router.get(
  '/:userId',
  companyProfileGetController.handle.bind(companyProfileGetController)
)

export { router }
