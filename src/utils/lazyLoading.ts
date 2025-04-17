
/**
 * Initialize lazy loading for all images
 * This function adds the loading="lazy" attribute to all images 
 * that don't already have it
 */
export const initLazyLoading = () => {
  // Add native lazy loading
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
};

// For browsers that don't support native lazy loading
export const initFallbackLazyLoading = () => {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    return;
  }
  
  // Simple implementation for browsers without native support
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement;
        const src = image.getAttribute('data-src');
        
        if (src) {
          image.src = src;
          image.removeAttribute('data-src');
        }
        
        observer.unobserve(image);
      }
    });
  });
  
  lazyImages.forEach(image => {
    lazyLoadObserver.observe(image);
  });
};
