import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ContactUs.css';
import { useLoading } from '../context/LoadingContext';
import { openWhatsApp } from '../utils/whatsappHelper';
import SEO from '../components/SEO';

const ContactUs = () => {
  const { startLoading, stopLoading } = useLoading();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    interests: {
      'outdoor-gym': false,
      'playground': false,
      'gazebos': false,
      'benches': false,
      'dustbins': false,
      'powder-coating': false
    },
    referralSource: ''
  });

  // Product categories with subcategories
  const productCategories = [
    {
      id: 'outdoor-gym',
      name: 'Outdoor Gym Equipment',
      icon: '💪'
    },
    {
      id: 'playground',
      name: 'Playground Equipment',
      icon: '🛝'
    },
    {
      id: 'gazebos',
      name: 'Gazebos',
      icon: '🏛️'
    },
    {
      id: 'benches',
      name: 'Benches',
      icon: '🪑'
    },
    {
      id: 'dustbins',
      name: 'FRP Dustbins',
      icon: '🗑️'
    },
    {
      id: 'powder-coating',
      name: 'Powder Coating Services',
      icon: '🎨'
    }
  ];

  const referralSources = [
    'Google Search',
    'Social Media',
    'Friend/Colleague',
    'Business Directory',
    'Trade Show/Exhibition',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handle interests checkboxes
      if (name.startsWith('interest-')) {
        const interest = name.replace('interest-', '');
        setFormData(prevState => ({
          ...prevState,
          interests: {
            ...prevState.interests,
            [interest]: checked
          }
        }));
      }
    } else {
      // Handle other form fields
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.message.trim()) errors.message = "Message is required";

    // Check if at least one interest is selected
    const hasInterest = Object.values(formData.interests).some(value => value === true);
    if (!hasInterest) errors.interests = "Please select at least one product interest";

    return errors;
  };

  // Function to create WhatsApp message from form data
  const createWhatsAppMessage = () => {
    // Get selected interests
    const selectedInterests = Object.entries(formData.interests)
      .filter(([_, isSelected]) => isSelected)
      .map(([interest, _]) => {
        // Find the category name from productCategories
        const category = productCategories.find(cat => cat.id === interest);
        return category ? category.name : interest;
      })
      .join(', ');

    // Create message
    let message = `*New Inquiry from Website*\n\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Email:* ${formData.email}\n`;
    message += `*Phone:* ${formData.phone}\n`;

    if (formData.company) {
      message += `*Company:* ${formData.company}\n`;
    }

    message += `*Interested In:* ${selectedInterests}\n\n`;
    message += `*Message:*\n${formData.message}\n\n`;

    if (formData.referralSource) {
      message += `*Heard about us from:* ${formData.referralSource}\n`;
    }

    return encodeURIComponent(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Show loading animation
    startLoading();

    // Create WhatsApp message
    const whatsappMessage = createWhatsAppMessage();

    // Simulate a short delay before redirecting
    setTimeout(() => {
      // Log form data
      console.log('Form submitted:', formData);

      // Stop loading animation
      stopLoading();

      // Show success message
      setFormSubmitted(true);

      // Open WhatsApp using the helper function
      openWhatsApp('919021535909', whatsappMessage);

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          interests: {
            'outdoor-gym': false,
            'playground': false,
            'gazebos': false,
            'benches': false,
            'dustbins': false,
            'powder-coating': false
          },
          referralSource: ''
        });
      }, 5000);
    }, 1000);
  };

  return (
    <motion.div
      className="ctu-contact-us-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* SEO Component */}
      <SEO
        title="Contact Us | MF-Enterprises"
        description="Contact MF-Enterprises for inquiries about our outdoor gym equipment, playground equipment, gazebos, benches, and FRP dustbins. Request a quote or get in touch with our team for more information."
        canonical="/contact"
        keywords="MF-Enterprises contact, request quote, outdoor equipment inquiry, contact form, WhatsApp contact, outdoor gym equipment quote, playground equipment quote, gazebos quote, benches quote, FRP dustbins quote, powder coating services"
      />
      <section className="ctu-contact-hero">
        <motion.div
          className="ctu-hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Get in touch with our team for inquiries, quotations, or support
          </motion.p>
        </motion.div>
      </section>

      <div className="ctu-contact-content">
        <motion.div
          className="ctu-contact-info"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2>Contact Information</h2>

          <div className="ctu-info-item">
            <div className="ctu-info-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="ctu-info-text">
              <h3>Address</h3>
              <p>Plot No.14 Wanjra Baba Diwan Layout, Teka Naka, Nagpur-440026, Maharashtra, India</p>
              <a href="https://maps.google.com/?q=Plot No.14 Wanjra Baba Diwan Layout, Teka Naka, Nagpur-440026, Maharashtra, India" target="_blank" rel="noopener noreferrer" className="ctu-directions-link">
                <i className="fas fa-directions"></i> Get Directions
              </a>
            </div>
          </div>

          <div className="ctu-info-item">
            <div className="ctu-info-icon">
              <i className="fas fa-user-tie"></i>
            </div>
            <div className="ctu-info-text">
              <h3>CEO</h3>
              <p>Shahnawaz Ainuddin Qazi</p>
            </div>
          </div>

          <div className="ctu-info-item">
            <div className="ctu-info-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div className="ctu-info-text">
              <h3>Phone</h3>
              <p><a href="tel:+918888956448">+91 8888956448</a></p>
              <p><a href="tel:+919021535909">+91 9021535909</a></p>
            </div>
          </div>

          <div className="ctu-info-item">
            <div className="ctu-info-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="ctu-info-text">
              <h3>Email</h3>
              <p><a href="mailto:mfenterprises666@gmail.com">mfenterprises666@gmail.com</a></p>
            </div>
          </div>

          <div className="ctu-info-item">
            <div className="ctu-info-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="ctu-info-text">
              <h3>Business Hours</h3>
              <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="ctu-contact-form-container"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {formSubmitted ? (
              <motion.div
                className="ctu-form-success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="ctu-success-icon">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <h2>Thank You!</h2>
                <p>Your message is being sent via WhatsApp. If WhatsApp doesn't open automatically, please check your browser settings.</p>
                <p className="ctu-whatsapp-note">We will get back to you shortly!</p>
              </motion.div>
            ) : (
              <motion.div
                className="ctu-contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2>Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="ctu-form-row">
                    <div className="ctu-form-group">
                      <label htmlFor="ctu-name">
                        <i className="fas fa-user"></i> Full Name <span className="ctu-required">*</span>
                      </label>
                      <input
                        type="text"
                        id="ctu-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={formErrors.name ? 'ctu-error' : ''}
                        placeholder="Your full name"
                      />
                      {formErrors.name && <div className="ctu-error-message">{formErrors.name}</div>}
                    </div>

                    <div className="ctu-form-group">
                      <label htmlFor="ctu-email">
                        <i className="fas fa-envelope"></i> Email Address <span className="ctu-required">*</span>
                      </label>
                      <input
                        type="email"
                        id="ctu-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={formErrors.email ? 'ctu-error' : ''}
                        placeholder="your.email@example.com"
                      />
                      {formErrors.email && <div className="ctu-error-message">{formErrors.email}</div>}
                    </div>
                  </div>

                  <div className="ctu-form-row">
                    <div className="ctu-form-group">
                      <label htmlFor="ctu-phone">
                        <i className="fas fa-phone"></i> Phone Number <span className="ctu-required">*</span>
                      </label>
                      <input
                        type="tel"
                        id="ctu-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={formErrors.phone ? 'ctu-error' : ''}
                        placeholder="Your phone number"
                      />
                      {formErrors.phone && <div className="ctu-error-message">{formErrors.phone}</div>}
                    </div>

                    <div className="ctu-form-group">
                      <label htmlFor="ctu-company">
                        <i className="fas fa-building"></i> Company/Organization
                      </label>
                      <input
                        type="text"
                        id="ctu-company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company name (optional)"
                      />
                    </div>
                  </div>



                  <div className="ctu-form-group">
                    <label htmlFor="ctu-message">
                      <i className="fas fa-comment"></i> Message <span className="ctu-required">*</span>
                    </label>
                    <textarea
                      id="ctu-message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={formErrors.message ? 'ctu-error' : ''}
                      placeholder="Please provide details about your inquiry..."
                    ></textarea>
                    {formErrors.message && <div className="ctu-error-message">{formErrors.message}</div>}
                  </div>

                  <div className="ctu-form-group ctu-interest-section">
                    <label>
                      <i className="fas fa-star"></i> I am interested in <span className="ctu-required">*</span>
                    </label>
                    {formErrors.interests && <div className="ctu-error-message">{formErrors.interests}</div>}

                    <div className="ctu-interest-options">
                      {productCategories.map(category => (
                        <motion.div
                          key={category.id}
                          className="ctu-interest-option"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <input
                            type="checkbox"
                            id={`ctu-interest-${category.id}`}
                            name={`interest-${category.id}`}
                            checked={formData.interests[category.id]}
                            onChange={handleChange}
                          />
                          <label htmlFor={`ctu-interest-${category.id}`} className="ctu-interest-label">
                            <span className="ctu-interest-icon">{category.icon}</span>
                            <span className="ctu-interest-text">{category.name}</span>
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="ctu-form-group">
                    <label htmlFor="ctu-referralSource">
                      <i className="fas fa-question-circle"></i> How did you hear about us?
                    </label>
                    <select
                      id="ctu-referralSource"
                      name="referralSource"
                      value={formData.referralSource}
                      onChange={handleChange}
                    >
                      <option value="">Please select...</option>
                      {referralSources.map((source, index) => (
                        <option key={index} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>

                  <motion.button
                    type="submit"
                    className="ctu-submit-button ctu-whatsapp-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-whatsapp"></i> Send via WhatsApp
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <section className="ctu-map-section">
        <h2>Find Us</h2>
        <div className="ctu-map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.8861956088!2d79.0731!3d21.1525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA5JzA5LjAiTiA3OcKwMDQnMjMuMiJF!5e0!3m2!1sen!2sin!4v1623456789012!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MF Enterprises Location"
          ></iframe>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactUs;
