import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import SearchBar from '../components/SearchBar';
import SEO from '../components/SEO';
import '../styles/Categories.css';
import '../styles/SearchBar.css';
import products from '../data/products';

const Categories = () => {
  const params = useParams();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(params.category || 'all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isFiltering, setIsFiltering] = useState(false);
  const [categoryProductCounts, setCategoryProductCounts] = useState({});
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const { addToCart, isCartAnimating } = useCart();
  const { searchTerm, searchResults, handleSearch, clearSearch } = useSearch();

  // Refs for scrolling
  const productsListRef = useRef(null);

  // Define categories with icons
  const categories = [
    { id: 'all', name: 'All Products', icon: '🏆' },
    { id: 'outdoor-gym', name: 'Outdoor Gym', icon: '💪' },
    { id: 'playground', name: 'Playground', icon: '🛝' },
    { id: 'gazebos', name: 'Gazebos', icon: '🏛️' },
    { id: 'benches', name: 'Benches', icon: '🪑' },
    { id: 'dustbins', name: 'FRP Dustbins', icon: '🗑️' },
    { id: 'boats', name: 'Boats', icon: '🚤', comingSoon: true }
  ];

  // Check for search term in location state
  useEffect(() => {
    if (location.state && location.state.searchTerm) {
      handleSearch(location.state.searchTerm);
      setIsSearchActive(true);

      // Reset category to 'all' when searching
      setSelectedCategory('all');
    }
  }, [location.state?.timestamp, handleSearch]);

  // Calculate product counts for each category
  useEffect(() => {
    const counts = { all: products.length };

    categories.forEach(category => {
      if (category.id !== 'all') {
        counts[category.id] = products.filter(product =>
          product.category === category.id
        ).length;
      }
    });

    setCategoryProductCounts(counts);
  }, []);

  // Handle search functionality with search results from context
  useEffect(() => {
    if (searchTerm) {
      setIsSearchActive(true);
      setIsSearchLoading(true);

      // Small delay to show loading state
      const timer = setTimeout(() => {
        setSearchedProducts(searchResults);
        setIsSearchLoading(false);

        // Scroll to products list after search is complete
        if (productsListRef.current) {
          setTimeout(() => {
            productsListRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
        }
      }, 600);

      return () => clearTimeout(timer);
    } else {
      setIsSearchActive(false);
      setIsSearchLoading(false);
    }
  }, [searchTerm, searchResults]);

  // Clear search when changing category
  useEffect(() => {
    if (!isSearchActive) return;

    if (selectedCategory !== 'all') {
      clearSearch();
      setIsSearchActive(false);
    }
  }, [selectedCategory, clearSearch]);

  // Filter products based on selected category and search
  const filteredProducts = isSearchActive
    ? searchedProducts
    : selectedCategory === 'all'
      ? products
      : products.filter(product => product.category === selectedCategory);

  // Handle category change with animation
  const handleCategoryChange = useCallback((categoryId) => {
    if (categoryId !== selectedCategory) {
      // Set filtering state to true and change category
      setIsFiltering(true);

      // If search is active, clear it when changing categories
      if (isSearchActive && searchTerm) {
        clearSearch();
      }

      // Use a single timeout to reset the filtering state
      setTimeout(() => {
        setSelectedCategory(categoryId);
        setIsFiltering(false);
      }, 800);
    }
  }, [selectedCategory, isSearchActive, searchTerm, clearSearch]);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    // Add the product to cart using the context
    // The toast notification is now handled by the CartContext
    addToCart(product, 1);
  };

  // Get category name for SEO
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'All Products';
  };

  // Generate SEO title
  const generateTitle = () => {
    if (selectedCategory === 'all') {
      return 'All Products | MF-Enterprises';
    }
    return `${getCategoryName(selectedCategory)} | MF-Enterprises`;
  };

  // Generate SEO description
  const generateDescription = () => {
    if (selectedCategory === 'all') {
      return 'MF-Enterprises offers a premium collection of high-quality outdoor equipment including outdoor gym equipment, playground equipment, gazebos, benches, and FRP dustbins. All products are manufactured with durable iron and weather-resistant powder coating, designed for parks, schools, residential complexes, and public spaces across India. Contact us for quotes and customization options.';
    }

    const categoryName = getCategoryName(selectedCategory);
    const count = categoryProductCounts[selectedCategory] || 0;

    const categoryDescriptions = {
      'outdoor-gym': `Browse our collection of ${count} premium Outdoor Gym Equipment products from MF-Enterprises. Our fitness stations are made with high-quality iron and durable powder coating, designed to withstand all weather conditions. Perfect for parks, schools, residential complexes, and public spaces. Our outdoor gym equipment promotes health and fitness for users of all ages and abilities.`,

      'playground': `Explore our range of ${count} Playground Equipment options from MF-Enterprises. Our playground structures include swings, slides, merry-go-rounds, seesaws, and climbing frames, all manufactured with durable iron and safe powder coating. Designed for children's enjoyment and development in parks, schools, and residential areas across India.`,

      'gazebos': `Discover our collection of ${count} elegant Gazebos from MF-Enterprises. Our gazebos provide stylish shelter and gathering spaces for parks, gardens, and public areas. Built with high-quality iron and protective powder coating for long-lasting performance in all weather conditions.`,

      'benches': `View our selection of ${count} durable Benches from MF-Enterprises. Our iron benches with powder coating offer comfortable seating solutions for parks, gardens, schools, and public spaces. Designed for longevity and minimal maintenance in outdoor environments.`,

      'dustbins': `Check out our range of ${count} FRP Dustbins from MF-Enterprises. Our fiberglass reinforced plastic dustbins are designed for effective waste management in public spaces, parks, and commercial areas. Durable, weather-resistant, and available in various designs.`
    };

    return categoryDescriptions[selectedCategory] || `Browse our collection of ${count} ${categoryName} products from MF-Enterprises. High-quality, durable iron construction with powder coating. Perfect for parks, schools, and public spaces across India. Contact us for quotes and customization options.`;
  };

  // Generate SEO keywords
  const generateKeywords = () => {
    const baseKeywords = [
      'MF-Enterprises',
      'outdoor equipment',
      'iron equipment',
      'powder coating',
      'playground manufacturer',
      'outdoor gym equipment',
      'park equipment',
      'school playground',
      'public park equipment',
      'outdoor fitness equipment',
      'children playground equipment',
      'commercial playground equipment',
      'outdoor exercise equipment',
      'park benches',
      'garden gazebos',
      'outdoor furniture',
      'FRP dustbins',
      'playground equipment manufacturer in India',
      'outdoor gym equipment supplier'
    ];

    if (selectedCategory === 'all') {
      return baseKeywords.join(', ');
    }

    const categoryName = getCategoryName(selectedCategory);
    const specificKeywords = [
      categoryName,
      `${categoryName} manufacturer`,
      `${categoryName} supplier`,
      `${categoryName} India`,
      `iron ${categoryName}`,
      `durable ${categoryName}`,
      `${categoryName} for parks`,
      `${categoryName} for schools`,
      `${categoryName} for public spaces`,
      `commercial ${categoryName}`,
      `${categoryName} price`,
      `${categoryName} cost`,
      `${categoryName} installation`,
      `best ${categoryName} in India`,
      `${categoryName} near me`,
      `buy ${categoryName} online`
    ];

    return [...baseKeywords, ...specificKeywords].join(', ');
  };

  return (
    <motion.div
      className="categories-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* SEO Component */}
      <SEO
        title={generateTitle()}
        description={generateDescription()}
        canonical={selectedCategory === 'all' ? '/categories' : `/categories/${selectedCategory}`}
        keywords={generateKeywords()}
      />
      {/* Hero Header Section */}
      <div className="products-hero">
        <div className="products-hero-collage">
          <div className="collage-item">
            <img src={require('../assets/images/Out-Door-Gym/Chest Press.jpg')} alt="Outdoor Gym Equipment" />
            <div className="collage-overlay"></div>
          </div>
          <div className="collage-item">
            <img src={require('../assets/images/Playground/Combination Set playground.jpg')} alt="Playground Equipment" />
            <div className="collage-overlay"></div>
          </div>
          <div className="collage-item">
            <img src={require('../assets/images/Gazebo/Square Gazebo.jpg')} alt="Gazebo" />
            <div className="collage-overlay"></div>
          </div>
          <div className="collage-item">
            <img src={require('../assets/images/Out-Door-Gym/Leg Press.jpg')} alt="Outdoor Gym Equipment" />
            <div className="collage-overlay"></div>
          </div>
          <div className="collage-item">
            <img src={require('../assets/images/Playground/Swing.jpg')} alt="Playground Equipment" />
            <div className="collage-overlay"></div>
          </div>
          <div className="collage-item">
            <img src={require('../assets/images/Benches/FRP Strip Bench.jpg')} alt="Bench" />
            <div className="collage-overlay"></div>
          </div>
          <div className="collage-item">
            <img src={require('../assets/images/Dustbins/Small Penguin Dustbin.jpg')} alt="Dustbin" />
            <div className="collage-overlay"></div>
          </div>
          <div className="collage-item">
            <img src={require('../assets/images/Out-Door-Gym/Shoulder Press.jpg')} alt="Outdoor Gym Equipment" />
            <div className="collage-overlay"></div>
          </div>
        </div>
        <div className="products-hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our wide range of high-quality outdoor equipment
          </motion.p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="products-search-container">
        <SearchBar type="products" />
      </div>

      {/* Controls Section */}
      <div className="products-controls">
        <div className="view-toggle">
          <button
            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <span className="view-icon">▦</span>
          </button>
          <button
            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            <span className="view-icon">☰</span>
          </button>
        </div>

        <div className="product-count">
          {isSearchLoading ? (
            <div className="products-search-loading">
              <div className="search-loader"></div>
              <span>Searching...</span>
            </div>
          ) : (
            <>
              <span>{filteredProducts.length} products</span>
              {isSearchActive && (
                <span className="search-results-label"> found for "{searchTerm}"</span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(category => (
          <motion.button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''} ${category.comingSoon ? 'coming-soon' : ''}`}
            onClick={() => !category.comingSoon && handleCategoryChange(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={category.comingSoon}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
            {categoryProductCounts[category.id] > 0 && (
              <span className="category-count">{categoryProductCounts[category.id]}</span>
            )}
            {category.comingSoon && <span className="coming-soon-badge">Coming Soon</span>}
          </motion.button>
        ))}
      </div>

      {/* Products Grid/List */}
      <div className={`products-${viewMode}`} ref={productsListRef}>
        {isFiltering ? (
          <div className="loading-products">
            <div className="loader"></div>
            <p>Finding the perfect products for you...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + viewMode}
              className="products-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  className="product-card"
                  whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="product-image">
                    <img
                      src={product.image || "/placeholder.jpg"}
                      alt={`MF-Enterprises ${product.name} - ${getCategoryName(product.category)} - High-quality iron construction with powder coating`}
                      title={`${product.name} - Premium ${getCategoryName(product.category)} by MF-Enterprises`}
                    />
                    {product.subcategory && (
                      <div className="product-badge">{product.subcategory}</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-actions">
                      <Link to={`/product/${product.id}`} className="view-details">View Details</Link>
                      <button
                        className="add-to-cart"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Categories;
