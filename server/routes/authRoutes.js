import express from 'express'
import {registerUserController, activateUserController} from '../controllers/registerUserController.js'
import handleLogout from '../controllers/logoutUserController'
import loginUserController from '../controllers/loginUserController'

const authRouter = express.Router()

authRouter
  .post('/register', registerUserController)
  .post('/activate/:activationToken', activateUserController)
  .get('/logout', handleLogout)
  .post('/login', loginUserController)

export default authRouter
