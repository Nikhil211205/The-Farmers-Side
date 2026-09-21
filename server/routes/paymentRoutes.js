import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const router = express.Router();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt = 'farmers-side-order' } = req.body;

    const options = {
      amount: Number(amount) * 100,
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Payment order creation failed', error: error.message });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValid = sign === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid Razorpay signature' });
    }

    res.json({ ok: true, message: 'Payment verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Payment verification failed', error: error.message });
  }
});

export default router;
