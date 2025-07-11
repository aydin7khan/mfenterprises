import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/PowderCoatingSection.css';

const PowderCoatingSection = () => {
  return (
    <section className="powder-coating-section">
      <div className="powder-coating-container">
        <motion.div
          className="powder-coating-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img src={require('../assets/images/Out-Door-Gym/Shoulder Press.jpg')} alt="Powder Coating Plant" />
        </motion.div>

        <motion.div
          className="powder-coating-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2>Professional Powder Coating Services</h2>
          <p>
            At MF-Enterprises, we operate a state-of-the-art powder coating plant that delivers
            exceptional finishes for both our products and custom client projects. Our advanced
            facility ensures superior adhesion, durability, and aesthetic appeal for all metal surfaces.
          </p>

          <div className="powder-coating-features">
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="feature-text">
                <h3>Weather Resistant</h3>
                <p>Protects against UV rays, moisture, and extreme temperatures</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-palette"></i>
              </div>
              <div className="feature-text">
                <h3>Custom Colors</h3>
                <p>Wide range of colors and finishes to match your specific requirements</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <div className="feature-text">
                <h3>Eco-Friendly</h3>
                <p>Environmentally responsible process with minimal waste and emissions</p>
              </div>
            </div>
          </div>

          <Link to="/contact">
            <motion.button
              className="learn-more-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Coating Services
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PowderCoatingSection;
