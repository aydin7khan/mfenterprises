import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component - scrolls to top on page changes
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    // Only scroll to top if the pathname has changed (page navigation)
    if (prevPathRef.current !== pathname) {
      // Clear any existing scroll timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Scroll to top immediately to hide scrolling behind the loading animation
      window.scrollTo(0, 0);
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
