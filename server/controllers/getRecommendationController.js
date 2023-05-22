import { Recommendation } from "../models/associations.js"
import { v4 as uuidv4 } from "uuid"

export const getRecommentationController = async(req, res) => {
  const  {userId } = req.params
  try {
    const recommendation = await Recommendation.findOne({where: {UserId: userId}})
    if (recommendation) {
      const cleanRecommendations = {
        healthHistory: recommendation.healthHistory,
        healthGoals: recommendation.healthGoals,
        recommendations: recommendation.recommendedModifications.split("$").forEach((rec) => {
          return {recommendation: rec, id: uuidv4()}
        })
      }

      res.status(200).json(cleanRecommendations)
    } else {
        res.sendStatus(404)
    }
  } catch(error) {
    console.error(error)
    res.status(500).json({ "error": error.message })
  }
}