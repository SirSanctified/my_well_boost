/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Recommendation } from '../models/associations.js';
import { promptGPT } from './recommendationsController.js';

const updateRecommendationController = async (req, res) => {
  const { recommendationId } = req.params;
  const { medicalHistory, healthGoals } = req.body;
  try {
    const recommendation = await Recommendation.findOne({ where: { id: recommendationId } });
    if (recommendation) {
      if (medicalHistory) { recommendation.medicalHistory = medicalHistory; }
      if (healthGoals) { recommendation.healthGoals = healthGoals; }
      if (medicalHistory || healthGoals) {
        const user = await recommendation.getUser();
        const today = new Date();
        const age = today.getFullYear() - parseInt(user.dateOfBirth.split('-')[0], 10);
        const updatedRecommendation = await promptGPT(
          recommendation.medicalHistory,
          recommendation.healthGoals,
          age,
          user.gender,
        );
        recommendation.recommendedModifications = updatedRecommendation;
        await recommendation.save();
      }
      res.status(200).json(recommendation.toJSON());
    } else {
      res.status(404).json({ error: 'Recommendation not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export default updateRecommendationController;
