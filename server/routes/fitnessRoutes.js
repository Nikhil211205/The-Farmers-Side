import express from 'express';
import FitnessProgram from '../models/FitnessProgram.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const payload = req.body || {};

    if (!payload.fullName || !payload.email || !payload.mobileNumber) {
      return res.status(400).json({ message: 'Full name, email and mobile number are required.' });
    }

    const program = await FitnessProgram.create(payload);

    res.status(201).json({
      message: 'Fitness program registration submitted successfully',
      registrationId: `FIT-${program._id.toString().slice(-6).toUpperCase()}`,
      data: program,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Fitness registration failed' });
  }
});

export default router;
