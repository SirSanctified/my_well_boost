import { DataTypes, Model, Deferrable } from "sequelize"
import {sequelize} from "../db/db.js"
import User from "./userModel.js"


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
    }
}, {sequelize})


export default Recommendation
