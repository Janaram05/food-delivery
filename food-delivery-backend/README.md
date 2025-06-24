# 🍕 Food Delivery Backend API

A complete backend API for a food delivery application built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication** - JWT-based authentication with signup/login
- **Restaurant Management** - CRUD operations for restaurants and menus
- **Order Management** - Create, track, and manage orders
- **Payment Integration** - Support for multiple payment methods
- **Order Tracking** - Real-time order status with OTP verification
- **User Profiles** - Manage user information and delivery settings

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd food-delivery-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/food-delivery
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Authentication Routes

#### POST `/api/auth/signup`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Get current user (requires token)

### Restaurant Routes

#### GET `/api/restaurants`
Get all restaurants (with optional filters)
```
/api/restaurants?search=pizza&cuisine=Italian&city=Mumbai
```

#### GET `/api/restaurants/:id`
Get restaurant details with menu

#### POST `/api/restaurants` (Admin only)
Create new restaurant

#### PUT `/api/restaurants/:id` (Admin only)
Update restaurant

#### DELETE `/api/restaurants/:id` (Admin only)
Delete restaurant

### Order Routes

#### POST `/api/orders`
Create new order (requires token)
```json
{
  "items": [
    {
      "name": "Margherita Pizza",
      "price": 12.99,
      "quantity": 2,
      "restaurant": "Pizza Palace"
    }
  ],
  "total": 25.98,
  "paymentMethod": "UPI",
  "deliveryAddress": "123 Main St",
  "contactPhone": "+1234567890"
}
```

#### GET `/api/orders`
Get user's order history (requires token)

#### GET `/api/orders/:id`
Get specific order (requires token)

#### PUT `/api/orders/:id/status`
Update order status (requires token)

#### POST `/api/orders/:id/verify-otp`
Verify OTP for delivery (requires token)
```json
{
  "otp": "1234"
}
```

### User Routes

#### PUT `/api/users/profile`
Update user profile (requires token)

#### GET `/api/users/delivery-settings`
Get delivery settings (requires token)

#### PUT `/api/users/delivery-settings`
Update delivery settings (requires token)

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📊 Database Models

### User
- name, email, password
- phone, address, deliveryInstructions
- isAdmin flag

### Restaurant
- name, description, address, city
- imageUrl, rating, cuisine
- menu array with items
- isActive, deliveryTime, minimumOrder

### Order
- user reference, orderId
- items array, total
- status, paymentMethod, paymentId
- deliveryAddress, deliveryInstructions
- contactPhone, otpVerified

## 🚀 Usage Examples

### 1. User Registration
```javascript
const response = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
});
```

### 2. Create Order
```javascript
const response = await fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    items: cart,
    total: total,
    paymentMethod: 'UPI',
    deliveryAddress: '123 Main St'
  })
});
```

## 🔧 Development

### Project Structure
```
food-delivery-backend/
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── index.js         # Main server file
├── package.json     # Dependencies
└── README.md        # Documentation
```

### Adding New Features
1. Create model in `models/` directory
2. Create routes in `routes/` directory
3. Add middleware if needed
4. Update main `index.js` to include new routes

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGO_URI in .env file

2. **JWT Token Issues**
   - Verify JWT_SECRET is set
   - Check token expiration

3. **CORS Errors**
   - CORS is enabled for all origins in development
   - Configure specific origins for production

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Happy Coding! 🍕🚀** 