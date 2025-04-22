
/**
 * Utility function to scroll to the top of the page
 * This is used when navigating between pages
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * React component that automatically scrolls to the top of the page when it's mounted
 * Used with React Router to scroll to top on page changes
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};
