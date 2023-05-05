import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {User} from "../models/associations.js"
import { sendEmail } from "./registerUserController.js"

export const forgotPassword = async(req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ where: { email: email}})
    if (!user) return res.status(404).json({ "error": "User with this email does not exist" })
    // user exist and now create One Time reset link expiring in 10 minutes
    const secret = process.env.PASSWORD_RESET_SECRET + user.password
    const payload = {
      email: user.email,
      id: user.id
    }
    const token = jwt.sign(payload, secret, { expiresIn: '10m' })
    const link = `http://localhost:4500/auth/reset-password/${user.id}/${token}`
    console.log(link);

    // send email
    const subject = 'Reset your password'
    const message = `
    <h1>Dear ${user.firstName},</h1>

    <p>We have received a request to reset your password. To reset your password, please follow the instructions below:</p>
    <ol>
      <li>Click on the following link: <a href="${link}">${link}</a></li>
      <li>Enter your email address associated with your account.</li>
      <li>Follow the prompts to reset your password.</li>
    </ol>
    <p>If you did not request a password reset, please ignore this email.</p>

    <p>Thank you, MyWellBoost Team</p>
    `
    sendEmail(user, {subject, message})
    res.status(200).json({"message": "Password reset email has been sent"})
  } catch (error) {
    console.error(error)
    res.status(500).json({ "error": error.message })
  }
}

export const resetPassword = async(req, res) => {
  const { userId, token } = req.params
  const { password } = req.body

  try {
    // check if user with given id exist
    const user = await User.findOne({ where: { id: userId } })
    if (!user) return res.status(404).json({ "error": "Invalid link" })
    const secret = process.env.PASSWORD_RESET_SECRET + user.password
    const match = jwt.verify(token, secret)
    if (match) {
      const hashedPassword = await bcrypt.hash(password, 10)
      // update user password
      user.password = hashedPassword
      await user.save()
      // send email to user
      const subject = 'Password Reset Successful'
      const message = `
      <h1>Dear ${user.firstName},</h1>

      <p>We are writing to confirm that your password has been successfully reset. If you did not initiate this request, please contact our support team immediately.</p>

      <p>If you did reset your password, please keep it safe and do not share it with anyone. We recommend using a unique password for each of your accounts to ensure maximum security.</p>

      <p>If you have any further questions or concerns, please do not hesitate to contact us.</p>

      <p>Best regards, MyWellBoost Team</p>
      `
      sendEmail(user, { subject, message })
      res.status(200).json({ "message": "Password reset successfull" })
    } else {
      res.status(400).json({ "error": "Invalid link" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": error.message })
  }
}