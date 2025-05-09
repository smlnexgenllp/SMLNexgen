// src/lib/gtag.js

export const GA_TRACKING_ID = 'G-EHM1T2ZLZW';

// Log the pageview with their URL
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
