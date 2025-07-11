import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '../context/SearchContext';
import '../styles/SearchBar.css';

const SearchBar = ({ type = 'header' }) => {
  const {
    searchTerm,
    searchResults,
    isSearching,
    handleSearch,
    clearSearch,
    navigateToSearchResults
  } = useSearch();

  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();

  // Reset search bar state when location changes
  useEffect(() => {
    if (type === 'products' && !location.pathname.includes('/categories')) {
      clearSearch();
    }
  }, [location.pathname, type, clearSearch]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle input change with debounce built into the context
  const handleInputChange = useCallback((e) => {
    handleSearch(e.target.value);
    setShowResults(true);
  }, [handleSearch]);

  // Handle search submit
  const handleSubmit = useCallback((e) => {
    if (e) e.preventDefault();

    if (searchTerm.trim()) {
      navigateToSearchResults();
      setShowResults(false);
    }
  }, [searchTerm, navigateToSearchResults]);

  // Handle clear button click
  const handleClear = useCallback(() => {
    clearSearch();
    setShowResults(false);
  }, [clearSearch]);

  // Handle result item click
  const handleResultClick = useCallback(() => {
    setShowResults(false);
  }, []);

  // Determine class names based on type
  const containerClass = type === 'header' ? 'search-container' :
                         type === 'mobile' ? 'mobile-search-container' :
                         'products-search-container';

  const barClass = type === 'header' ? 'search-bar' :
                   type === 'mobile' ? 'mobile-search-bar' :
                   'products-search-bar';

  const inputClass = type === 'header' ? 'search-input' :
                     type === 'mobile' ? 'mobile-search-input' :
                     'products-search-input';

  const iconClass = type === 'header' ? 'search-icon' :
                    type === 'mobile' ? 'mobile-search-icon' :
                    'products-search-icon';

  return (
    <div className={containerClass} ref={searchRef}>
      <form onSubmit={handleSubmit} className={barClass}>
        <input
          type="text"
          className={inputClass}
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleInputChange}
          aria-label="Search products"
          autoComplete="off"
        />
        {searchTerm && (
          <i
            className="fas fa-times products-search-clear"
            onClick={handleClear}
            aria-label="Clear search"
          ></i>
        )}
        <i
          className={`fas fa-search ${iconClass}`}
          onClick={handleSubmit}
          aria-label="Search"
        ></i>
      </form>

      {/* Search Results Dropdown */}
      {type !== 'products' && (
        <AnimatePresence>
          {showResults && searchTerm && (
            <motion.div
              className="search-results"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {isSearching ? (
                <div className="search-results-loading">
                  <div className="search-loader"></div>
                  <p>Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  {searchResults.slice(0, 5).map(product => (
                    <Link
                      to={`/product/${product.id}`}
                      key={product.id}
                      onClick={handleResultClick}
                    >
                      <div className="search-results-item">
                        <div className="search-results-image">
                          <img src={product.image || "/placeholder.jpg"} alt={product.name} />
                        </div>
                        <div className="search-results-info">
                          <h4>{product.name}</h4>
                          <p>{product.category.replace(/-/g, ' ')}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {searchResults.length > 5 && (
                    <div
                      className="search-results-item search-results-view-all"
                      onClick={() => {
                        navigateToSearchResults();
                        setShowResults(false);
                      }}
                    >
                      View all {searchResults.length} results
                    </div>
                  )}
                </>
              ) : (
                <div className="search-results-empty">
                  No products found
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default SearchBar;
