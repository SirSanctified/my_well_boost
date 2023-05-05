import express from 'express'
import { userDetailsController } from '../controllers/userDetailsController.js'
import { updateAccountController } from '../controllers/updateAccountController.js'
import { deleteAccountController } from '../controllers/deleteAccountController.js'

const userRouter = express.Router()

userRouter
  .get('/:userId', userDetailsController)
  .put('/:userId', updateAccountController)
  .delete('/:userId', deleteAccountController)

export default userRouter
