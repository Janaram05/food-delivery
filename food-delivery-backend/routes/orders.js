const express = require('express');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      items,
      total,
      paymentMethod,
      paymentId,
      deliveryAddress,
      deliveryInstructions,
      deliveryTime,
      scheduledTime,
      contactPhone
    } = req.body;

    const order = new Order({
      user: req.user._id,
      items,
      total,
      paymentMethod,
      paymentId,
      deliveryAddress,
      deliveryInstructions,
      deliveryTime,
      scheduledTime,
      contactPhone,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Completed'
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders
// @desc    Get user's order history
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns this order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns this order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    order.status = status;
    await order.save();

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/orders/:id/verify-otp
// @desc    Verify OTP for delivery
// @access  Private
router.post('/:id/verify-otp', auth, async (req, res) => {
  try {
    const { otp } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns this order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if order is out for delivery
    if (order.status !== 'Out for Delivery') {
      return res.status(400).json({ message: 'Order is not out for delivery' });
    }

    // Verify OTP (demo: 1234)
    if (otp !== '1234') {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    order.status = 'Delivered';
    order.otpVerified = true;
    await order.save();

    res.json({
      message: 'OTP verified successfully. Order delivered!',
      order
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders/latest/active
// @desc    Get user's latest active order
// @access  Private
router.get('/latest/active', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      user: req.user._id,
      status: { $ne: 'Delivered' }
    }).sort({ createdAt: -1 });
    
    res.json(order);
  } catch (error) {
    console.error('Get latest order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 