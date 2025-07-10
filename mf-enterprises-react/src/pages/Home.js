import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import HeroSlider from '../components/HeroSlider';
import PowderCoatingSection from '../components/PowderCoatingSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaSection from '../components/CtaSection';
import '../styles/Home.css';

const Home = () => {
  return (
    <motion.div
      className="hmp-home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* SEO Component */}
      <SEO
        title="MF-Enterprises - Leading Manufacturer of Outdoor Gym & Playground Equipment"
        description="MF-Enterprises manufactures high-quality outdoor gym equipment, playground equipment, gazebos, benches, and FRP dustbins. All products are made with durable iron and powder coating with 1-year warranty."
        canonical="/"
        keywords="MF-Enterprises, outdoor gym equipment, playground equipment, gazebos, benches, FRP dustbins, iron equipment, powder coating, outdoor fitness, park equipment, school playground, public spaces, durable outdoor equipment, fitness stations, playground systems, outdoor furniture"
      />

      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Featured Products Section */}
      <section className="hmp-featured-products">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Featured Products
        </motion.h2>

        <div className="hmp-product-grid">
          <motion.div
            className="hmp-product-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          >
            <div className="hmp-product-image">
              <img src={require('../assets/images/Out-Door-Gym/Chest Press.jpg')} alt="Outdoor Gym" />
            </div>
            <div className="hmp-product-info">
              <h3>Outdoor Gym Equipment</h3>
              <p>High-quality fitness stations for parks and public spaces.</p>
              <Link to="/categories/outdoor-gym" className="hmp-product-link">View Collection</Link>
            </div>
          </motion.div>

          <motion.div
            className="hmp-product-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          >
            <div className="hmp-product-image">
              <img src={require('../assets/images/Playground/Combination Set playground.jpg')} alt="Playground Equipment" />
            </div>
            <div className="hmp-product-info">
              <h3>Playground Equipment</h3>
              <p>Safe and engaging play structures for children of all ages.</p>
              <Link to="/categories/playground" className="hmp-product-link">View Collection</Link>
            </div>
          </motion.div>

          <motion.div
            className="hmp-product-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          >
            <div className="hmp-product-image">
              <img src={require('../assets/images/Gazebo/Hexagonal Gazebo.webp')} alt="Gazebos" />
            </div>
            <div className="hmp-product-info">
              <h3>Gazebos</h3>
              <p>Elegant structures providing shade and enhancing outdoor areas.</p>
              <Link to="/categories/gazebos" className="hmp-product-link">View Collection</Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hmp-view-all-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link to="/categories" className="hmp-view-all-button">View All Products</Link>
        </motion.div>
      </section>

      {/* About Preview Section */}
      <section className="hmp-about-preview">
        <motion.div
          className="hmp-about-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>About MF-Enterprises</h2>
          <p>
            MF-Enterprises is a leading manufacturer of outdoor gym equipment,
            playground equipment, gazebos, benches, FRP dustbins, and boats.
            With our own powder coating plant, we ensure the highest quality
            products for our customers.
          </p>
          <p>
            Our commitment to quality, durability, and customer satisfaction has made us
            a trusted name in the industry. We take pride in transforming public spaces
            into functional, attractive areas that enhance community well-being.
          </p>
          <Link to="/about" className="hmp-secondary-button">Learn More About Us</Link>
        </motion.div>

        <motion.div
          className="hmp-about-image"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img src={require('../assets/images/Contact-About/AboutUs.jpg')} alt="About MF-Enterprises" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="hmp-services-section">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>

        <div className="hmp-services-grid">
          <motion.div
            className="hmp-service-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
          >
            <div className="hmp-service-icon">
              <i className="fas fa-tools"></i>
            </div>
            <h3>Custom Manufacturing</h3>
            <p>We create custom outdoor equipment based on your specifications, ensuring perfect fit for your space and requirements.</p>
          </motion.div>

          <motion.div
            className="hmp-service-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
          >
            <div className="hmp-service-icon">
              <i className="fas fa-truck"></i>
            </div>
            <h3>Installation</h3>
            <p>Professional installation services for all our products, ensuring safety and proper setup for optimal performance.</p>
          </motion.div>

          <motion.div
            className="hmp-service-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
          >
            <div className="hmp-service-icon">
              <i className="fas fa-wrench"></i>
            </div>
            <h3>Maintenance</h3>
            <p>Regular maintenance and repair services for long-lasting equipment, extending the life of your investment.</p>
          </motion.div>
        </div>
      </section>

      {/* Powder Coating Section */}
      <PowderCoatingSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CtaSection />
    </motion.div>
  );
};

export default Home;
