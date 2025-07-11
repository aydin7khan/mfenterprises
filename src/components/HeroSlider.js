import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/HeroSlider.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const timerRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: require('../assets/images/home/Hero 1.png'),
      heading: 'Quality Outdoor Gym Equipment',
      subheading: 'Transform public spaces with durable fitness solutions',
      buttonText: 'Explore Products',
      buttonLink: '/categories/outdoor-gym'
    },
    {
      id: 2,
      image: require('../assets/images/home/Hero 2.png'),
      heading: 'Professional Fitness Solutions',
      subheading: 'High-quality outdoor gym equipment for all fitness levels',
      buttonText: 'View Collection',
      buttonLink: '/categories/outdoor-gym'
    },
    {
      id: 3,
      image: require('../assets/images/home/Hero 3.png'),
      heading: 'Durable Outdoor Equipment',
      subheading: 'Built to last with premium materials and powder coating',
      buttonText: 'Learn More',
      buttonLink: '/categories/outdoor-gym'
    }
  ];

  // Reset timer when slide changes
  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setDirection(1);
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Exactly 5 seconds
  };

  // Auto-advance slides
  useEffect(() => {
    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentSlide, slides.length]);

  const nextSlide = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDirection(1);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDirection(-1);
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Variants for slide animations
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  };

  // Variants for content animations
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.3
      }
    }
  };

  return (
    <div className="hero-slider">
      <div className="slider-container">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            className="slide"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 }
            }}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="slide-background">
              <img src={slides[currentSlide].image} alt={slides[currentSlide].heading} />
            </div>
            <motion.div
              className="slide-content"
              initial="hidden"
              animate="visible"
              variants={contentVariants}
            >
              <h1>{slides[currentSlide].heading}</h1>
              <p>{slides[currentSlide].subheading}</p>
              <motion.button
                className="cta-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = slides[currentSlide].buttonLink}
              >
                {slides[currentSlide].buttonText}
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <button className="slider-arrow prev" onClick={prevSlide}>
          <span className="custom-arrow-icon"></span>
        </button>
        <button className="slider-arrow next" onClick={nextSlide}>
          <span className="custom-arrow-icon"></span>
        </button>

        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
