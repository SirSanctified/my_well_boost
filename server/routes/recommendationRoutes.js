/* eslint-disable import/extensions */
import express from 'express';
import getRecommentationController from '../controllers/getRecommendationController.js';
import { createRecommendation } from '../controllers/recommendationsController.js';
import updateRecommendationController from '../controllers/updateRecommendationController.js';
import getHistoryController from '../controllers/getHistoryController.js';
import dailyActivitiesController from '../controllers/dailyActivitiesController.js';

const recommendationRouter = express.Router();

recommendationRouter
  .get('/:userId', getRecommentationController)
  .post('/new/:userId', createRecommendation)
  .put('/update/:recommendationId', updateRecommendationController)
  .get('/history/:userId', getHistoryController)
  .get('/activities/:userId', dailyActivitiesController);

export default recommendationRouter;
