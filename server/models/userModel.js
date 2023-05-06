import { DataTypes, Model, Deferrable } from "sequelize"
import {sequelize} from "../config/db.js"
import Recommendation from "./recommendationModel.js"


class User extends Model {}

User.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {sequelize})


export default User