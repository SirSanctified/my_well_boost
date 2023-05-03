import { DataTypes, Model, Deferrable } from "sequelize"
import {sequelize} from "../db/db.js"


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
    allergies: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    healthGoals: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recommendedModifications: {
        type: DataTypes.STRING(1234),
        allowNull: true,
    }
}, {sequelize})

export default Recommendation
