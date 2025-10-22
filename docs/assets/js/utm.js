// UTM capture and storage
(function() {
  'use strict';
  
  const urlParams = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
  
  // Capture UTMs from URL
  const utmData = {};
  utmKeys.forEach(key => {
    const value = urlParams.get(key);
    if (value) {
      utmData[key] = value;
      sessionStorage.setItem(key, value);
    }
  });
  
  // Store referrer
  if (document.referrer) {
    sessionStorage.setItem('referrer', document.referrer);
  }
  
  // Helper function to get current UTMs
  window.getUTMData = function() {
    const data = {};
    utmKeys.forEach(key => {
      data[key] = sessionStorage.getItem(key) || '';
    });
    data.referrer = sessionStorage.getItem('referrer') || '';
    return data;
  };
  
  // Decorate internal links with UTMs (except for same-origin)
  function decorateLinks() {
    const links = document.querySelectorAll('a[href]');
    const storedUTMs = getUTMData();
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }
      
      try {
        const url = new URL(href, window.location.origin);
        // Only decorate external links
        if (url.origin !== window.location.origin) {
          const hasUTMs = utmKeys.some(key => url.searchParams.has(key));
          if (!hasUTMs) {
            utmKeys.forEach(key => {
              if (storedUTMs[key]) {
                url.searchParams.set(key, storedUTMs[key]);
              }
            });
            link.setAttribute('href', url.toString());
          }
        }
      } catch (e) {
        // Invalid URL, skip
      }
    });
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', decorateLinks);
  } else {
    decorateLinks();
  }
})();
