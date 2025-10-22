// Form handling and submission
(function() {
  'use strict';
  
  const form = document.getElementById('lead');
  const errorsEl = document.getElementById('formErrors');
  const consentCheckbox = document.getElementById('consent');
  
  // Apps Script webhook URL - REPLACE WITH YOUR ACTUAL URL
  const WEBHOOK_URL = 'YOUR_APPS_SCRIPT_WEBAPP_URL';
  const SHARED_SECRET = 'change-me-strong-secret';
  
  let formStarted = false;
  
  // Form start tracking
  function trackFormStart(fieldName) {
    if (!formStarted) {
      formStarted = true;
      if (window.trackEvent) {
        window.trackEvent({
          event: 'start_form',
          form_id: 'lead',
          field: fieldName
        });
      }
    }
  }
  
  // Field error tracking
  function trackFieldError(fieldName, errorType) {
    if (window.trackEvent) {
      window.trackEvent({
        event: 'field_error',
        form_id: 'lead',
        field: fieldName,
        error_type: errorType
      });
    }
  }
  
  // Form validation
  function validateForm() {
    const formData = new FormData(form);
    const errors = [];
    
    // Required fields
    const requiredFields = [
      { name: 'name', label: 'Name' },
      { name: 'email', label: 'Email' }
    ];
    
    requiredFields.forEach(field => {
      const value = formData.get(field.name);
      if (!value || value.trim() === '') {
        errors.push(`${field.label} is required`);
        trackFieldError(field.name, 'required');
      }
    });
    
    // Email validation
    const email = formData.get('email');
    if (email && !isValidEmail(email)) {
      errors.push('Please enter a valid email address');
      trackFieldError('email', 'invalid_format');
    }
    
    // Consent validation
    if (!consentCheckbox.checked) {
      errors.push('Please accept the Privacy Policy to continue');
      trackFieldError('consent', 'required');
    }
    
    // Honeypot check
    const website = formData.get('website');
    if (website && website.trim() !== '') {
      // Spam detected, silently reject
      return { valid: false, isSpam: true };
    }
    
    return { valid: errors.length === 0, errors };
  }
  
  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Show errors
  function showErrors(errors) {
    errorsEl.textContent = errors.join('. ');
    errorsEl.style.display = 'block';
  }
  
  // Clear errors
  function clearErrors() {
    errorsEl.textContent = '';
    errorsEl.style.display = 'none';
  }
  
  // Form field focus tracking
  form.addEventListener('focusin', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      trackFormStart(e.target.name);
    }
  });
  
  // Form submission
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    clearErrors();
    
    const validation = validateForm();
    
    if (!validation.valid) {
      if (validation.isSpam) {
        // Silently handle spam
        return;
      }
      showErrors(validation.errors);
      return;
    }
    
    // Prepare form data
    const formData = new FormData(form);
    const utmData = window.getUTMData ? window.getUTMData() : {};
    
    const payload = {
      secret: SHARED_SECRET,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      message: formData.get('message') || '',
      website: formData.get('website') || '', // honeypot
      spec: window.getCurrentSpec ? window.getCurrentSpec() : '',
      city: window.getCurrentCity ? window.getCurrentCity() : '',
      utm_source: utmData.utm_source || '',
      utm_medium: utmData.utm_medium || '',
      utm_campaign: utmData.utm_campaign || '',
      utm_term: utmData.utm_term || '',
      utm_content: utmData.utm_content || '',
      gclid: utmData.gclid || '',
      page_url: window.location.href,
      referrer: utmData.referrer || document.referrer
    };
    
    try {
      // Submit to Apps Script webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }
      
      // Track successful submission
      if (window.trackEvent) {
        window.trackEvent({
          event: 'submit_form',
          form_id: 'lead',
          spec: payload.spec,
          city: payload.city,
          utm_source: payload.utm_source,
          utm_medium: payload.utm_medium,
          utm_campaign: payload.utm_campaign,
          utm_term: payload.utm_term,
          utm_content: payload.utm_content,
          gclid: payload.gclid,
          page_url: payload.page_url
        });
      }
      
      // Redirect to thank you page
      window.location.href = '/thanks.html';
      
    } catch (error) {
      console.error('Form submission error:', error);
      showErrors(['We could not submit your request right now. Please try again or email us at info@example.com.']);
    }
  });
  
  // Real-time validation
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() === '') {
        this.setAttribute('aria-invalid', 'true');
        trackFieldError(this.name, 'required');
      } else {
        this.setAttribute('aria-invalid', 'false');
      }
    });
    
    // Email specific validation
    if (input.type === 'email') {
      input.addEventListener('blur', function() {
        if (this.value && !isValidEmail(this.value)) {
          this.setAttribute('aria-invalid', 'true');
          trackFieldError(this.name, 'invalid_format');
        } else {
          this.setAttribute('aria-invalid', 'false');
        }
      });
    }
  });
})();
