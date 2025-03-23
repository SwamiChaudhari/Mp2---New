const express = require('express');
const Razorpay = require('razorpay');
const { protect } = require('../middleware/auth.middleware');
const Order = require('../models/order.model');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { amount } = req.body;
    
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: 'order_' + Date.now(),
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Payment error', error: error.message });
  }
});

// Verify payment
router.post('/verify', protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    // Verify signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Update order status
      await Order.findOneAndUpdate(
        { 'paymentInfo.razorpayOrderId': razorpay_order_id },
        {
          'paymentInfo.razorpayPaymentId': razorpay_payment_id,
          'paymentInfo.status': 'completed'
        }
      );

      res.json({ message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Payment verification error', error: error.message });
  }
});

module.exports = router;
