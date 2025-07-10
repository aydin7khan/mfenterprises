import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

/**
 * PageTransitionHandler - Handles loading animation on page transitions
 * This component is placed inside the LoadingProvider
 */
const PageTransitionHandler = () => {
  const { pathname } = useLocation();
  const { startLoading, stopLoading } = useLoading();
  const prevPathRef = useRef(pathname);
  const timerRef = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Handle initial page load
  useEffect(() => {
    if (isInitialLoad) {
      // Check if initial page is a product detail page
      const isProductDetailPage = pathname.includes('/product/');

      if (isProductDetailPage) {
        // Skip animation for product detail pages
        stopLoading();
        setIsInitialLoad(false);
        return;
      }

      // Start with loading animation for other pages
      startLoading();

      // Detect if we're on a mobile device
      const isMobile = window.innerWidth <= 768;

      // Set initial loading duration - slightly shorter for mobile
      const initialLoadDuration = isMobile ? 1800 : 2000; // 1.8 seconds for mobile, 2 seconds for desktop

      // Set a timeout to stop loading after the fixed duration
      timerRef.current = setTimeout(() => {
        stopLoading();
        setIsInitialLoad(false);
      }, initialLoadDuration);

      // Set a failsafe timer
      const failsafeTimer = setTimeout(() => {
        stopLoading();
        setIsInitialLoad(false);
      }, initialLoadDuration + 1000); // 1 second after expected completion

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        clearTimeout(failsafeTimer);
      };
    }
  }, [isInitialLoad, startLoading, stopLoading, pathname]);

  // Handle page transitions
  useEffect(() => {
    // Skip if this is the initial load
    if (isInitialLoad) {
      return;
    }

    // Only trigger loading on actual page changes
    if (prevPathRef.current !== pathname) {
      // Skip animation for product detail pages
      const isProductDetailPage = pathname.includes('/product/');
      const wasProductDetailPage = prevPathRef.current.includes('/product/');

      // Clear any existing timers
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Update the previous path
      prevPathRef.current = pathname;

      // If navigating to a product detail page, don't show loading animation
      if (isProductDetailPage) {
        // Make sure any previous loading is stopped
        stopLoading();
        return;
      }

      // If navigating from a product detail page, ensure we stop any loading
      if (wasProductDetailPage) {
        stopLoading();
      }

      // Start loading animation for other pages
      startLoading();

      // Detect if we're on a mobile device
      const isMobile = window.innerWidth <= 768;

      // Set a very short duration for the loading animation - even shorter for mobile
      const loadingDuration = isMobile ? 250 : 300; // 0.25 seconds for mobile, 0.3 seconds for desktop

      // Set a timeout to stop loading after the fixed duration
      timerRef.current = setTimeout(() => {
        stopLoading();
      }, loadingDuration);
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [pathname, startLoading, stopLoading, isInitialLoad]);

  return null; // This component doesn't render anything
};

export default PageTransitionHandler;
