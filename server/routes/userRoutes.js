import express from 'express'
import {registerUserController, activateUserController} from '../controllers/registerUserController.js'

const router = express.Router()

router
.post('/register', registerUserController)
.post('/activate/:activationToken', activateUserController)

export default router
