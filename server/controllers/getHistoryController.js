import { Recommendation } from "../models/associations.js"

export const getHistoryController = async(req, res) => {
  const  {userId } = req.params
  try {
    const recommendation = await Recommendation.findOne({where: {UserId: userId}})
    if (recommendation) {
      const { medicalHistory, healthGoals } = recommendation
      res.status(200).json({medicalHistory, healthGoals})
    } else {
        res.status(200).json({})
    }
  } catch(error) {
    console.error(error)
    res.status(500).json({ "error": error.message })
  }
}