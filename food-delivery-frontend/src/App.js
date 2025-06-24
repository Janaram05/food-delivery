import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import restaurants from './restaurants';

function HomeSlider() {
  const images = [
    '/images/pizza.jpg',
    '/images/burger.jpg',
    '/images/salad.jpg',
    '/images/sushi.jpg'
  ];
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % images.length), 3000);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div className="home-slider">
      <img src={images[idx]} alt="slider" className="slider-img" />
      <div className="slider-dots">
        {images.map((_, i) => (
          <span key={i} className={i === idx ? 'dot active' : 'dot'} onClick={() => setIdx(i)}></span>
        ))}
      </div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <header className="App-header home-header-slider">
        <HomeSlider />
        <div className="header-overlay-content">
          <h1>Welcome to FoodieExpress</h1>
          <p>Your favorite meals delivered fast at your door.</p>
          <button className="cta-button" onClick={() => navigate('/restaurants')}>Order Now</button>
        </div>
      </header>
      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="category-list">
          <div className="category-card">
            <img src="/images/pizza.jpg" alt="Pizza" className="category-img" />
            <div>Pizza</div>
          </div>
          <div className="category-card">
            <img src="/images/burger.jpg" alt="Burgers" className="category-img" />
            <div>Burgers</div>
          </div>
          <div className="category-card">
            <img src="/images/salad.jpg" alt="Salads" className="category-img" />
            <div>Salads</div>
          </div>
          <div className="category-card">
            <img src="/images/sushi.jpg" alt="Sushi" className="category-img" />
            <div>Sushi</div>
          </div>
        </div>
      </section>
    </>
  );
}

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    // Here you would handle authentication logic
    alert('Logged in!');
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />
        {error && <div className="login-error">{error}</div>}
        <button type="submit" className="cta-button" style={{width: '100%', marginTop: 18}}>Login</button>
      </form>
    </div>
  );
}

function Signup() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    // Here you would handle signup logic
    alert('Account created!');
  };

  return (
    <div className="login-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="login-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="login-input"
        />
        {error && <div className="login-error">{error}</div>}
        <button type="submit" className="cta-button" style={{width: '100%', marginTop: 18}}>Sign Up</button>
      </form>
    </div>
  );
}

