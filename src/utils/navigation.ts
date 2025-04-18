
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A React hook that automatically scrolls to top when the route changes
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
};

/**
 * Scrolls the window to the top with smooth animation
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Attaches scroll-to-top behavior to all internal links
 */
export const initScrollToTopOnNavigation = () => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const closestLink = target.closest('a');
    
    if (closestLink && 
        closestLink.href && 
        closestLink.href.startsWith(window.location.origin) && 
        !closestLink.hasAttribute('data-no-scroll')) {
      // This is an internal link, so scroll to top immediately
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 10); // Small delay to ensure navigation has started
    }
  });
};
