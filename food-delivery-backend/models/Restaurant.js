const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  cuisine: {
    type: String,
    trim: true
  },
  menu: [MenuItemSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  deliveryTime: {
    type: Number,
    default: 30 // minutes
  },
  minimumOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Restaurant', RestaurantSchema); 