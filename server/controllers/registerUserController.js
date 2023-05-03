import {sequelize} from "../db/db.js"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import {v4 as uuidv4} from "uuid"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import dotenv from "dotenv"


dotenv.config()

const sendEmail = (user, activationLink) => {
  //create a nodemailer transport
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  // email options
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Account activation link",
    html: `
      <h1>Please click on the link to activate your account</h1>
      <hr />
       <p>Do not share this link with anyone else</p>
      <a href="${activationLink}">${activationLink}</a>
    `,
  }
  // send email
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
}


const createActivationLink = async (user) => {
     // create onetime activation link
     const activationToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET_ACTIVATION,
      {
        expiresIn: "30m",
      }
    )
    const activationLink = `http://localhost:4500/api/auth/activate/${activationToken}`
    return activationLink
}


export const registerUserController = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    gender
  } = req.body

  try {
    // create table if it doesn't exist
    await sequelize.sync({ force: false })
    // check if user with given email already exists in the database
    const user = await User.findOne({ where: { email: email } })
    if (user) {
      return res.status(409).json(
        {
          "error": "User with given email already exists"
        })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      "error": "An internal server error occurred"
    })
  }
  // hash the password and save user to database
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      id: uuidv4(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      dateOfBirth: dateOfBirth,
      gender: gender,
    })
  
    // create activation link
    const activationLink = await createActivationLink(newUser)
    console.log(activationLink)

    // send email
    sendEmail(newUser, activationLink)
    
    // send response to frontend
    res.status(201).json({
      "message": "User created successfully",
    })
  } catch (error) {
    res.status(500).json({
      "error": error.message,
    })
    console.error(error)
  }
}


export const activateUserController = async (req, res) => {
  const { activationToken } = req.params
  if (!activationToken) {
    return res.status(400).json({
      "error": "Token not found",
    })
  }
  try {
    const decoded = jwt.verify(activationToken, process.env.JWT_SECRET_ACTIVATION)
    const user = await User.findOne({ where: { email: decoded.email } })
    if (!user) {
      return res.status(404).json({
        "error": "User not found",
      })
    }
    // activate user and save to database
    user.active = true
    await user.save()
    res.status(200).json({
      "message": "User activated successfully",
    })
  } catch (error) {
    res.status(500).json({
      "error": error.message,
    })
    console.error(error.message)
  }
}
