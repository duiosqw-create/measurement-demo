# Analytics Event Map

This document defines all events tracked on the website and their parameters.

## Event Schema

| Event | When | Parameters (required in **bold**) |
|-------|------|-----------------------------------|
| `view_page` | On each page view | **`page_path`**, `page_title`, `referrer`, `utm_*`, `gclid`, `spec`, `city` |
| `view_form` | When the form enters viewport (once per session) | **`form_id`**=`lead`, `spec`, `city` |
| `start_form` | First interaction with any form field | **`form_id`**, `field` |
| `field_error` | On validation error | **`form_id`**, **`field`**, `error_type` |
| `submit_form` | On successful POST to webhook and before redirect | **`form_id`**, `spec`, `city`, `utm_*`, `gclid`, `page_url` |
| `click_call` | On `tel:` click | **`link_url`**, `spec`, `city`, `utm_*` |
| `click_whatsapp` | On WhatsApp click | **`link_url`**, `spec`, `city`, `utm_*` |
| `ab_assign` | On variant assignment | **`variant`** = `A`/`B` |
| `scroll_50` | First time user crosses 50% scroll depth | `page_path` |

## UTM Parameters

Captured on all events when available:
- `utm_source`
- `utm_medium` 
- `utm_campaign`
- `utm_term`
- `utm_content`
- `gclid`

## Custom Dimensions (GA4)

Register these in GA4 Admin → Custom definitions → Create:

- `spec` (string) — Selected service type
- `city` (string) — Selected city/location  
- `variant` (string) — A/B bucket
- `page_url` (string) — Full URL for submits
- `field` (string) — Field name for errors/starts
- `error_type` (string) — Validation error type

## Data Layer Example

```javascript
dataLayer.push({
  event: 'submit_form',
  form_id: 'lead',
  spec: 'Electrical',
  city: 'Manchester',
  utm_source: 'community_post',
  utm_medium: 'organic',
  utm_campaign: 'launch_v1',
  utm_term: '',
  utm_content: 'post_1',
  gclid: '',
  page_url: 'https://example.com/'
});
```
