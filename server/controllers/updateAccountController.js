/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { User } from '../models/associations.js';

const updateAccountController = async (req, res) => {
  const { userId } = req.params;
  try {
    let user = await User.findOne({ where: { id: userId } });
    if (user) {
      user = await User.update({ ...req.body }, { where: { id: userId } });
      res.status(200).json(JSON.stringify(user));
    } else {
      res.status(404).json({ error: `User with id ${userId} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `ERROR: ${error.message}` });
    console.log(error);
  }
};

export default updateAccountController;
