import User from './userModel.js'
import Recommendation from './recommendationModel.js'


User.hasOne(Recommendation, {onDelete: 'CASCADE' })
Recommendation.belongsTo(User)

export { User, Recommendation }
