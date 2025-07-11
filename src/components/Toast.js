import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Toast.css';

const Toast = ({ product, quantity = 1, onClose, index = 0, total = 1 }) => {
  // Calculate position based on index (stacking)
  const offsetY = index * 10; // Slight offset for stacking effect
  const bottomPosition = 30 + (index * 80); // Base position + offset for each toast

  return (
    <motion.div
      className="toast-container"
      style={{ bottom: bottomPosition }}
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{
        opacity: 1,
        y: offsetY,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      exit={{
        opacity: 0,
        y: 100,
        scale: 0.8,
        transition: {
          duration: 0.3
        }
      }}
    >
      <div className="toast-content">
        <motion.div
          className="toast-icon"
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            transition: {
              delay: 0.2,
              type: "spring",
              stiffness: 500
            }
          }}
        >
          <i className="fas fa-check"></i>
        </motion.div>

        <div className="toast-message">
          <motion.div
            className="toast-product"
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                delay: 0.3,
                duration: 0.4
              }
            }}
          >
            <strong>{quantity > 1 ? `${quantity} x ` : ''}{product}</strong> added to cart
          </motion.div>

          <motion.div
            className="toast-view-cart"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.5,
                duration: 0.4
              }
            }}
          >
            <a href="/cart">View Cart</a>
          </motion.div>
        </div>

        <motion.button
          className="toast-close"
          onClick={onClose}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fas fa-times"></i>
        </motion.button>
      </div>

      <motion.div
        className="toast-progress"
        initial={{ width: "100%" }}
        animate={{
          width: "0%",
          transition: {
            duration: 3,
            ease: "linear"
          }
        }}
      />
    </motion.div>
  );
};

export default Toast;
