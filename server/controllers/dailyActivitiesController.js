import { v4 as uuidv4 } from "uuid"
import { Recommendation, DailyActivities, User } from "../models/associations.js"
import { openai } from "./recommendationsController.js"

export const dailyActivitiesController = async (req, res) => {
  const { userId } = req.params
  
  try {
    await DailyActivities.sync({ force: false })

    // check if user with given id already has recommendations and they have not expired
    const dailyActivities = await DailyActivities.findOne({ where: { UserId: userId } })
    const today = new Date().getDate()
    if (dailyActivities && today === dailyActivities?.createdAt.getDate()) {
      let activities = []
      let uncleanActivities = dailyActivities.activities.split('$')
      uncleanActivities.forEach((activity) => {
        if (activity.trim().length > 0) activities.push(activity.trim())
      })
      return res.status(200).json(JSON.stringify(activities))
    }
    const recommendation = await Recommendation.findOne({ where: { UserId: userId } })
    const prompt = `You are a professional health and wellness advicer and I need your help with the activities for today.
    My health history:\n ${recommendation?.medicalHistory}.
    My health goals: ${recommendation?.healthGoals}.
    ${dailyActivities ? `My yesterday's activites were: ${dailyActivities.activities.split('$') }` : '\n'}
    Give me a list of 5 activities for today that will help me achieve my goals. Do not explain. Put a dollar sign at the end of each activity.
    `

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.5,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      })
    
    const result = await DailyActivities.create({
      id: uuidv4(),
      activities: response.data.choices[0].text,
      UserId: userId
    })
    let activities = response.data.choices[0].text.split('$').filter(rec => rec !== '')
    return res.status(200).json(JSON.stringify(activities))
  } catch(err) {
    console.log(err)
    res.status(500).json({"error": "Something went wrong, please try again"})
  }
}