import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { SearchProvider } from './context/SearchContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';
import PageTransitionHandler from './components/PageTransitionHandler';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductDetail from './pages/ProductDetail';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Gallery from './pages/Gallery';
import Cart from './pages/Cart';
import './App.css';
import './styles/global.css';

// Main App component with route handling
function App() {
  // Enable browser's automatic scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
    }
  }, []);

  return (
    <Router>
      <ScrollToTop /> {/* Add ScrollToTop component here */}
      <LoadingProvider>
        <CartProvider>
          <SearchProvider>
            <PageTransitionHandler /> {/* Add PageTransitionHandler component here */}
            <AppContent />
          </SearchProvider>
        </CartProvider>
      </LoadingProvider>
    </Router>
  );
}

// AppContent component to handle page content and loading state
const AppContent = () => {
  const { isLoading } = useLoading();
  const location = useLocation();

  // Initial loading is now handled by the PageTransitionHandler component

  // We've moved the page transition handling to the PageTransitionHandler component
  // This effect is no longer needed

  return (
    <div className="App">
      {/* Page loading animation */}
      <PageLoader isLoading={isLoading} />

      <Navbar />
      <main className="main-content">
        {/* Use a key based on the pathname to force remount when page changes */}
        <div
          key={location.pathname}
          className={`page-container ${location.pathname.includes('/product/') ? 'no-animation' : ''}`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:category" element={<Categories />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
