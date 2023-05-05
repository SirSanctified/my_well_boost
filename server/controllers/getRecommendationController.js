import { Recommendation } from "../models/associations.js"

export const getRecommentationController = async(req, res) => {
  const  {recommendationId } = req.params
  try {
    const recommendation = await Recommendation.findOne({where: {id: recommendationId}})
    if (recommendation) {
      res.status(200).json(recommendation.toJSON())
    } else {
        res.sendStatus(404)
    }
  } catch(error) {
    console.error(error)
    res.sendStatus(500)
  }
}