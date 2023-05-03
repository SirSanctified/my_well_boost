import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/userRoutes.js'
import {connectToDB} from './db/db.js'


const app = express()
const port = process.env.PORT || 4500
connectToDB()
dotenv.config()
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/auth', router)

app.listen(port, () => {console.log(`Server started listening on http://localhost:${port}`);})