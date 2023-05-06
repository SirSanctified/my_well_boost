import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const data_base = process.env.DB_NAME
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

const sequelize = new Sequelize(`postgres://${user}:${password}@localhost:5432/${data_base}`, {dialect: "postgres"})


const connectToDB = async () => {
    console.log(`Authenticating with user ${user}:${password}/${data_base}`)
    try {
        await sequelize.authenticate()
        console.log("Connection to database has been established successfully.")
    } catch (error) {
        console.error("Unable to connect to the database:", error.message)
    }
}

export { sequelize, connectToDB }