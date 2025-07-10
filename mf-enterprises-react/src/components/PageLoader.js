import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/PageLoader.css';

const PageLoader = ({ isLoading }) => {
  // Use local state to ensure proper animation exit
  const [shouldRender, setShouldRender] = useState(true); // Always start with true to show loader immediately
  const timerRef = useRef(null);
  const forceHideTimerRef = useRef(null);

  // Handle loading state changes
  useEffect(() => {
    // Clear any existing timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (forceHideTimerRef.current) {
      clearTimeout(forceHideTimerRef.current);
    }

    if (isLoading) {
      // Start the loading animation
      setShouldRender(true);

      // We'll let App.js handle scrolling to top on page changes
      // This prevents unwanted scrolling during normal page interactions

      // Set a failsafe timer to ensure the loader disappears after a maximum time
      forceHideTimerRef.current = setTimeout(() => {
        setShouldRender(false);

        // Also try to remove the loader from the DOM directly as a last resort
        const loader = document.querySelector('.page-loader');
        if (loader) {
          loader.style.display = 'none';
        }
      }, 2500); // 2.5 seconds maximum
    } else {
      // When loading stops, hide the loader after a short delay
      timerRef.current = setTimeout(() => {
        setShouldRender(false);
      }, 150); // Very short delay to allow exit animation
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (forceHideTimerRef.current) {
        clearTimeout(forceHideTimerRef.current);
      }
      // Cleanup complete
    };
  }, [isLoading]);

  // Add a failsafe to force hide the loader if it's still visible after 8 seconds
  useEffect(() => {
    const forceHideLoader = setTimeout(() => {
      const loader = document.querySelector('.page-loader');
      if (loader) {
        loader.style.display = 'none';
        setShouldRender(false);
      }
    }, 2500); // 2.5 seconds maximum for consistency

    return () => clearTimeout(forceHideLoader);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {(isLoading || shouldRender) && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          key="loader"
        >
          <div className="loader-content">
            <div className="spinner-container">
              <div className="spinner-outer">
                <div className="spinner-inner"></div>
              </div>
            </div>
            <motion.div
              className="company-name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {/* Building animation for MF */}
              <div className="logo-container">
                <motion.div
                  className="mf-logo"
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.3
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                  >
                    MF
                  </motion.span>
                </motion.div>
              </div>

              {/* Typing animation for Enterprises */}
              <motion.div className="enterprises-container">
                <motion.span
                  className="enterprises"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: 1.2,
                    delay: 1.0,
                    ease: "easeInOut"
                  }}
                >
                  Enterprises
                </motion.span>
                <motion.span
                  className="cursor"
                  animate={{
                    opacity: [1, 0, 1],
                    x: [0, 0, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                    times: [0, 0.5, 1]
                  }}
                />
              </motion.div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Loading your experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
