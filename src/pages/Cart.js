import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useLoading } from '../context/LoadingContext';
import { openWhatsApp } from '../utils/whatsappHelper';
import SEO from '../components/SEO';
import '../styles/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { startLoading, stopLoading } = useLoading();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to create WhatsApp message from form data and cart items
  const createWhatsAppMessage = () => {
    // Create message
    let message = `*New Cart Quotation Request*\n\n`;
    message += `*Customer Details:*\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Email:* ${formData.email}\n`;
    message += `*Phone:* ${formData.phone}\n`;
    message += `*Address:* ${formData.address}\n`;
    message += `*City:* ${formData.city}\n`;
    message += `*State:* ${formData.state}\n`;
    message += `*Zip Code:* ${formData.zipCode}\n\n`;

    message += `*Products:*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (Qty: ${item.quantity})\n`;
    });

    if (formData.additionalNotes) {
      message += `\n*Additional Notes:*\n${formData.additionalNotes}\n`;
    }

    return encodeURIComponent(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show loading animation
    startLoading();

    // Create WhatsApp message
    const whatsappMessage = createWhatsAppMessage();

    // Log form data
    console.log('Quotation request submitted:', { items: cartItems, customerInfo: formData });

    // Simulate a short delay before redirecting
    setTimeout(() => {
      // Stop loading animation
      stopLoading();
      setIsSubmitting(false);

      // Show success message
      setShowConfirmation(true);

      // Open WhatsApp using the helper function
      openWhatsApp('919021535909', whatsappMessage);

      // Clear form and cart after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        additionalNotes: ''
      });

      // Clear cart after 2 seconds to allow user to see confirmation
      setTimeout(() => {
        clearCart();
      }, 2000);
    }, 1500);
  };

  return (
    <motion.div
      className="cart-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* SEO Component */}
      <SEO
        title="Your Cart | Request Quotation | MF-Enterprises"
        description="Review your selected MF-Enterprises products and request a quotation. Our high-quality outdoor gym equipment, playground equipment, gazebos, benches, and FRP dustbins are made with durable iron and powder coating."
        canonical="/cart"
        keywords="MF-Enterprises cart, request quotation, outdoor equipment quote, outdoor gym equipment price, playground equipment price, gazebos price, benches price, FRP dustbins price, outdoor equipment inquiry, WhatsApp quotation"
      />
      <div className="cart-header">
        <h1>Your Cart</h1>
        <div className="cart-breadcrumb">
          <Link to="/">Home</Link> <span className="separator">›</span> Cart
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showConfirmation ? (
          <motion.div
            className="confirmation-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="confirmation-icon">
              <i className="fab fa-whatsapp"></i>
            </div>
            <h2>Thank You!</h2>
            <p>Your quotation request is being sent via WhatsApp. If WhatsApp doesn't open automatically, please check your browser settings.</p>
            <p>We will contact you shortly with pricing information.</p>
            <Link to="/categories" className="continue-shopping">Continue Shopping</Link>
          </motion.div>
        ) : cartItems.length === 0 ? (
          <motion.div
            className="empty-cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="empty-cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Link to="/categories" className="continue-shopping">Browse Products</Link>
          </motion.div>
        ) : (
          <motion.div
            className="cart-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="cart-summary">
              <h2>Cart Summary</h2>
              <div className="cart-items-container">
                {cartItems.map(item => (
                  <motion.div
                    key={item.id}
                    className="cart-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <div className="cart-item-image">
                      <img src={item.image || "/placeholder.jpg"} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p className="item-category">{item.category}</p>
                      <div className="item-actions">
                        <div className="quantity-controls">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="remove-item"
                          onClick={() => handleRemoveItem(item.id)}
                          aria-label="Remove item"
                        >
                          <i className="fas fa-trash-alt" style={{ marginRight: '5px' }}></i> Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="cart-actions">
                <button className="clear-cart" onClick={clearCart}>
                  Clear Cart
                </button>
                <Link to="/categories" className="continue-shopping-link">
                  Continue Shopping
                </Link>
              </div>
            </div>

            <div className="quotation-request">
              <h2>Request Quotation</h2>
              <p className="form-description">
                Fill in your details below to receive a quotation for the items in your cart.
              </p>

              <form onSubmit={handleSubmit} className="quote-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name <span className="required">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Your contact number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address <span className="required">*</span></label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder="Street address"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City <span className="required">*</span></label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="City"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State <span className="required">*</span></label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      placeholder="State/Province"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code <span className="required">*</span></label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      placeholder="Postal/Zip code"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="additionalNotes">Additional Notes</label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    rows="4"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    placeholder="Any specific requirements or questions?"
                  ></textarea>
                </div>

                <div className="form-submit">
                  <motion.button
                    type="submit"
                    className="request-quote-btn whatsapp-button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fab fa-whatsapp"></i> Send via WhatsApp
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Cart;
