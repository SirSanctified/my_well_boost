/* eslint-disable import/extensions */
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Recommendation extends Model {}

Recommendation.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  medicalHistory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  healthGoals: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recommendedModifications: {
    type: DataTypes.STRING(1234),
    allowNull: true,
  },
}, { sequelize });

export default Recommendation;
