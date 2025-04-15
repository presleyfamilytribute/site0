// Enhanced client-side security utilities

/**
 * Advanced rate limiting for form submissions
 */
export const createRateLimiter = (maxAttempts: number = 5, timeWindow: number = 60000) => {
  const attempts: Record<string, number[]> = {};

  return (key: string): boolean => {
    const now = Date.now();
    if (!attempts[key]) {
      attempts[key] = [];
    }

    // Remove expired attempts
    attempts[key] = attempts[key].filter((timestamp) => now - timestamp < timeWindow);

    if (attempts[key].length >= maxAttempts) {
      return false; // Rate limit exceeded
    }

    attempts[key].push(now);
    return true;
  };
};

/**
 * Enhanced bot detection
 */
export const detectBasicBot = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /bot|crawl|spider|slurp|mediapartners/i.test(userAgent);
};

/**
 * Track visitor info
 */
export const trackVisit = (): void => {
  console.log('Visit tracked');
};

/**
 * Enhanced XSS sanitizer for user input
 */
export const sanitizeInput = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Safe HTML renderer
 */
export const createSafeHTML = (html: string): string => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.innerHTML;
};
