/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/associations.js';

dotenv.config();

const handleRefreshToken = async (req, res) => {
  const { cookies } = req;
  if (!cookies?.refreshToken) return res.sendStatus(401);
  console.log(cookies.refreshToken);
  const { refreshToken } = cookies;
  const foundUser = await User.findOne({ where: { refreshToken } });
  if (!foundUser) return res.sendStatus(403); // Forbidden
  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { id: foundUser.id, email: foundUser.email },
        process.env.JWT_SECRET_ACCESS,
        { expiresIn: '1h' },
      );
      res.json({ accessToken });
    },
  );
};

export default handleRefreshToken;
