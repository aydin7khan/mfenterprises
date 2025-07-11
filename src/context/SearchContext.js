import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import products from '../data/products';

// Create the search context
const SearchContext = createContext();

// Custom hook to use the search context
export const useSearch = () => useContext(SearchContext);

// Provider component
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Clear search when navigating away from categories page
  useEffect(() => {
    if (!location.pathname.includes('/categories') && !location.pathname.includes('/product/')) {
      clearSearch();
    }
  }, [location.pathname]);

  // Set up debounce for search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Perform search when debounced term changes
  useEffect(() => {
    if (!debouncedTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Add a slight delay to show loading state
    const searchTimer = setTimeout(() => {
      // Improved search logic with better matching
      const term = debouncedTerm.toLowerCase().trim();
      const results = products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(term);
        const descMatch = product.description.toLowerCase().includes(term);
        const subcatMatch = product.subcategory && product.subcategory.toLowerCase().includes(term);
        const categoryMatch = product.category && product.category.toLowerCase().includes(term);

        // Give priority to name matches
        if (nameMatch) return true;
        if (subcatMatch) return true;
        if (categoryMatch) return true;
        if (descMatch) return true;

        return false;
      });

      setSearchResults(results);

      // Keep isSearching true for a moment to show loading state
      setTimeout(() => {
        setIsSearching(false);
      }, 300);
    }, 400);

    return () => clearTimeout(searchTimer);
  }, [debouncedTerm]);

  // Function to handle search input
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Function to clear search
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setDebouncedTerm('');
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  // Function to navigate to search results page
  const navigateToSearchResults = useCallback(() => {
    if (searchTerm.trim()) {
      navigate('/categories', { state: { searchTerm, timestamp: Date.now() } });
    }
  }, [navigate, searchTerm]);

  // Context value
  const value = {
    searchTerm,
    debouncedTerm,
    searchResults,
    isSearching,
    handleSearch,
    clearSearch,
    navigateToSearchResults
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
