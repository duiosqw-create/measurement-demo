// A/B testing framework
(function() {
  'use strict';
  
  const VARIANT_KEY = 'ab_variant';
  
  // Assign variant if not already assigned
  let variant = localStorage.getItem(VARIANT_KEY);
  if (!variant) {
    variant = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem(VARIANT_KEY, variant);
  }
  
  // Set data attribute on document element
  document.documentElement.setAttribute('data-variant', variant);
  
  // Apply variant-specific content
  function applyVariant() {
    const elements = document.querySelectorAll('[data-variant-a], [data-variant-b]');
    elements.forEach(element => {
      const variantContent = element.getAttribute(`data-variant-${variant.toLowerCase()}`);
      if (variantContent) {
        element.textContent = variantContent;
      }
    });
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyVariant);
  } else {
    applyVariant();
  }
  
  // Push assignment event to dataLayer (will be handled by tracking.js)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'ab_assign',
    variant: variant
  });
  
  // Helper function to get current variant
  window.getCurrentVariant = function() {
    return variant;
  };
})();
