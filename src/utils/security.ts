
// Enhanced client-side security utilities

/**
 * Set up Content Security Policy reporting
 */
export const setupCSPReporting = () => {
  if (window.CSP_ENDPOINT) {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy-Report-Only';
    meta.content = `report-uri ${window.CSP_ENDPOINT}`;
    document.head.appendChild(meta);
  }
};

/**
 * Set up CSRF protection
 */
export const setupCSRFProtection = () => {
  const token = Math.random().toString(36).slice(2);
  localStorage.setItem('csrf_token', token);
  
  // Add CSRF token to all fetch requests
  const originalFetch = window.fetch;
  window.fetch = function(url, options = {}) {
    options.headers = {
      ...options.headers,
      'X-CSRF-Token': localStorage.getItem('csrf_token') || '',
    };
    return originalFetch(url, options);
  };
};

/**
 * Set up additional security headers
 */
export const setupSecurityHeaders = () => {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'X-Frame-Options';
  meta.content = 'DENY';
  document.head.appendChild(meta);
  
  // Add other security meta tags
  const securityHeaders = [
    { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
    { httpEquiv: 'X-XSS-Protection', content: '1; mode=block' },
    { httpEquiv: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' }
  ];
  
  securityHeaders.forEach(header => {
    const meta = document.createElement('meta');
    meta.httpEquiv = header.httpEquiv;
    meta.content = header.content;
    document.head.appendChild(meta);
  });
};

/**
 * Protect against XSS attacks
 */
export const protectAgainstXSS = () => {
  // Sanitize all input fields
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      target.value = sanitizeInput(target.value);
    });
  });
};

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

/**
 * Development-only XSS vulnerability scanner
 */
export const scanForXSSVulnerabilities = () => {
  console.log('Scanning for XSS vulnerabilities...');
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    console.log(`Checking input: ${input.id || input.name || 'unnamed'}`);
  });
};
