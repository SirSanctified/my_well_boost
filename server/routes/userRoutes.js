import express from 'express'
import userDetailsController from '../controllers/userDetailsController'
import updateAccountController from '../controllers/updateAccountController'
import deleteAccountController from '../controllers/deleteAccountController'

const userRouter = express.Router()

userRouter
  .get('/:userId', userDetailsController)
  .put('/:userId', updateAccountController)
  .delete('/:userId', deleteAccountController)

export default userRouter
