import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, (req, res) => {
  res.json({
    message: 'Orders API ready',
    orders: [],
    user: req.user?.email || 'guest',
  });
});

router.post('/', protect, (req, res) => {
  res.status(201).json({
    message: 'Order created successfully',
    order: {
      id: 'ORD-1001',
      amount: req.body?.totalAmount || 0,
      status: 'paid',
    },
  });
});

export default router;
