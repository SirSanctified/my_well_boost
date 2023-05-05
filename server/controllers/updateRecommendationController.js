import {Recommendation} from "../models/associations.js"

export const updateRecommentationController = async(req, res) => {
  const  {recommendationId } = req.params
  try {
    const recommendation = await Recommendation.findOne({where: {id: recommendationId}})
    if (recommendation) {
      await recommendation.update({...req.body})
      res.sendStatus(200)
    }
  } catch(error) {
    console.error(error)
    res.sendStatus(500)
  }
}