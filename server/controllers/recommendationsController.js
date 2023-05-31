import {v4 as uuidv4} from "uuid"
import dotenv from "dotenv"
import { User, Recommendation } from "../models/associations.js"
import { Configuration, OpenAIApi } from 'openai'
import { sequelize } from "../config/db.js"

dotenv.config()


const configuration = new Configuration({
  apiKey: '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' //process.env.OPENAI_API_KEY,
})

export const openai = new OpenAIApi(configuration)


export const promptGPT = async(history, goals, age, gender) => {
  // must be called inside a try-catch block
  const prompt = `You are a professional health and wellness advicer and I need your help.
  I am a ${gender} aged ${age} and this is my health history:\n ${history}.
  My health goals: ${goals}.
  Give me a list of lifestyle modifications I need to make to achieve my goals. Give a brief explanation of each recommendation and why you recommended it.
  Put a dollar sign at the end of each explanation.`

  const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `${prompt}`,
  temperature: 0.5,
  max_tokens: 3000,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0,
  })
  return response.data.choices[0].text
}


export const createRecommendation = async(req, res) => {
    const { healthHistory, healthGoals } = req.body
    const { userId } = req.params

    try {
      await Recommendation.sync({force: false})
      const recommendation = await Recommendation.create({
        id: uuidv4(),
        medicalHistory: healthHistory,
        healthGoals: healthGoals
      })
      const user = await User.findOne({ where: { id: userId } })
      const today = new Date()
      const age = today.getFullYear() - parseInt(user.dateOfBirth.split("-")[0])
      // make an api call to openAI
      const recommendedModifications = await promptGPT(healthHistory, healthGoals, age, user.gender)
      recommendation.recommendedModifications = recommendedModifications
      await recommendation.save()
      user.setRecommendation(recommendation)
      await user.save()
      const recommendations = recommendedModifications.split("$")
      const cleanRecommendations = []
      recommendations.forEach((rec) => {
        if (rec.trim().length > 0) cleanRecommendations.push(rec.trim())
      })
      res.status(201).json(JSON.stringify(cleanRecommendations))
    } catch (error) {
        res.status(500).json({ "error": error.message})
        console.error(error)
    }
}