import express from 'express'
import {registerUserController, activateUserController} from '../controllers/registerUserController.js'
import { handleLogout } from '../controllers/logoutUserController.js'
import { loginUserController } from '../controllers/loginUserController.js'
import { handleRefreshToken } from '../controllers/refreshTokenController.js'
import { forgotPassword, resetPassword } from '../controllers/passwordResetController.js'

const authRouter = express.Router()

authRouter
  .post('/register', registerUserController)
  .post('/activate', activateUserController)
  .get('/logout', handleLogout)
  .post('/login', loginUserController)
  .get('/refresh-token', handleRefreshToken)
  .post('/forgot-password', forgotPassword)
  .post('/reset-password/:userId/', resetPassword)

export default authRouter
