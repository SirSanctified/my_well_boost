import User from './userModel.js'
import Recommendation from './recommendationModel.js'
import DailyActivities from './dailyActivitiesModel.js'


User.hasOne(Recommendation, {onDelete: 'CASCADE' })
User.hasOne(DailyActivities, {onDelete: 'CASCADE'})
Recommendation.belongsTo(User)
DailyActivities.belongsTo(User)

export { User, Recommendation, DailyActivities }
