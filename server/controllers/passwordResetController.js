import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import {User} from "../models/associations.js"
import { sendEmail } from "./registerUserController.js"

export const forgotPassword = async(req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ where: { email: email}})
    if (!user) return res.status(404).json({ "error": "User with this email does not exist" })
    // user exist and now create One Time reset token
    const resetCode = uuidv4().split('-')[0].toUpperCase()
    const resetToken = jwt.sign(
      { id: user.id, resetCode: resetCode },
      process.env.PASSWORD_RESET_SECRET + user.password,
      { expiresIn: "10m"}
    )
    console.log(resetCode)
    user.resetToken = resetToken
    await user.save()
    // send email
    const subject = 'Reset your password'
    const message = `
    <h1>Dear ${user.firstName},</h1>

    <p>We have received a request to reset your password. To reset your password, please use this code to reset your password: ${resetCode}. The code expires in 10 minutes. If you did not request a password reset, please ignore this email.</p>

    <p>Thank you, MyWellBoost Team</p>
    `
    sendEmail(user, {subject, message})
    res.status(200).json({"message": "Password reset email has been sent", "userId": user.id})
  } catch (error) {
    console.error(error)
    res.status(500).json({ "error": error.message })
  }
}

export const resetPassword = async(req, res) => {
  const { userId } = req.params
  const { password, resetCode } = req.body

  try {
    // check if user with given id exist
    let isValidCode = false
    const user = await User.findOne({ where: { id: userId } })
    if (!user) return res.status(404).json({ "error": "Invalid reset code used" })
    jwt.verify(
      user.resetToken,
      process.env.PASSWORD_RESET_SECRET + user.password,
      (err, decoded) => {
          if (err) {
            console.log(err)
            return res.status(404).json({ "error": "Invalid reset code used" })
          }
          console.log('we are here');
          console.log('resetCode ' + resetCode + ' decoded ' + decoded.resetCode);
          if (decoded.resetCode === resetCode) {
            isValidCode = true
          }
        }
    )
    if (isValidCode) {
      const hashedPassword = await bcrypt.hash(password, 10)
      // update user password
      user.password = hashedPassword
      user.resetToken = null
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
    }
  } catch (error) {
    console.log(error)
    // res.status(500).json({ "error": error.message })
  }
}