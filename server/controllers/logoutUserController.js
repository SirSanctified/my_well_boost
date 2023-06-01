/* eslint-disable import/extensions */
import { User } from '../models/associations.js';

const handleLogout = async (req, res) => {
  // on client, also delete the token

  const { cookies } = req;

  if (!cookies?.refreshToken) return res.sendStatus(204);
  // check if token is in the database
  const foundUser = await User.findOne({ where: { id: req.params.id } });
  if (!foundUser) {
    res.clearCookie('refreshToken', { httponly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }
  // delete refresh token from db
  foundUser.refreshToken = null;
  await foundUser.save();
  res.clearCookie('refreshToken', { httponly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
  return res.sendStatus(204);
};

export default handleLogout;
