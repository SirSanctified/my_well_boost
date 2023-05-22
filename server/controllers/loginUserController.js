import {User} from "../models/associations.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config()


const createJWTs = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_ACCESS,
    { expiresIn: "1h", },
  )
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_REFRESH,
    { expiresIn: "30d", }
  )
  return {
    accessToken: accessToken,
    refreshToken: refreshToken
  }
}


export const loginUserController = async (req, res) => {
  const {email, password} = req.body
  // check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({error: "Please provide email and password"})
  }
  // check if user with given email exists in the database
  try {
    const user = await User.findOne({where: {email: email}})
    if (!user) return res.sendStatus(401)
    // check if user has verified email address
    if (!user.active) return res.status(400).json({"error": "Please verify your email address first"})
    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({error: "Incorrect email or password"})
    }
    // create access token and refresh token
    const { accessToken, refreshToken } = createJWTs(user)
    
    // save refresh token in the database
    user.refreshToken = refreshToken
    await user.save()

    // send refresh token as httponly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    // send response
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
    }
    res.status(200).json({ "token": accessToken, "user": userData })
  } catch (error) {
    res.status(500).json({ "error": error.message, })
    console.error(error.message)
  }
}
