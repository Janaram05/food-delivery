const express = require('express');
const Restaurant = require('../models/Restaurant');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/restaurants
// @desc    Get all restaurants
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, cuisine, city } = req.query;
    let query = { isActive: true };

    // Add search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { cuisine: { $regex: search, $options: 'i' } }
      ];
    }

    // Add cuisine filter
    if (cuisine) {
      query.cuisine = { $regex: cuisine, $options: 'i' };
    }

    // Add city filter
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    const restaurants = await Restaurant.find(query).select('-menu');
    res.json(restaurants);
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/restaurants/:id
// @desc    Get restaurant by ID with menu
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (!restaurant.isActive) {
      return res.status(404).json({ message: 'Restaurant is not available' });
    }

    res.json(restaurant);
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/restaurants
// @desc    Create a new restaurant (Admin only)
// @access  Private/Admin
router.post('/', adminAuth, async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Create restaurant error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/restaurants/:id
// @desc    Update restaurant (Admin only)
// @access  Private/Admin
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    console.error('Update restaurant error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/restaurants/:id
// @desc    Delete restaurant (Admin only)
// @access  Private/Admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Delete restaurant error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 