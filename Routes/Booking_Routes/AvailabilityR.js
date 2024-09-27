import express from 'express';
const router = express.Router();
import User from '../../Models/User'; // Ensure the User model is imported
import Availability from '../models/availability';

// Fetch all tutors with their availability
router.get('/tutors', async (req, res) => {
  try {
    const tutors = await User.find({ role: 'tutor' }).populate('availability');
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tutors', error: error.message });
  }
});

export default router;
