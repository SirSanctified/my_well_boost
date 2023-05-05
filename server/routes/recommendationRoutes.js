import express from "express"
import { getRecommentationController } from '../controllers/getRecommendationController.js'
import { createRecommendation } from '../controllers/recommendationsController.js'
import { updateRecommentationController } from '../controllers/updateRecommendationController.js'


const recommendationRouter = express.Router()

recommendationRouter
  .get('/:recommendationId', getRecommentationController)
  .post('/new', createRecommendation)
  .put('/update:recommendationId', updateRecommentationController)


export default recommendationRouter
