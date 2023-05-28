import { Recommendation } from "../models/associations.js"
import { v4 as uuidv4 } from "uuid"

export const getRecommentationController = async(req, res) => {
  const  {userId } = req.params
  try {
    const recommendation = await Recommendation.findOne({where: {UserId: userId}})
    if (recommendation) {
      const recommendations = recommendation.recommendedModifications.split('$').filter(rec => rec !== '')
      res.status(200).json(recommendations)
    } else {
        res.sendStatus(404)
    }
  } catch(error) {
    console.error(error)
    res.status(500).json({ "error": error.message })
  }
}