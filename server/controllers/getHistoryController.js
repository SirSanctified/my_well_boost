/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { Recommendation } from '../models/associations.js';

const getHistoryController = async (req, res) => {
  const { userId } = req.params;
  try {
    const recommendation = await Recommendation.findOne({ where: { UserId: userId } });
    if (recommendation) {
      const { medicalHistory, healthGoals } = recommendation;
      res.status(200).json({ medicalHistory, healthGoals });
    } else {
      res.status(200).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export default getHistoryController;
