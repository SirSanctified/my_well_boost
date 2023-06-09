/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { Recommendation } from '../models/associations.js';

const getRecommentationController = async (req, res) => {
  const { userId } = req.params;
  try {
    const recommendation = await Recommendation.findOne({ where: { UserId: userId } });
    if (recommendation) {
      const recommendations = recommendation.recommendedModifications.split('$').filter((rec) => rec !== '');
      res.status(200).json(recommendations);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export default getRecommentationController;
