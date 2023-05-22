import express from "express"
import { getRecommentationController } from '../controllers/getRecommendationController.js'
import { createRecommendation } from '../controllers/recommendationsController.js'
import { updateRecommendationController } from '../controllers/updateRecommendationController.js'


const recommendationRouter = express.Router()

recommendationRouter
  .get('/:userId', getRecommentationController)
  .post('/new/:userId', createRecommendation)
  .put('/update/:recommendationId', updateRecommendationController)


export default recommendationRouter
