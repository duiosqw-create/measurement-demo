// Consent management
(function() {
  'use strict';
  
  const CONSENT_KEY = 'consent_analytics';
  const consentBanner = document.getElementById('consent');
  const acceptBtn = document.getElementById('consent-accept');
  const declineBtn = document.getElementById('consent-decline');
  
  // Check existing consent
  const existingConsent = localStorage.getItem(CONSENT_KEY);
  
  if (!existingConsent) {
    // Show banner if no consent decision
    consentBanner.classList.remove('hidden');
  }
  
  // Accept analytics
  acceptBtn.addEventListener('click', function() {
    localStorage.setItem(CONSENT_KEY, 'granted');
    consentBanner.classList.add('hidden');
    
    // Fire consent granted event
    window.dispatchEvent(new CustomEvent('consent_granted', {
      detail: { consent: 'granted' }
    }));
  });
  
  // Decline analytics
  declineBtn.addEventListener('click', function() {
    localStorage.setItem(CONSENT_KEY, 'denied');
    consentBanner.classList.add('hidden');
    
    // Fire consent declined event
    window.dispatchEvent(new CustomEvent('consent_declined', {
      detail: { consent: 'denied' }
    }));
  });
  
  // Helper function to check consent
  window.hasAnalyticsConsent = function() {
    return localStorage.getItem(CONSENT_KEY) === 'granted';
  };
  
  // Helper function to get consent state
  window.getConsentState = function() {
    return localStorage.getItem(CONSENT_KEY) || 'unknown';
  };
})();
