
/**
 * Check if the current device is mobile
 * @returns boolean indicating if the device is mobile
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768 || 
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Safely parse JSON with fallback
 * @param data - String to parse
 * @param fallback - Default value to return if parsing fails
 * @returns Parsed object or fallback value
 */
export const safeJsonParse = <T>(data: string, fallback: T): T => {
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    return fallback;
  }
};
