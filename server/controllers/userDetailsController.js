/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { User } from '../models/associations.js';

const userDetailsController = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.sendStatus(404);
    res.status(200).json(user.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

export default userDetailsController;
