import React from 'react';
import { motion } from 'framer-motion';
import '../styles/AboutUs.css';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const AboutUs = () => {
  return (
    <motion.div
      className="about-us-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* SEO Component */}
      <SEO
        title="About Us | MF-Enterprises"
        description="Learn about MF-Enterprises, a leading manufacturer of outdoor gym equipment, playground equipment, gazebos, benches, and FRP dustbins. Our team is dedicated to providing high-quality, durable products for parks, schools, and public spaces."
        canonical="/about"
        keywords="MF-Enterprises, about us, company history, outdoor equipment manufacturer, iron equipment, powder coating, outdoor gym manufacturer, playground equipment manufacturer, company team, Shahnawaz Ainuddin Qazi, Aydin Khan, Sheikh Ilyas"
      />
      <section className="about-hero">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          About MF-Enterprises
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Building Quality Outdoor Equipment Since [Year]
        </motion.p>
      </section>

      <section className="company-overview">
        <div className="overview-content">
          <h2>Our Company</h2>
          <p>
            MF-Enterprises is a leading manufacturer of outdoor gym equipment (Green Gym),
            iron benches, gazebos, FRP dustbins, boats, and playground equipment. We take
            pride in our own powder coating plant that ensures the highest quality finish
            for all our products.
          </p>
          <p>
            With years of experience in the industry, we have established ourselves as a
            trusted name in providing durable, functional, and aesthetically pleasing
            outdoor equipment for parks, schools, residential complexes, and public spaces.
          </p>
        </div>
        <div className="overview-image">
          <img src={require('../assets/images/Contact-About/AboutUs.jpg')} alt="MF Enterprises Facility" />
        </div>
      </section>

      <section className="mission-vision">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            To create high-quality outdoor equipment that enhances public spaces and
            promotes healthy, active lifestyles while maintaining the highest standards
            of durability and design.
          </p>
        </div>
        <div className="vision">
          <h2>Our Vision</h2>
          <p>
            To be the leading provider of outdoor equipment solutions, recognized for
            innovation, quality, and customer satisfaction across the country.
          </p>
        </div>
      </section>

      <section className="our-values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Quality</h3>
            <p>We never compromise on the quality of materials and craftsmanship.</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>We continuously strive to improve our products and processes.</p>
          </div>
          <div className="value-card">
            <h3>Customer Satisfaction</h3>
            <p>We prioritize our customers' needs and ensure their complete satisfaction.</p>
          </div>
          <div className="value-card">
            <h3>Sustainability</h3>
            <p>We are committed to environmentally responsible manufacturing practices.</p>
          </div>
        </div>
      </section>

      <section className="manufacturing">
        <h2>Our Manufacturing Process</h2>
        <div className="manufacturing-content">
          <div className="manufacturing-text">
            <p>
              At MF-Enterprises, we take pride in our comprehensive manufacturing process
              that ensures the highest quality products. From design to delivery, every
              step is carefully monitored and executed with precision.
            </p>
            <p>
              Our in-house powder coating plant allows us to maintain strict quality control
              and provide superior finishes that are both attractive and durable, capable of
              withstanding harsh outdoor conditions.
            </p>
          </div>
          <div className="manufacturing-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Design & Engineering</h3>
                <p>Creating detailed designs with focus on functionality and safety</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Material Selection</h3>
                <p>Choosing high-quality, durable materials for longevity</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Fabrication</h3>
                <p>Precision cutting, shaping, and assembly of components</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Powder Coating</h3>
                <p>Applying durable, weather-resistant finishes in our plant</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Quality Testing</h3>
                <p>Rigorous testing to ensure safety and durability standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-team">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Meet Our Team
        </motion.h2>

        <motion.p
          className="team-intro"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our dedicated team of professionals works together to deliver exceptional products and services.
          With expertise in manufacturing, technology, and marketing, we're committed to excellence in everything we do.
        </motion.p>

        {/* CEO Section - Similar to "Our Company" layout */}
        <div className="ceo-section">
          <motion.div
            className="ceo-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>Shahnawaz Ainuddin Qazi</h3>
            <h4>CEO & Founder</h4>
            <p>
              With extensive experience in manufacturing and outdoor equipment, our CEO has led MF-Enterprises
              to become a trusted name in the industry. His vision and leadership have been instrumental in
              establishing our reputation for quality and innovation.
            </p>
            <p>
              Under his guidance, MF-Enterprises has expanded its product range and market reach,
              delivering high-quality outdoor equipment to clients across India. His commitment to
              excellence and customer satisfaction drives our company's success.
            </p>
            <div className="ceo-contact">
              <a href="tel:+918888956448"><i className="fas fa-phone-alt"></i> +91 8888956448</a>
              <a href="mailto:mfenterprises666@gmail.com"><i className="fas fa-envelope"></i> mfenterprises666@gmail.com</a>
            </div>
          </motion.div>

          <motion.div
            className="ceo-image"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src={require('../assets/images/Members/Shahnawaz Ainuddin Qazi.png')} alt="CEO - Shahnawaz Ainuddin Qazi" />
          </motion.div>
        </div>

        <h3 className="team-members-heading">Our Team Members</h3>

        <div className="team-grid">
          <motion.div
            className="team-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="team-card-image">
              <img src={require('../assets/images/Members/Aydin Khan.png')} alt="Web Designer - Aydin Khan" />
              <div className="team-overlay">
                <div className="team-social">
                  <a href="https://example.com" target="_blank" rel="noopener noreferrer"><i className="fas fa-globe"></i></a>
                  <a href="mailto:aydin@example.com"><i className="fas fa-envelope"></i></a>
                </div>
              </div>
            </div>
            <div className="team-card-content">
              <h3>Aydin Khan</h3>
              <h4>Web Designer & Tech Expert</h4>
              <p>
                Our tech expert brings creative vision and technical expertise to MF-Enterprises' digital presence.
                With a keen eye for design and deep understanding of user experience, they ensure our online
                platform effectively showcases our products and provides an exceptional customer experience.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="team-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="team-card-image">
              <img src={require('../assets/images/Members/Sheikh Ilyas.jpeg')} alt="Marketing Head - Sheikh Ilyas" />
              <div className="team-overlay">
                <div className="team-social">
                  <a href="https://example.com" target="_blank" rel="noopener noreferrer"><i className="fas fa-chart-line"></i></a>
                  <a href="mailto:ilyas@example.com"><i className="fas fa-envelope"></i></a>
                </div>
              </div>
            </div>
            <div className="team-card-content">
              <h3>Sheikh Ilyas</h3>
              <h4>Marketing Head</h4>
              <p>
                Our marketing head drives business growth through innovative strategies and market insights.
                With expertise in brand development and customer engagement, they help position MF-Enterprises
                as a leader in the outdoor equipment industry across India.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="team-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>Interested in Working With Our Team?</h3>
          <p>Contact us today to discuss how we can help with your outdoor equipment needs.</p>
          <Link to="/contact" className="team-cta-button">
            Get in Touch <i className="fas fa-arrow-right"></i>
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default AboutUs;
