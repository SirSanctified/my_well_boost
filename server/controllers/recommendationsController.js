import {v4 as uuidv4} from "uuid"
import dotenv from "dotenv"
import { User, Recommendation } from "../models/associations.js"
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)


const promptGPT = async(history, goals, age, gender) => {
  // must be called inside a try-catch block
  const prompt = `I am a ${gender} aged ${age} and ${history}. My health goals are ${goals}.\
  Give a list of lifestyle modifications I need to make to achieve my goals, \
  give a brief explanation of each recommendation and why you recommended it.
  Delimit each recommendation with two consecutive colons.`

  const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `${prompt}`,
  temperature: 0.7,
  max_tokens: 3000,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0,
  })
  return response.data.choices[0].text
}


export const createRecommendation = async(req, res) => {
    const { medicalHistory, healthGoals } = req.body
    const { userId } = req.params

    try {
        const recommendation = await Recommendation.create({
            id: uuidv4(),
            medicalHistory: medicalHistory,
            healthGoals: healthGoals
        })
        const user = await User.findOne({ where: { id: userId } })
        const today = new Date()
        const age = today.getFullYear() - parseInt(user.dateOfBirth.split("-")[0])
        // make an api call to openAI
        const recommendedModifications = await promptGPT(medicalHistory, healthGoals, age, user.gender)
        recommendation.recommendedModifications = recommendedModifications
        await recommendation.save()
        user.setRecommendation(recommendation)
        await user.save()
        const recommendations = recommendedModifications.split("::")
        res.status(201).json({ "recommendations": recommendations})
    } catch (error) {
        res.sendStatus(500)
        console.error(error)
    }
}