import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'
import recommendationRouter from './routes/recommendationRoutes.js'
import authRouter from './routes/authRoutes.js'
import {connectToDB} from './config/db.js'
import { verifyJWT } from './middleware/verifyJWT.js'


const app = express()
const port = process.env.PORT || 4500
connectToDB()
dotenv.config()
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/auth', authRouter)
app.use(verifyJWT)
app.use('/users', userRouter)
app.use('/recommendations', recommendationRouter)

app.listen(port, () => {console.log(`Server started listening on http://localhost:${port}`);})