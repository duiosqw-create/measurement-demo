# Lab Brand Website

A complete static website with lead generation, analytics, and CRM integration built according to the Lab Brand Website specification.

## Features

- **Lead Generation:** Contact form with Google Sheets CRM integration
- **Analytics:** GTM/GA4 with comprehensive event tracking
- **Consent Management:** GDPR-compliant consent banner
- **A/B Testing:** Client-side variant assignment and tracking
- **SEO Optimized:** Structured data, meta tags, sitemap
- **Accessible:** WCAG 2.2 AA compliant
- **Performance:** Core Web Vitals optimized

## Quick Start

### 1. Setup Google Apps Script Webhook

1. Create a new Google Apps Script project
2. Copy the code from `docs/assets/js/form.js` comments (Apps Script section)
3. Create a Google Sheet named "Leads" with headers:
   ```
   timestamp | name | email | phone | message | spec | city | utm_source | utm_medium | utm_campaign | utm_term | utm_content | gclid | page_url | referrer | notes
   ```
4. Deploy as web app (Anyone with link can access)
5. Update `WEBHOOK_URL` in `docs/assets/js/form.js`

### 2. Configure Analytics

1. Create GA4 property and GTM container
2. Register custom dimensions in GA4:
   - `spec` (string)
   - `city` (string) 
   - `variant` (string)
   - `page_url` (string)
   - `field` (string)
   - `error_type` (string)
3. Set up GTM container per `analytics/gtm-container-notes.md`
4. Update GTM ID in all HTML files

### 3. Customize Content

1. Replace placeholder phone/WhatsApp numbers
2. Update company information in HTML files
3. Replace placeholder domain URLs in meta tags and sitemap
4. Update business details in structured data

### 4. Deploy

1. Upload `docs/` folder contents to your web server
2. Test form submission end-to-end
3. Verify analytics events in GA4 DebugView
4. Run Lighthouse audit for performance

## File Structure

```
docs/                    # Website files
├── index.html          # Landing page
├── thanks.html         # Thank you page
├── privacy.html        # Privacy policy
├── faq.html           # FAQ page
├── 404.html           # Custom 404
├── robots.txt         # SEO robots file
├── sitemap.xml        # SEO sitemap
└── assets/
    ├── css/main.css   # Styles
    └── js/            # JavaScript modules
        ├── utm.js     # UTM capture
        ├── consent.js # Consent management
        ├── ab.js      # A/B testing
        ├── tracking.js # Analytics tracking
        └── form.js    # Form handling

analytics/              # Analytics documentation
├── event-map.md       # Event schema
└── gtm-container-notes.md # GTM setup

ops/                    # Operations
├── checklists.md      # Launch checklists
├── measurement-charter.md # Measurement strategy
└── utm-standard.md    # UTM guidelines

reports/               # Reporting
└── dashboard.txt      # Looker Studio setup
```

## Analytics Events

The site tracks these events in GA4:

- `view_page` - Page views with UTMs
- `view_form` - Form enters viewport
- `start_form` - First form interaction
- `field_error` - Form validation errors
- `submit_form` - Successful form submission
- `click_call` - Phone number clicks
- `click_whatsapp` - WhatsApp clicks
- `ab_assign` - A/B variant assignment
- `scroll_50` - 50% scroll depth

## A/B Testing

The site includes a simple A/B testing framework:

- Variants assigned once per browser (stored in localStorage)
- Variant A/B content controlled via `data-variant-a` and `data-variant-b` attributes
- All events include variant information for analysis

## Performance Targets

- **LCP:** < 2.5s (mobile)
- **CLS:** < 0.1
- **INP:** < 200ms
- **Accessibility:** WCAG 2.2 AA compliant

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Local Testing

1. Serve files from `docs/` directory
2. Use a local server (e.g., `python -m http.server` or `npx serve`)
3. Test form submission with a test Apps Script webhook
4. Use GA4 DebugView for analytics testing

### Code Style

- Vanilla JavaScript (no frameworks)
- CSS Grid and Flexbox for layout
- Semantic HTML5
- Progressive enhancement

## Troubleshooting

### Form Not Submitting
1. Check Apps Script webhook URL
2. Verify shared secret matches
3. Check Google Sheet permissions
4. Review browser console for errors

### Analytics Not Working
1. Verify GTM container ID
2. Check consent banner functionality
3. Confirm GA4 custom dimensions are registered
4. Test in GA4 DebugView

### Performance Issues
1. Run Lighthouse audit
2. Check for JavaScript errors
3. Optimize images and assets
4. Review Core Web Vitals

## Support

For technical issues:
1. Check the troubleshooting section above
2. Review the operational checklists in `ops/checklists.md`
3. Consult the analytics documentation in `analytics/`

## License

This project is provided as-is for educational and commercial use.