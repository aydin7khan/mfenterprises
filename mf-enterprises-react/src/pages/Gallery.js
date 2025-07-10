import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Gallery.css';
import SEO from '../components/SEO';

const Gallery = () => {
  // State for testimonials slider
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const timerRef = useRef(null);

  // Gallery data with city images
  const galleryItems = [
    {
      id: 1,
      title: 'Bangalore Installation',
      category: 'outdoor-gym',
      image: require('../assets/images/Gallery/Banglore.png'),
      location: 'Bangalore',
      description: 'Outdoor gym equipment installation in Bangalore.'
    },
    {
      id: 2,
      title: 'Bangalore Park Project',
      category: 'outdoor-gym',
      image: require('../assets/images/Gallery/Banglore (2).png'),
      location: 'Bangalore',
      description: 'Complete outdoor gym installation with multiple fitness stations in Bangalore.'
    },
    {
      id: 3,
      title: 'Jalgaon Installation',
      category: 'playground',
      image: require('../assets/images/Gallery/Jalgaon.png'),
      location: 'Jalgaon',
      description: 'Playground equipment installation in Jalgaon.'
    },
    {
      id: 4,
      title: 'Jharkhand Project',
      category: 'outdoor-gym',
      image: require('../assets/images/Gallery/Jharkhand.png'),
      location: 'Jharkhand',
      description: 'Outdoor gym equipment installation in Jharkhand.'
    },
    {
      id: 5,
      title: 'Kerala Installation',
      category: 'playground',
      image: require('../assets/images/Gallery/Kerala.png'),
      location: 'Kerala',
      description: 'Playground equipment installation in Kerala.'
    },
    {
      id: 6,
      title: 'Kerala Park Project',
      category: 'gazebos',
      image: require('../assets/images/Gallery/Kerala.jpeg'),
      location: 'Kerala',
      description: 'Gazebo installation in a public park in Kerala.'
    },
    {
      id: 7,
      title: 'Khandwa Installation',
      category: 'outdoor-gym',
      image: require('../assets/images/Gallery/Khandwa.png'),
      location: 'Khandwa',
      description: 'Outdoor gym equipment installation in Khandwa.'
    },
    {
      id: 8,
      title: 'Manipur Project',
      category: 'playground',
      image: require('../assets/images/Gallery/Manipur.png'),
      location: 'Manipur',
      description: 'Playground equipment installation in Manipur.'
    },
    {
      id: 9,
      title: 'Nagpur Kanhan Installation',
      category: 'outdoor-gym',
      image: require('../assets/images/Gallery/Nagpur, Kanhan.png'),
      location: 'Nagpur, Kanhan',
      description: 'Outdoor gym equipment installation in Nagpur, Kanhan.'
    },
    {
      id: 10,
      title: 'Nagpur Project',
      category: 'benches',
      image: require('../assets/images/Gallery/Nagpur.jpeg'),
      location: 'Nagpur',
      description: 'Bench installation in a public park in Nagpur.'
    },
    {
      id: 11,
      title: 'Sangli Installation',
      category: 'playground',
      image: require('../assets/images/Gallery/Sangli.png'),
      location: 'Sangli',
      description: 'Playground equipment installation in Sangli.'
    },
    {
      id: 12,
      title: 'Sangli Park Project',
      category: 'outdoor-gym',
      image: require('../assets/images/Gallery/Sangli (2).png'),
      location: 'Sangli',
      description: 'Outdoor gym equipment installation in Sangli.'
    }
  ];

  // No lightbox functionality needed

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      position: 'Parks Department Director',
      company: 'Municipal Corporation',
      rating: 5,
      quote: 'MF Enterprises delivered exceptional quality outdoor gym equipment for our municipal park. The installation was professional and timely. Our community members are thrilled with the new facilities.'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      position: 'School Principal',
      company: 'Nagpur',
      rating: 5,
      quote: 'The playground equipment installed by MF Enterprises has transformed our school\'s recreational area. The children love the colorful and safe play structures, and we appreciate the durability and quality.'
    },
    {
      id: 3,
      name: 'Anand Patel',
      position: 'Parks Department',
      company: 'Kerala',
      rating: 4.5,
      quote: 'We\'ve received numerous compliments on the gazebos installed by MF Enterprises in our public park. The craftsmanship is outstanding, and they\'ve become a favorite gathering spot for our community.'
    }
  ];

  // Reset timer when testimonial changes
  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setDirection(1);
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  // Auto-advance testimonials
  useEffect(() => {
    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentTestimonial, testimonials.length]);

  const nextTestimonial = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDirection(index > currentTestimonial ? 1 : -1);
    setCurrentTestimonial(index);
  };

  // Variants for testimonial animations
  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0
    })
  };

  return (
    <motion.div
      className="gallery-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* SEO Component */}
      <SEO
        title="Our Portfolio | MF-Enterprises"
        description="View our portfolio of completed projects across India. MF-Enterprises has installed outdoor gym equipment, playground equipment, gazebos, and benches in various cities including Bangalore, Nagpur, Kerala, Jharkhand, and more."
        canonical="/gallery"
        keywords="MF-Enterprises portfolio, outdoor gym installations, playground installations, gazebo installations, bench installations, Bangalore projects, Nagpur projects, Kerala projects, Jharkhand projects, Sangli projects, Manipur projects, Khandwa projects, Jalgaon projects, outdoor equipment installations"
      />
      <section className="gallery-hero">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Our Portfolio
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Showcasing our excellence across India
        </motion.p>
      </section>

      <motion.div
        className="gallery-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {galleryItems.map(item => (
          <motion.div
            key={item.id}
            className="gallery-item"
            whileHover={{
              scale: 1.03,
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}
          >
            <div className="gallery-image">
              <img src={item.image} alt={item.title} />
              <div className="city-overlay">
                <h3 className="city-name">{item.location}</h3>
              </div>
            </div>
            <div className="gallery-info">
              <h3>{item.location}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Testimonials Section */}
      <section className="gallery-testimonials">
        <div className="testimonials-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>

          {/* Desktop Grid View */}
          <div className="testimonials-grid">
            <motion.div
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="testimonial-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <div className="testimonial-content">
                <p>"{testimonials[0].quote}"</p>
              </div>
              <div className="testimonial-author">
                <h4>{testimonials[0].name}</h4>
                <p>{testimonials[0].position}, {testimonials[0].company}</p>
              </div>
            </motion.div>

            <motion.div
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="testimonial-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <div className="testimonial-content">
                <p>"{testimonials[1].quote}"</p>
              </div>
              <div className="testimonial-author">
                <h4>{testimonials[1].name}</h4>
                <p>{testimonials[1].position}, {testimonials[1].company}</p>
              </div>
            </motion.div>

            <motion.div
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="testimonial-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <div className="testimonial-content">
                <p>"{testimonials[2].quote}"</p>
              </div>
              <div className="testimonial-author">
                <h4>{testimonials[2].name}</h4>
                <p>{testimonials[2].position}, {testimonials[2].company}</p>
              </div>
            </motion.div>
          </div>

          {/* Mobile Slider View */}
          <div className="gal-testimonials-slider">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentTestimonial}
                className="gal-testimonial"
                custom={direction}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
              >
                <div className="gal-testimonial-content">
                  <div className="gal-testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < Math.floor(testimonials[currentTestimonial].rating) ? 'filled' : ''} ${
                          testimonials[currentTestimonial].rating % 1 !== 0 && i === Math.floor(testimonials[currentTestimonial].rating) ? 'fas fa-star-half-alt filled' : ''
                        }`}
                      ></i>
                    ))}
                  </div>
                  <p className="gal-testimonial-text">"{testimonials[currentTestimonial].quote}"</p>
                </div>

                <div className="gal-testimonial-author">
                  <h4>{testimonials[currentTestimonial].name}</h4>
                  <p>{testimonials[currentTestimonial].position}, {testimonials[currentTestimonial].company}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button className="gal-testimonial-arrow prev" onClick={prevTestimonial}>
              <span className="gal-custom-arrow-icon"></span>
            </button>
            <button className="gal-testimonial-arrow next" onClick={nextTestimonial}>
              <span className="gal-custom-arrow-icon"></span>
            </button>
          </div>

          <div className="gal-testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`gal-testimonial-dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gallery-cta">
        <div className="cta-overlay"></div>
        <div className="cta-container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Space?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's discuss your project requirements and create the perfect outdoor solution for your needs.
          </motion.p>

          <div className="cta-buttons">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                to="/contact"
                className="cta-button primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request a Quote
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                to="/categories"
                className="cta-button secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Products
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Gallery;
