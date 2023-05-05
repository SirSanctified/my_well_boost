import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/userModel"
import { sendEmail } from "./registerUserController"

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

    // send email
    const subject = 'Reset your password'
    const message = `
    <h1>Please click on the link to reset your password</h1>
    <hr />
     <p>Do not share this link with anyone else</p>
    <a href="${link}">${link}</a>
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
      const subject = 'Password reset successful'
      const message = `
      <h1>Password reset successful</h1>
      <hr />
      <br />
      <p>Your password has been reset successfully. You can now login with your new password</p>
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