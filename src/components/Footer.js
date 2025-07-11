import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo-container">
          <motion.div
            className="footer-logo"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>MF-Enterprises</h2>
            <p>Quality Outdoor Solutions</p>
          </motion.div>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">About Us</h3>
          <p className="footer-description">
            Leading manufacturer of outdoor gym equipment, playground equipment,
            gazebos, chairs, FRP dustbins, and boats. We also offer professional
            powder coating services for all your metal finishing needs.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/categories">Products</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Products</h3>
          <ul className="footer-links">
            <li><Link to="/categories/outdoor-gym">Outdoor Gym Equipment</Link></li>
            <li><Link to="/categories/playground">Playground Equipment</Link></li>
            <li><Link to="/categories/gazebos">Gazebos</Link></li>
            <li><Link to="/categories/benches">Benches</Link></li>
            <li><Link to="/categories/dustbins">FRP Dustbins</Link></li>
            <li><Link to="/categories/boats">Boats</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <ul className="contact-info">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>Plot No.14 Wanjra Baba Diwan Layout, Teka Naka, Nagpur-440026, Maharashtra, India</span>
            </li>
            <li>
              <i className="fas fa-phone-alt"></i>
              <span>+91 8888956448, +91 9021535909</span>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <span>mfenterprises666@gmail.com</span>
            </li>
            <li>
              <i className="fas fa-clock"></i>
              <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="copyright">
            &copy; {currentYear} MF-Enterprises. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
