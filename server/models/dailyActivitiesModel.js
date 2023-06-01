/* eslint-disable import/extensions */
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

export default class DailyActivities extends Model {}

DailyActivities.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  activities: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, { sequelize });
