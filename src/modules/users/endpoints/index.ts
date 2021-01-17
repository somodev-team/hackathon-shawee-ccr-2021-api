import express from 'express'
import { userCreateController } from './create'
import { userLoginController } from './login'

const router = express.Router()

router.post('/create', userCreateController.handle.bind(userCreateController))

router.post('/login', userLoginController.handle.bind(userLoginController))

export { router }
