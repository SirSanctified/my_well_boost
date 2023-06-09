/* eslint-disable no-console */
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(`postgres://${user}:${password}@localhost:5432/${database}`, { dialect: 'postgres', logging: false });

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
};

export { sequelize, connectToDB };
