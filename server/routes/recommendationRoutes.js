import express from "express"
import getRecommendationController from '../controllers/getRecommendationController'
import createRecommendation from '../controllers/recommendationsController'
import updateRecommentationController from '../controllers/updateRecommendationController'


const recommendationRouter = express.Router()

router
  .get('/:recommendationId', getRecommendationController)
  .post('/new', createRecommendation)
  .put('/update:recommendationId', updateRecommentationController)


export default recommendationRouter
