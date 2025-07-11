import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/TestimonialsSection.css';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const timerRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      position: 'Parks Department Director',
      company: 'Municipal Corporation',
      rating: 5,
      quote: 'The outdoor gym equipment provided by MF-Enterprises has transformed our public parks. The quality is exceptional, and the equipment has withstood all weather conditions for years without any issues. Their team was professional from installation to follow-up.'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      position: 'School Principal',
      company: 'Delhi Public School',
      rating: 5,
      quote: 'Our students love the new playground equipment! MF-Enterprises understood our needs perfectly and delivered a safe, engaging play area that caters to children of all ages. Their attention to safety standards while maintaining fun elements is commendable.'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      position: 'Project Manager',
      company: 'Urban Development Authority',
      rating: 5,
      quote: 'We\'ve worked with MF-Enterprises on multiple city beautification projects. Their iron benches and gazebos are not only aesthetically pleasing but also incredibly durable. Their powder coating service ensures everything looks pristine even after years of public use.'
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
    <section className="testimonials-section">
      <div className="testimonials-container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          What Our Clients Say
        </motion.h2>

        <div className="testimonials-slider">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentTestimonial}
              className="testimonial"
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
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="testimonial-text">{testimonials[currentTestimonial].quote}</p>
              </div>

              <div className="testimonial-author">
                <div className="author-image"></div>
                <div className="author-info">
                  <h3>{testimonials[currentTestimonial].name}</h3>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < testimonials[currentTestimonial].rating ? 'filled' : ''}`}
                      ></i>
                    ))}
                  </div>
                  <p>{testimonials[currentTestimonial].position}</p>
                  <p className="company">{testimonials[currentTestimonial].company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button className="testimonial-arrow prev" onClick={prevTestimonial}>
            <span className="custom-arrow-icon"></span>
          </button>
          <button className="testimonial-arrow next" onClick={nextTestimonial}>
            <span className="custom-arrow-icon"></span>
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-dot ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => goToTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
