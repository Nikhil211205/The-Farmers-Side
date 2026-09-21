import express from 'express';
import DietConsultation from '../models/DietConsultation.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const payload = req.body || {};

    if (!payload.fullName || !payload.email || !payload.mobileNumber) {
      return res.status(400).json({ message: 'Full name, email and mobile number are required.' });
    }

    const consultation = await DietConsultation.create(payload);

    res.status(201).json({
      message: 'Diet consultation request submitted successfully',
      registrationId: `DFC-${consultation._id.toString().slice(-6).toUpperCase()}`,
      data: consultation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Consultation submission failed' });
  }
});

export default router;
