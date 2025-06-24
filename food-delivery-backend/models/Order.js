const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  imageUrl: {
    type: String
  },
  restaurant: {
    type: String,
    required: true
  }
});

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  items: [OrderItemSchema],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Preparing', 'Out for Delivery', 'Delivered'],
    default: 'Preparing'
  },
  paymentMethod: {
    type: String,
    enum: ['UPI', 'Card', 'COD'],
    required: true
  },
  paymentId: {
    type: String
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  deliveryInstructions: {
    type: String
  },
  deliveryTime: {
    type: String,
    default: 'ASAP'
  },
  scheduledTime: {
    type: Date
  },
  contactPhone: {
    type: String,
    required: true
  },
  otpVerified: {
    type: Boolean,
    default: false
  },
  estimatedDeliveryTime: {
    type: Date
  }
}, {
  timestamps: true
});

// Generate order ID before saving
OrderSchema.pre('save', function(next) {
  if (!this.orderId) {
    this.orderId = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema); 