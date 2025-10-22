// Analytics tracking and dataLayer management
(function() {
  'use strict';
  
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // Helper function to push events
  function pushEvent(eventData) {
    // Only push if analytics consent is granted
    if (window.hasAnalyticsConsent && window.hasAnalyticsConsent()) {
      window.dataLayer.push(eventData);
    }
  }
  
  // Helper function to get current spec and city
  function getCurrentSpec() {
    const specEl = document.getElementById('spec');
    return specEl ? specEl.value : '';
  }
  
  function getCurrentCity() {
    const cityEl = document.getElementById('city');
    return cityEl ? cityEl.value : '';
  }
  
  // Helper function to get UTM data
  function getUTMData() {
    return window.getUTMData ? window.getUTMData() : {};
  }
  
  // Page view tracking
  function trackPageView() {
    const utmData = getUTMData();
    pushEvent({
      event: 'view_page',
      page_path: window.location.pathname,
      page_title: document.title,
      referrer: utmData.referrer || document.referrer,
      utm_source: utmData.utm_source || '',
      utm_medium: utmData.utm_medium || '',
      utm_campaign: utmData.utm_campaign || '',
      utm_term: utmData.utm_term || '',
      utm_content: utmData.utm_content || '',
      gclid: utmData.gclid || '',
      spec: getCurrentSpec(),
      city: getCurrentCity()
    });
  }
  
  // Form view tracking
  function trackFormView() {
    const form = document.getElementById('lead');
    if (!form) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pushEvent({
            event: 'view_form',
            form_id: 'lead',
            spec: getCurrentSpec(),
            city: getCurrentCity()
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(form);
  }
  
  // Scroll depth tracking
  function trackScrollDepth() {
    let sent50 = false;
    
    function checkScroll() {
      if (sent50) return;
      
      const scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrolled >= 0.5) {
        sent50 = true;
        pushEvent({
          event: 'scroll_50',
          page_path: window.location.pathname
        });
      }
    }
    
    window.addEventListener('scroll', checkScroll, { passive: true });
  }
  
  // Click tracking
  function trackClicks() {
    // Track call clicks
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[href^="tel:"]');
      if (link) {
        const utmData = getUTMData();
        pushEvent({
          event: 'click_call',
          link_url: link.getAttribute('href'),
          spec: getCurrentSpec(),
          city: getCurrentCity(),
          utm_source: utmData.utm_source || '',
          utm_medium: utmData.utm_medium || '',
          utm_campaign: utmData.utm_campaign || ''
        });
      }
    });
    
    // Track WhatsApp clicks
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[href*="wa.me"]');
      if (link) {
        const utmData = getUTMData();
        pushEvent({
          event: 'click_whatsapp',
          link_url: link.getAttribute('href'),
          spec: getCurrentSpec(),
          city: getCurrentCity(),
          utm_source: utmData.utm_source || '',
          utm_medium: utmData.utm_medium || '',
          utm_campaign: utmData.utm_campaign || ''
        });
      }
    });
  }
  
  // Initialize tracking
  function init() {
    trackPageView();
    trackFormView();
    trackScrollDepth();
    trackClicks();
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Expose helper functions
  window.trackEvent = pushEvent;
  window.getCurrentSpec = getCurrentSpec;
  window.getCurrentCity = getCurrentCity;
})();
