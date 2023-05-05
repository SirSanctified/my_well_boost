import User from './userModel.js'
import Recommendation from './recommendationModel.js'


User.hasOne(Recommendation, {onDelete: 'CASCADE' })
Recommendation.belongsTo(User, { foreignKey: 'userId'})

export { User, Recommendation }
