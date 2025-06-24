const express = require('express');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone, address, deliveryInstructions } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (deliveryInstructions) user.deliveryInstructions = deliveryInstructions;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        deliveryInstructions: user.deliveryInstructions
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/delivery-settings
// @desc    Get user's delivery settings
// @access  Private
router.get('/delivery-settings', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('phone address deliveryInstructions');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      phone: user.phone || '',
      address: user.address || '',
      deliveryInstructions: user.deliveryInstructions || ''
    });
  } catch (error) {
    console.error('Get delivery settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/delivery-settings
// @desc    Update user's delivery settings
// @access  Private
router.put('/delivery-settings', auth, async (req, res) => {
  try {
    const { phone, address, deliveryInstructions } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update delivery settings
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (deliveryInstructions) user.deliveryInstructions = deliveryInstructions;

    await user.save();

    res.json({
      message: 'Delivery settings updated successfully',
      settings: {
        phone: user.phone,
        address: user.address,
        deliveryInstructions: user.deliveryInstructions
      }
    });
  } catch (error) {
    console.error('Update delivery settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 