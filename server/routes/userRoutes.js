/* eslint-disable import/extensions */
import express from 'express';
import userDetailsController from '../controllers/userDetailsController.js';
import updateAccountController from '../controllers/updateAccountController.js';
import deleteAccount from '../controllers/deleteAccountController.js';

const userRouter = express.Router();

userRouter
  .get('/:userId', userDetailsController)
  .put('/:userId', updateAccountController)
  .delete('/:userId', deleteAccount);

export default userRouter;
