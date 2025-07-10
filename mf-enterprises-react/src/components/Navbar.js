import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import SearchBar from './SearchBar';
import '../styles/Navbar.css';
import logoImage from '../assets/images/LOGO/Logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount, cartItems, isCartAnimating, removeFromCart } = useCart();
  const location = useLocation();

  // Check if the page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu and cart dropdown when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
  }, [location]);

  // Add a small animation to the cart count when the component mounts
  const [initialRender, setInitialRender] = useState(true);
  useEffect(() => {
    if (initialRender && cartCount > 0) {
      setInitialRender(false);
    }
  }, [initialRender, cartCount]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isCartOpen) setIsCartOpen(false);
  };

  const toggleCartDropdown = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <div className="mobile-menu-icon" onClick={toggleMobileMenu} aria-label="Menu">
          <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'} style={{ fontSize: '1.3rem' }}></i>
        </div>

        <Link to="/" className="navbar-logo">
          <img src={logoImage} alt="MF Enterprises Logo" className="header-logo-image" />
        </Link>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {/* Mobile Search Bar */}
          <div className="mobile-search-container">
            <SearchBar type="mobile" />
          </div>

          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/categories"
              className={`nav-link ${location.pathname.includes('/categories') ? 'active' : ''}`}
            >
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/gallery"
              className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
            >
              Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="nav-cart">
          {/* Desktop Search Bar - Only visible on desktop */}
          <div className="desktop-search-container">
            <SearchBar type="header" />
          </div>

          <a href="#" className="cart-icon" onClick={toggleCartDropdown} aria-label="Shopping Cart">
            <motion.i
              className="fas fa-shopping-cart"
              animate={isCartAnimating ? {
                scale: [1, 1.2, 1],
                rotate: [0, -10, 10, -5, 0]
              } : {}}
              transition={{ duration: 0.5 }}
              style={{ fontSize: '1.3rem' }}
            />
            {cartCount > 0 && (
              <motion.span
                className="cart-count"
                initial={{ scale: 1 }}
                animate={{
                  scale: isCartAnimating ? [1, 1.5, 1] : 1,
                  backgroundColor: isCartAnimating ? ["#e74c3c", "#e67e22", "#e74c3c"] : "#e74c3c"
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
              >
                {cartCount}
              </motion.span>
            )}
          </a>

          {/* Cart Dropdown */}
          <AnimatePresence>
            {isCartOpen && (
              <motion.div
                className="cart-dropdown"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h3>Your Cart ({cartCount} items)</h3>

                {cartItems.length === 0 ? (
                  <p className="empty-cart-message">Your cart is empty</p>
                ) : (
                  <>
                    <div className="cart-items-container">
                      {cartItems.map(item => (
                        <div key={item.id} className="cart-dropdown-item">
                          <div className="cart-item-image">
                            <img src={item.image || "/placeholder.jpg"} alt={item.name} />
                          </div>
                          <div className="cart-item-details">
                            <h4>{item.name}</h4>
                            <p>Qty: {item.quantity}</p>
                          </div>
                          <button
                            className="remove-cart-item"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove item"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="cart-dropdown-footer">
                      <Link to="/cart" className="view-cart-btn">View Cart</Link>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
