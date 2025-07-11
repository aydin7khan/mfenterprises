import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

// Create context
const LoadingContext = createContext();

// Provider component
export const LoadingProvider = ({ children }) => {
  // Start with loading set to true to show loader immediately when the app loads
  const [isLoading, setIsLoading] = useState(true);
  const loadingTimerRef = useRef(null);
  const forceStopTimerRef = useRef(null);

  // Function to start loading
  const startLoading = () => {
    // Clear any existing timers
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
    }
    if (forceStopTimerRef.current) {
      clearTimeout(forceStopTimerRef.current);
    }

    setIsLoading(true);

    // Set a maximum loading time of 3 seconds as a failsafe
    forceStopTimerRef.current = setTimeout(() => {
      stopLoading();
    }, 3000);
  };

  // Function to stop loading
  const stopLoading = () => {
    // Immediately set loading to false
    setIsLoading(false);

    // Clear any existing timers
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
    }

    if (forceStopTimerRef.current) {
      clearTimeout(forceStopTimerRef.current);
    }

    // Force hide any loaders that might be stuck
    setTimeout(() => {
      const loaders = document.querySelectorAll('.page-loader');
      if (loaders.length > 0) {
        loaders.forEach(loader => {
          loader.style.display = 'none';
        });
      }
    }, 500);
  };

  // Function to force stop loading immediately
  const forceStopLoading = () => {
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
    }
    if (forceStopTimerRef.current) {
      clearTimeout(forceStopTimerRef.current);
    }
    setIsLoading(false);
  };

  // Clean up timers when component unmounts
  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
      if (forceStopTimerRef.current) {
        clearTimeout(forceStopTimerRef.current);
      }
    };
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        startLoading,
        stopLoading,
        forceStopLoading
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export default LoadingContext;
