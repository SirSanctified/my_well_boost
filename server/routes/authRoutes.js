import express from 'express'
import {registerUserController, activateUserController} from '../controllers/registerUserController.js'
import handleLogout from '../controllers/logoutUserController'
import loginUserController from '../controllers/loginUserController'
import handleRefreshToken from '../controllers/refreshTokenController'
import { forgotPassword, resetPassword } from '../controllers/passwordResetController.js'

const authRouter = express.Router()

authRouter
  .post('/register', registerUserController)
  .post('/activate/:activationToken', activateUserController)
  .get('/logout', handleLogout)
  .post('/login', loginUserController)
  .get('/refresh-token', handleRefreshToken)
  .post('/forgot-password', forgotPassword)
  .post('/reset-password:userId/:token', resetPassword)

export default authRouter