function Help() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');
  const [faqOpen, setFaqOpen] = React.useState([false, false, false, false]);
  const [showChat, setShowChat] = React.useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  const toggleFaq = idx => {
    setFaqOpen(faqOpen.map((open, i) => (i === idx ? !open : open)));
  };

  return (
    <div className="help-page">
      <h2>Help & Support</h2>
      <section className="help-section">
        <h3>Contact Us</h3>
        <p>Email: <a href="mailto:support@foodieexpress.com" title="Send us an email">support@foodieexpress.com</a></p>
        <p>Phone: <a href="tel:+1234567890" title="Call our support">+1 234 567 890</a></p>
        <p>Live Chat: <button className="chat-btn" onClick={() => setShowChat(true)}>Start Chat</button></p>
      </section>
      <section className="help-section">
        <h3>FAQ</h3>
        <ul className="faq-list">
          <li className="faq-item">
            <button className="faq-question" onClick={() => toggleFaq(0)}>
              How do I place an order?
              <span className="faq-arrow">{faqOpen[0] ? '▲' : '▼'}</span>
            </button>
            {faqOpen[0] && <div className="faq-answer">Browse restaurants, add items to your cart, and proceed to checkout.</div>}
          </li>
          <li className="faq-item">
            <button className="faq-question" onClick={() => toggleFaq(1)}>
              How can I track my order?
              <span className="faq-arrow">{faqOpen[1] ? '▲' : '▼'}</span>
            </button>
            {faqOpen[1] && <div className="faq-answer">Go to your account and view your recent orders for real-time tracking.</div>}
          </li>
          <li className="faq-item">
            <button className="faq-question" onClick={() => toggleFaq(2)}>
              What payment methods are accepted?
              <span className="faq-arrow">{faqOpen[2] ? '▲' : '▼'}</span>
            </button>
            {faqOpen[2] && <div className="faq-answer">We accept credit/debit cards, UPI, and popular wallets.</div>}
          </li>
          <li className="faq-item">
            <button className="faq-question" onClick={() => toggleFaq(3)}>
              How do I contact customer support?
              <span className="faq-arrow">{faqOpen[3] ? '▲' : '▼'}</span>
            </button>
            {faqOpen[3] && <div className="faq-answer">Use the contact form below or email us directly.</div>}
          </li>
        </ul>
      </section>
      <section className="help-section">
        <h3>Contact Form</h3>
        {submitted ? (
          <div className="help-success animated-success">
            <span className="success-check">✔</span> Thank you! We have received your message.
          </div>
        ) : (
          <form className="help-form" onSubmit={handleSubmit}>
            <label htmlFor="help-name">Your Name</label>
            <input
              id="help-name"
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="login-input"
            />
            <label htmlFor="help-email">Your Email</label>
            <input
              id="help-email"
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="login-input"
            />
            <label htmlFor="help-message">How can we help you?</label>
            <textarea
              id="help-message"
              name="message"
              placeholder="How can we help you?"
              value={form.message}
              onChange={handleChange}
              className="login-input"
              rows={4}
            />
            {error && <div className="login-error">{error}</div>}
            <button type="submit" className="cta-button">Send</button>
          </form>
        )}
      </section>
      <section className="help-section">
        <h3>Documentation & Guides</h3>
        <ul className="help-links">
          <li><a href="#" target="_blank" rel="noopener noreferrer">User Guide</a></li>
          <li><a href="#" target="_blank" rel="noopener noreferrer">How to Order</a></li>
          <li><a href="#" target="_blank" rel="noopener noreferrer">Account & Security</a></li>
        </ul>
      </section>
      {showChat && (
        <div className="chat-modal">
          <div className="chat-box">
            <div className="chat-header">
              <span>Live Chat</span>
              <button className="chat-close" onClick={() => setShowChat(false)}>×</button>
            </div>
            <div className="chat-body">
              <div className="chat-message bot">Hi! How can we help you today?</div>
              <div className="chat-message user">(This is a demo chat window.)</div>
            </div>
            <div className="chat-footer">
              <input type="text" className="chat-input" placeholder="Type your message..." disabled />
              <button className="chat-send" disabled>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RestaurantDetails({ updateCartCount }) {
  const { name } = useParams();
  const restaurant = restaurants.find(r => r.name.replace(/\s+/g, '-').toLowerCase() === name);
  const [cartMsg, setCartMsg] = React.useState("");
  const [quantities, setQuantities] = React.useState(() => restaurant ? restaurant.menu.map(() => 1) : []);
  if (!restaurant) return <div className="no-results">Restaurant not found.</div>;

  const addToCart = (item, idx) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ ...item, restaurant: restaurant.name, quantity: quantities[idx] });
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartMsg(`${item.name} (x${quantities[idx]}) added to cart!`);
    setTimeout(() => setCartMsg(""), 1500);
    updateCartCount();
  };

  const changeQty = (idx, delta) => {
    setQuantities(qs => qs.map((q, i) => i === idx ? Math.max(1, q + delta) : q));
  };

  return (
    <div className="restaurant-details-page">
      <div className="restaurant-details-header">
        <img src={restaurant.imageUrl} alt={restaurant.name} className="restaurant-details-img" />
        <div className="restaurant-details-info">
          <h2>{restaurant.name}</h2>
          <div className="restaurant-desc">{restaurant.description}</div>
          <div className="restaurant-meta">
            <span className="restaurant-rating">⭐ {restaurant.rating}</span>
            <span className="restaurant-cuisine">{restaurant.cuisine}</span>
          </div>
          <div className="restaurant-address">{restaurant.address}</div>
          <div className="restaurant-city">{restaurant.city}</div>
        </div>
      </div>
      <h3 className="menu-title">Menu</h3>
      {cartMsg && <div className="help-success animated-success" style={{marginBottom: 16}}>{cartMsg}</div>}
      <div className="menu-list">
        {restaurant.menu.map((item, idx) => (
          <div className="menu-card" key={idx}>
            <img src={item.imageUrl} alt={item.name} className="menu-img" />
            <div className="menu-info">
              <div className="menu-name">{item.name}</div>
              <div className="menu-desc">{item.description}</div>
              <div className="menu-price">₹{item.price}</div>
              <div className="menu-qty-bar">
                <button className="qty-btn" onClick={() => changeQty(idx, -1)}>-</button>
                <span className="menu-qty">{quantities[idx]}</span>
                <button className="qty-btn" onClick={() => changeQty(idx, 1)}>+</button>
              </div>
              <button className="cta-button menu-cart-btn" onClick={() => addToCart(item, idx)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Restaurants() {
  const [search, setSearch] = React.useState("");
  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.city.toLowerCase().includes(search.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="restaurants-page">
      <h2>Restaurants</h2>
      <input
        className="restaurant-search"
        type="text"
        placeholder="Search by name, city, or cuisine..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="restaurants-list">
        {filtered.map((r, i) => (
          <Link
            to={`/restaurants/${r.name.replace(/\s+/g, '-').toLowerCase()}`}
            className="restaurant-card-link"
            key={i}
            style={{ textDecoration: 'none' }}
          >
            <div className="restaurant-card">
              <img src={r.imageUrl} alt={r.name} className="restaurant-img" />
              <div className="restaurant-info">
                <h3>{r.name}</h3>
                <div className="restaurant-desc">{r.description}</div>
                <div className="restaurant-meta">
                  <span className="restaurant-rating">⭐ {r.rating}</span>
                  <span className="restaurant-cuisine">{r.cuisine}</span>
                </div>
                <div className="restaurant-address">{r.address}</div>
                <div className="restaurant-city">{r.city}</div>
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="no-results">No restaurants found.</div>
        )}
      </div>
    </div>
  );
}

function DeliverySettings() {
  const [address, setAddress] = React.useState(localStorage.getItem('delivery_address') || '');
  const [instructions, setInstructions] = React.useState(localStorage.getItem('delivery_instructions') || '');
  const [deliveryTime, setDeliveryTime] = React.useState(localStorage.getItem('delivery_time') || 'ASAP');
  const [scheduledTime, setScheduledTime] = React.useState(localStorage.getItem('scheduled_time') || '');
  const [phone, setPhone] = React.useState(localStorage.getItem('delivery_phone') || '');
  const [success, setSuccess] = React.useState(false);
  // Food tracking system
  const [order, setOrder] = React.useState(null);
  const [statusIdx, setStatusIdx] = React.useState(0);
  const statuses = ['Preparing', 'Out for Delivery', 'Delivered'];
  const [otp, setOtp] = React.useState('');
  const [otpError, setOtpError] = React.useState('');

  React.useEffect(() => {
    const latest = JSON.parse(localStorage.getItem('latest_order') || 'null');
    if (latest) {
      setOrder(latest);
      setStatusIdx(statuses.indexOf(latest.status));
    }
  }, []);

  React.useEffect(() => {
    if (order && statusIdx < statuses.length - 1) {
      if (statuses[statusIdx] === 'Out for Delivery') return; // Wait for OTP
      const timer = setTimeout(() => {
        const newStatus = statuses[statusIdx + 1];
        setStatusIdx(statusIdx + 1);
        const updated = { ...order, status: newStatus };
        setOrder(updated);
        localStorage.setItem('latest_order', JSON.stringify(updated));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [order, statusIdx]);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === '1234') {
      setOtpError('');
      setStatusIdx(statuses.length - 1);
      const updated = { ...order, status: 'Delivered' };
      setOrder(updated);
      localStorage.setItem('latest_order', JSON.stringify(updated));
    } else {
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('delivery_address', address);
    localStorage.setItem('delivery_instructions', instructions);
    localStorage.setItem('delivery_time', deliveryTime);
    localStorage.setItem('scheduled_time', scheduledTime);
    localStorage.setItem('delivery_phone', phone);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="delivery-settings-page">
      <h2 style={{textAlign: 'center', color: '#ff7043', marginBottom: 8}}>Delivery Settings</h2>
      <div style={{textAlign: 'center', color: '#888', marginBottom: 28, fontSize: '1.05rem'}}>Update your delivery preferences and track your food order in real time.</div>
      <div style={{background: '#fffbe9', borderRadius: 16, boxShadow: '0 2px 12px rgba(255,112,67,0.07)', padding: 28, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px auto'}}>
        <form className="delivery-form" onSubmit={handleSubmit}>
          <label htmlFor="delivery-address" style={{fontWeight: 600, color: '#d84315'}}>
            <span role="img" aria-label="address">🏠</span> Delivery Address
          </label>
          <input
            id="delivery-address"
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="login-input"
            placeholder="E.g., 123 MG Road, Chennai"
            required
          />
          <div style={{fontSize: '0.97rem', color: '#888', marginBottom: 10, marginTop: -8}}>Where should we deliver your food?</div>

          <label htmlFor="delivery-instructions" style={{fontWeight: 600, color: '#d84315'}}>
            <span role="img" aria-label="instructions">📝</span> Delivery Instructions
          </label>
          <input
            id="delivery-instructions"
            type="text"
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            className="login-input"
            placeholder="E.g., Leave at door, call on arrival"
          />
          <div style={{fontSize: '0.97rem', color: '#888', marginBottom: 10, marginTop: -8}}>Any special instructions for the delivery partner?</div>

          <label style={{fontWeight: 600, color: '#d84315'}}>
            <span role="img" aria-label="time">⏰</span> Delivery Time
          </label>
          <div className="delivery-time-options" style={{marginBottom: 8}}>
            <label style={{fontWeight: 500, color: '#444'}}>
              <input
                type="radio"
                name="deliveryTime"
                value="ASAP"
                checked={deliveryTime === 'ASAP'}
                onChange={() => setDeliveryTime('ASAP')}
              />
              ASAP
            </label>
            <label style={{fontWeight: 500, color: '#444'}}>
              <input
                type="radio"
                name="deliveryTime"
                value="Scheduled"
                checked={deliveryTime === 'Scheduled'}
                onChange={() => setDeliveryTime('Scheduled')}
              />
              Schedule for later
            </label>
          </div>
          {deliveryTime === 'Scheduled' && (
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={e => setScheduledTime(e.target.value)}
              className="login-input"
              required
            />
          )}
          <div style={{fontSize: '0.97rem', color: '#888', marginBottom: 10, marginTop: -8}}>Choose ASAP for fastest delivery or schedule for later.</div>

          <label htmlFor="delivery-phone" style={{fontWeight: 600, color: '#d84315'}}>
            <span role="img" aria-label="phone">📞</span> Contact Phone
          </label>
          <input
            id="delivery-phone"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="login-input"
            placeholder="E.g., +91 9876543210"
            required
          />
          <div style={{fontSize: '0.97rem', color: '#888', marginBottom: 18, marginTop: -8}}>We'll contact you if needed for delivery.</div>

          <button type="submit" className="cta-button" style={{marginTop: 10, fontSize: '1.13rem', fontWeight: 700, boxShadow: '0 2px 8px #ff704344'}}>💾 Save Settings</button>
          {success && <div className="help-success animated-success" style={{marginTop: 18, fontSize: '1.08rem', background: '#e8f5e9', color: '#388e3c', border: '1.5px solid #b2dfdb'}}>✔ Settings saved successfully!</div>}
        </form>
      </div>
      {/* Food Tracking System */}
      <div style={{marginTop: 0, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(67,160,71,0.08)', padding: 28, maxWidth: 480, margin: '0 auto'}}>
        <h3 style={{color: '#ff7043', marginBottom: 18, textAlign: 'center', letterSpacing: 0.5}}>🍕 Food Tracking</h3>
        {!order ? (
          <div className="no-results">No recent order found.</div>
        ) : (
          <div>
            <div className="order-id" style={{marginBottom: 10}}>Order ID: <b>{order.id}</b></div>
            <div className="order-status-bar" style={{marginBottom: 10}}>
              {statuses.map((s, i) => (
                <div key={i} className={i <= statusIdx ? 'order-step active' : 'order-step'}>
                  <span className="order-step-label">{s}</span>
                  {i < statuses.length - 1 && <span className="order-step-arrow">→</span>}
                </div>
              ))}
            </div>
            <div className="order-status-current" style={{marginBottom: 8}}>Current Status: <b>{order.status}</b></div>
            <div className="order-total">Order Total: <b>₹{order.total}</b></div>
            {/* OTP Verification */}
            {order.status === 'Out for Delivery' && statusIdx === statuses.indexOf('Out for Delivery') && (
              <form onSubmit={handleOtpSubmit} style={{marginTop: 18, textAlign: 'center'}}>
                <label htmlFor="otp-input" style={{fontWeight: 500, color: '#d84315'}}>Enter Delivery OTP (1234):</label>
                <input
                  id="otp-input"
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="login-input"
                  style={{maxWidth: 120, marginLeft: 10, marginRight: 10, textAlign: 'center'}}
                  maxLength={6}
                  required
                />
                <button type="submit" className="cta-button" style={{padding: '8px 22px', fontSize: '1rem', marginLeft: 8}}>Verify</button>
                {otpError && <div className="login-error" style={{marginTop: 8}}>{otpError}</div>}
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Cart({ updateCartCount }) {
  const [cart, setCart] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const updateQty = (idx, delta) => {
    setCart(cart => {
      const newCart = cart.map((item, i) => i === idx ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } : item);
      localStorage.setItem('cart', JSON.stringify(newCart));
      updateCartCount();
      return newCart;
    });
  };

  const removeItem = idx => {
    const newCart = cart.filter((_, i) => i !== idx);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    updateCartCount();
  };

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  if (cart.length === 0) return <div className="cart-page"><h2>Your Cart</h2><div className="no-results">Your cart is empty.</div></div>;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cart.map((item, idx) => (
          <div className="cart-item" key={idx}>
            <img src={item.imageUrl} alt={item.name} className="cart-img" />
            <div className="cart-info">
              <div className="cart-name">{item.name}</div>
              <div className="cart-restaurant">from <b>{item.restaurant}</b></div>
              <div className="cart-desc">{item.description}</div>
              <div className="cart-price">₹{item.price} x {item.quantity || 1} = <b>₹{(item.price || 0) * (item.quantity || 1)}</b></div>
              <div className="menu-qty-bar">
                <button className="qty-btn" onClick={() => updateQty(idx, -1)}>-</button>
                <span className="menu-qty">{item.quantity || 1}</span>
                <button className="qty-btn" onClick={() => updateQty(idx, 1)}>+</button>
              </div>
              <button className="cart-remove-btn" onClick={() => removeItem(idx)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total-bar">
        <span className="cart-total-label">Total:</span>
        <span className="cart-total-value">₹{total}</span>
        <button className="cta-button cart-pay-btn" onClick={() => navigate('/payment')}>Pay Now</button>
      </div>
    </div>
  );
}

function Payment({ updateCartCount }) {
  const [method, setMethod] = React.useState('UPI');
  const [upiApp, setUpiApp] = React.useState('Google Pay');
  const [paying, setPaying] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  let total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  // If cart is empty, check for a pending order
  let pendingOrder = null;
  if (cart.length === 0) {
    const latest = JSON.parse(localStorage.getItem('latest_order') || 'null');
    if (latest && latest.status !== 'Delivered') {
      pendingOrder = latest;
      cart = latest.cart || [];
      total = latest.total || 0;
    }
  }

  React.useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const handleRazorpay = () => {
    setPaying(true);
    setError("");
    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag', // Demo key
      amount: total * 100, // in paise
      currency: 'INR',
      name: 'FoodieExpress',
      description: 'Order Payment',
      image: '/logo192.png',
      handler: function (response) {
        setPaying(false);
        setSuccess(true);
        // Save order (simulate)
        const newOrder = {
          id: 'ORD' + Date.now(),
          cart,
          total,
          paymentId: response.razorpay_payment_id,
          status: 'Preparing'
        };
        localStorage.setItem('order', JSON.stringify(newOrder));
        localStorage.setItem('latest_order', JSON.stringify(newOrder));
        localStorage.removeItem('cart');
        updateCartCount();
        setTimeout(() => navigate('/order-tracking'), 1800);
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      theme: {
        color: '#ff7043'
      },
      modal: {
        ondismiss: function() {
          setPaying(false);
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (method === 'UPI' || method === 'Card') {
      handleRazorpay();
    } else {
      // Simulate COD
      setSuccess(true);
      const newOrder = {
        id: 'ORD' + Date.now(),
        cart,
        total,
        paymentId: 'COD',
        status: 'Preparing'
      };
      localStorage.setItem('order', JSON.stringify(newOrder));
      localStorage.setItem('latest_order', JSON.stringify(newOrder));
      localStorage.removeItem('cart');
      updateCartCount();
      setTimeout(() => navigate('/order-tracking'), 1800);
    }
  };

  if (cart.length === 0 && !pendingOrder) return <div className="payment-page"><h2>Payment</h2><div className="no-results">Your cart is empty.</div></div>;

  return (
    <div className="payment-page">
      <h2>Payment</h2>
      <div className="payment-total">Total: <b>₹{total}</b></div>
      <form className="payment-form" onSubmit={handlePay}>
        <div>
          <label className="payment-method-label">Select Payment Method:</label>
          <select value={method} onChange={e => setMethod(e.target.value)} className="upi-app-select">
            <option value="UPI">UPI</option>
            <option value="Card">Credit/Debit Card</option>
            <option value="COD">Cash on Delivery</option>
          </select>
        </div>
        {method === 'UPI' && (
          <div>
            <label className="payment-method-label">Choose UPI App:</label>
            <select value={upiApp} onChange={e => setUpiApp(e.target.value)} className="upi-app-select">
              <option>Google Pay</option>
              <option>PhonePe</option>
              <option>Paytm</option>
              <option>Other</option>
            </select>
          </div>
        )}
        {error && <div className="login-error" style={{marginTop: 10}}>{error}</div>}
        {success ? (
          <div className="help-success animated-success" style={{marginTop: 18}}>
            <span className="success-check">✔</span> Payment Successful! Redirecting...
          </div>
        ) : (
          <button type="submit" className="cta-button payment-confirm-btn" disabled={paying} style={{marginTop: 18}}>
            {paying ? 'Processing...' : 'Pay Now'}
          </button>
        )}
      </form>
    </div>
  );
}

function OrderTracking() {
  const [order, setOrder] = React.useState(null);
  const [statusIdx, setStatusIdx] = React.useState(0);
  const [otp, setOtp] = React.useState('');
  const [otpError, setOtpError] = React.useState('');
  const statuses = ['Preparing', 'Out for Delivery', 'Delivered'];

  React.useEffect(() => {
    const latest = JSON.parse(localStorage.getItem('latest_order') || 'null');
    if (latest) {
      setOrder(latest);
      setStatusIdx(statuses.indexOf(latest.status));
    }
  }, []);

  React.useEffect(() => {
    if (order && statusIdx < statuses.length - 1) {
      if (statuses[statusIdx] === 'Out for Delivery') return; // Wait for OTP
      const timer = setTimeout(() => {
        const newStatus = statuses[statusIdx + 1];
        setStatusIdx(statusIdx + 1);
        const updated = { ...order, status: newStatus };
        setOrder(updated);
        localStorage.setItem('latest_order', JSON.stringify(updated));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [order, statusIdx]);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === '1234') {
      setOtpError('');
      setStatusIdx(statuses.length - 1);
      const updated = { ...order, status: 'Delivered' };
      setOrder(updated);
      localStorage.setItem('latest_order', JSON.stringify(updated));
    } else {
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  if (!order) return <div className="order-tracking-page"><h2>Order Tracking</h2><div className="no-results">No recent order found.</div></div>;

  return (
    <div className="order-tracking-page">
      <h2>Order Tracking</h2>
      <div className="order-id">Order ID: <b>{order.id}</b></div>
      <div className="order-status-bar">
        {statuses.map((s, i) => (
          <div key={i} className={i <= statusIdx ? 'order-step active' : 'order-step'}>
            <span className="order-step-label">{s}</span>
            {i < statuses.length - 1 && <span className="order-step-arrow">→</span>}
          </div>
        ))}
      </div>
      <div className="order-status-current">Current Status: <b>{order.status}</b></div>
      <div className="order-total">Order Total: <b>₹{order.total}</b></div>
      {/* OTP Verification */}
      {order.status === 'Out for Delivery' && statusIdx === statuses.indexOf('Out for Delivery') && (
        <form onSubmit={handleOtpSubmit} style={{marginTop: 18, textAlign: 'center'}}>
          <label htmlFor="otp-input-tracking" style={{fontWeight: 500, color: '#d84315'}}>Enter Delivery OTP (1234):</label>
          <input
            id="otp-input-tracking"
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="login-input"
            style={{maxWidth: 120, marginLeft: 10, marginRight: 10, textAlign: 'center'}}
            maxLength={6}
            required
          />
          <button type="submit" className="cta-button" style={{padding: '8px 22px', fontSize: '1rem', marginLeft: 8}}>Verify</button>
          {otpError && <div className="login-error" style={{marginTop: 8}}>{otpError}</div>}
        </form>
      )}
    </div>
  );
}

function Offers() {
  const offers = [
    {
      title: "50% OFF on First Order!",
      desc: "Use code FIRST50. Max discount ₹100. Valid for new users only.",
      code: "FIRST50",
      color: "#ff7043"
    },
    {
      title: "Free Delivery on Orders Above ₹499",
      desc: "No code needed. Automatically applied at checkout.",
      code: null,
      color: "#43a047"
    },
    {
      title: "Combo Meal Deal",
      desc: "Get a pizza + burger combo at just ₹399! Limited time only.",
      code: null,
      color: "#1e88e5"
    },
    {
      title: "20% Cashback via Paytm",
      desc: "Pay with Paytm wallet and get 20% cashback up to ₹50.",
      code: null,
      color: "#fbc02d"
    }
  ];
  return (
    <div className="offers-page">
      <h2>Current Offers</h2>
      <div className="offers-list">
        {offers.map((offer, idx) => (
          <div className="offer-card" key={idx} style={{borderColor: offer.color}}>
            <div className="offer-title" style={{color: offer.color}}>{offer.title}</div>
            <div className="offer-desc">{offer.desc}</div>
            {offer.code && <div className="offer-code">Use Code: <b>{offer.code}</b></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(0);

  const updateCartCount = React.useCallback(() => {
    setCartCount(JSON.parse(localStorage.getItem('cart') || '[]').length);
  }, []);

  React.useEffect(() => {
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, [updateCartCount]);

  React.useEffect(() => {
    document.body.style.background = darkMode ? '#181c23' : '#fff';
  }, [darkMode]);

  return (
    <div className={`App${darkMode ? ' dark' : ''}`}>
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">FoodieExpress</div>
          <ul className="navbar-links">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/restaurants" className="nav-link">Restaurants</Link></li>
            <li style={{position: 'relative'}}>
              <Link to="/cart" className="nav-link">Cart
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </li>
            <li><Link to="/offers" className="nav-link">Offers</Link></li>
            <li><Link to="/login" className="nav-link">Login</Link></li>
            <li><Link to="/signup" className="nav-link">Signin</Link></li>
            <li><Link to="/help" className="nav-link">Help</Link></li>
            <li><Link to="/delivery-settings" className="nav-link">Delivery Settings</Link></li>
          </ul>
          <button className="theme-toggle" onClick={() => setDarkMode(m => !m)} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            {darkMode ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/help" element={<Help />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:name" element={<RestaurantDetails updateCartCount={updateCartCount} />} />
        <Route path="/delivery-settings" element={<DeliverySettings />} />
        <Route path="/cart" element={<Cart updateCartCount={updateCartCount} />} />
        <Route path="/payment" element={<Payment updateCartCount={updateCartCount} />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
      </Routes>
    </div>
  );
}

export default App;
