/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
// import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { User } from '../models/associations.js';
import { sequelize } from '../config/db.js';

dotenv.config();

export const sendEmail = (user, { subject, message }) => {
  // create a nodemailer transport
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // email options
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: `${subject}`,
    html: `${message}`,
  };
  // send email
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

// const createActivationLink = async (user) => {
//      // create onetime activation link
//      const activationToken = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET_ACTIVATION + user.active,
//       { expiresIn: "30m" }
//     )
//     const activationLink = `http://localhost:4500/auth/activate/${user.id}/${activationToken}`
//     return activationLink
// }

export const registerUserController = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    gender,
  } = req.body;

  try {
    // create table if it doesn't exist
    await sequelize.sync({ force: false });
    // check if user with given email already exists in the database
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(409).json({ error: 'User with given email already exists' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
  // hash the password and save user to database
  const activationToken = uuidv4().split('-')[0].toUpperCase();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      id: uuidv4(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
      activationToken,
    });

    console.log(activationToken);

    // send email
    const subject = 'Activate your Account';
    const message = `
    <h1>Dear ${newUser.firstName},</h1>
    <p>We are delighted to have you as a new member of our community. To start using our services, please activate your account by entering the code below in your application:</p>    
    <p>Activation Token: ${activationToken}</p>    
    <p>Please note that this token works only once. If you encounter any issues during the activation process, please do not hesitate to contact our support team at support@mywellboost.com.</p>    
    <p>Thank you for choosing our platform. We look forward to providing you with the best experience possible.</p>    
    <p>Best regards,</p>    
    <p>MyWellBoost Team</p>
      `;
    sendEmail(newUser, { subject, message });

    // send response to frontend
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

export const activateUserController = async (req, res) => {
  const { activationToken } = req.body;
  if (!activationToken) {
    return res.status(400).json({ error: 'Token not found' });
  }
  try {
    const user = await User.findOne({ where: { activationToken } });
    if (!user) {
      return res.status(404).json({ error: 'Token not found' });
    }
    if (user.activationToken === activationToken) {
      // activate user and save to database
      user.active = true;
      user.activationToken = null;
      await user.save();
      // send email to user
      const subject = 'Account Activation Successful';
      const message = `
      <h1>Dear ${user.firstName}</h1>
      <p>We are delighted to inform you that your account has been successfully activated. You can now log in to our platform and start exploring all the features we have to offer.</p>
      <p>To log in, open your application and enter your email address and password. If you have forgotten your password, you can reset it by clicking on the "Forgot Password" link on the login page.</p>
      <p>We would like to take this opportunity to thank you for choosing our platform. We are committed to providing you with the best possible experience and support. If you have any questions or concerns, please do not hesitate to contact us.</p>
      <p>Best regards,</p>
      <p>MyWellboost Team</p>
      `;
      sendEmail(user, { subject, message });
      const userData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
      };
      res.status(200).json({ message: 'User activated successfully', user: JSON.stringify(userData) });
    } else {
      res.status(400).json({ error: 'Invalid token' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error.message);
  }
};
