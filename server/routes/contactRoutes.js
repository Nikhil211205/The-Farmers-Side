import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    if (!name || !email || !mobile || !message) {
      return res.status(400).json({ message: 'Name, email, mobile and message are required.' });
    }

    const contactEntry = await Contact.create({
      name,
      email,
      mobile,
      subject,
      message,
    });

    res.status(201).json({
      message: 'Contact form submitted successfully',
      data: contactEntry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Contact submission failed' });
  }
});

export default router;
