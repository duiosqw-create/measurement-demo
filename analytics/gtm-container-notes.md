# GTM Container Setup Notes

## Variables to Create

### URL Variables
- `utm_source` - URL component utm_source
- `utm_medium` - URL component utm_medium  
- `utm_campaign` - URL component utm_campaign
- `utm_term` - URL component utm_term
- `utm_content` - URL component utm_content
- `gclid` - URL component gclid

### JavaScript Variables
- `spec` - Custom JavaScript: `window.getCurrentSpec ? window.getCurrentSpec() : ''`
- `city` - Custom JavaScript: `window.getCurrentCity ? window.getCurrentCity() : ''`
- `variant` - Custom JavaScript: `window.getCurrentVariant ? window.getCurrentVariant() : ''`
- `consent_state` - Custom JavaScript: `window.getConsentState ? window.getConsentState() : 'unknown'`

### 1st Party Cookie Variables
- `consent_analytics` - Cookie name: consent_analytics

## Triggers to Create

### Custom Event Triggers
- `view_page` - Custom Event, Event name: view_page
- `view_form` - Custom Event, Event name: view_form
- `start_form` - Custom Event, Event name: start_form
- `field_error` - Custom Event, Event name: field_error
- `submit_form` - Custom Event, Event name: submit_form
- `click_call` - Custom Event, Event name: click_call
- `click_whatsapp` - Custom Event, Event name: click_whatsapp
- `ab_assign` - Custom Event, Event name: ab_assign
- `scroll_50` - Custom Event, Event name: scroll_50

### Click Triggers
- `tel_click` - Click - All Elements, Click URL contains tel:
- `whatsapp_click` - Click - All Elements, Click URL contains wa.me

### Scroll Trigger
- `scroll_50_percent` - Scroll Depth, 50%

## Tags to Create

### GA4 Configuration
- **Tag Type:** Google Analytics: GA4 Configuration
- **Measurement ID:** [Your GA4 Measurement ID]
- **Trigger:** All Pages
- **Advanced Settings:** 
  - Tag firing options: Once per page
  - Built-in variables: Page URL, Page Title, Referrer

### GA4 Event Tags
Create one tag for each event type:

#### view_page
- **Tag Type:** Google Analytics: GA4 Event
- **Configuration Tag:** [GA4 Config Tag]
- **Event Name:** view_page
- **Event Parameters:**
  - page_path: {{Page URL}}
  - page_title: {{Page Title}}
  - referrer: {{Referrer}}
  - utm_source: {{utm_source}}
  - utm_medium: {{utm_medium}}
  - utm_campaign: {{utm_campaign}}
  - utm_term: {{utm_term}}
  - utm_content: {{utm_content}}
  - gclid: {{gclid}}
  - spec: {{spec}}
  - city: {{city}}
- **Trigger:** view_page

#### submit_form
- **Tag Type:** Google Analytics: GA4 Event
- **Configuration Tag:** [GA4 Config Tag]
- **Event Name:** submit_form
- **Event Parameters:**
  - form_id: {{Event}} form_id
  - spec: {{Event}} spec
  - city: {{Event}} city
  - utm_source: {{Event}} utm_source
  - utm_medium: {{Event}} utm_medium
  - utm_campaign: {{Event}} utm_campaign
  - utm_term: {{Event}} utm_term
  - utm_content: {{Event}} utm_content
  - gclid: {{Event}} gclid
  - page_url: {{Event}} page_url
- **Trigger:** submit_form

[Repeat for other events with appropriate parameters]

## Consent Mode Setup

### Consent Initialization
- **Tag Type:** Google Tag Manager
- **Tag Name:** Consent Mode Default
- **Custom HTML:**
```html
<script>
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied', 
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'granted',
  'security_storage': 'granted'
});
</script>
```
- **Trigger:** All Pages

### Consent Update
- **Tag Type:** Google Tag Manager
- **Tag Name:** Consent Update
- **Custom HTML:**
```html
<script>
gtag('consent', 'update', {
  'analytics_storage': 'granted'
});
</script>
```
- **Trigger:** Custom Event: consent_granted

## Testing Checklist

1. Enable GTM Preview mode
2. Visit site with UTMs: `?utm_source=test&utm_medium=organic&utm_campaign=launch`
3. Verify all events fire with correct parameters
4. Test form submission end-to-end
5. Check GA4 DebugView for events
6. Verify consent gating works (decline consent, check no GA4 events fire)

## Container Export

Export the complete container as JSON and store in this repository for version control.
