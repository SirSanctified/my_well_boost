/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.JWT_SECRET_ACCESS,
    (err, decoded) => {
      if (err) return res.sendStatus(403); // invalid token (forbidden)
      req.user = decoded.email;
      next();
    },
  );
};
export default verifyJWT;
