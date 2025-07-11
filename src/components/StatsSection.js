import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/StatsSection.css';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    customers: 0,
    cities: 0,
    projects: 0,
    years: 0
  });
  
  const targetValues = {
    customers: 500,
    cities: 50,
    projects: 1000,
    years: 15
  };
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  
  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const interval = 20; // Update every 20ms
      const steps = duration / interval;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          customers: Math.floor(targetValues.customers * progress),
          cities: Math.floor(targetValues.cities * progress),
          projects: Math.floor(targetValues.projects * progress),
          years: Math.floor(targetValues.years * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(targetValues);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-overlay"></div>
      <div className="stats-container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Impact in Numbers
        </motion.h2>
        
        <div className="stats-grid">
          <motion.div 
            className="stat-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="stat-icon">
              <i className="fas fa-smile"></i>
            </div>
            <div className="stat-number">{counters.customers}+</div>
            <div className="stat-label">Happy Customers</div>
          </motion.div>
          
          <motion.div 
            className="stat-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="stat-icon">
              <i className="fas fa-city"></i>
            </div>
            <div className="stat-number">{counters.cities}+</div>
            <div className="stat-label">Cities Served</div>
          </motion.div>
          
          <motion.div 
            className="stat-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="stat-icon">
              <i className="fas fa-project-diagram"></i>
            </div>
            <div className="stat-number">{counters.projects}+</div>
            <div className="stat-label">Projects Completed</div>
          </motion.div>
          
          <motion.div 
            className="stat-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="stat-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="stat-number">{counters.years}+</div>
            <div className="stat-label">Years of Experience</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
