# Operational Checklists

## Pre-Launch Checklist

### Technical Setup
- [ ] Replace placeholder GTM ID in all files
- [ ] Replace placeholder phone/WhatsApp numbers
- [ ] Set up Apps Script webhook and update URL in form.js
- [ ] Update shared secret in Apps Script and form.js
- [ ] Replace placeholder domain URLs in sitemap.xml and meta tags
- [ ] Register GA4 custom dimensions (spec, city, variant, page_url, field, error_type)
- [ ] Set up GTM container per gtm-container-notes.md
- [ ] Test form submission 10 times (0 failures required)
- [ ] Verify UTM propagation with test parameters

### Analytics Testing
- [ ] GA4 DebugView shows all events with correct parameters
- [ ] Custom dimensions populated in GA4
- [ ] Consent banner gates analytics correctly
- [ ] A/B variant assignment working
- [ ] Form events fire in correct sequence: view_form → start_form → submit_form

### Performance & Accessibility
- [ ] Lighthouse mobile: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] WCAG checks pass (labels, focus order, color contrast ≥ 4.5:1)
- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen reader compatibility verified
- [ ] FAQ JSON-LD validates in Rich Results Test

### SEO
- [ ] All pages have unique titles and meta descriptions
- [ ] Canonical tags present on all pages
- [ ] robots.txt blocks /thanks.html
- [ ] sitemap.xml includes all public pages
- [ ] Structured data validates

## Launch Day Checklist

### Final Testing
- [ ] Run 5 real test submissions from varied devices/networks
- [ ] Compare GA4 submit_form events vs Google Sheet rows (expect match)
- [ ] Test consent banner on fresh browser
- [ ] Verify sticky bar appears on mobile after scroll
- [ ] Test all phone/WhatsApp links work

### Monitoring Setup
- [ ] Set up GA4 alerts for form submission drops
- [ ] Monitor Google Sheet for new leads
- [ ] Check server logs for webhook errors
- [ ] Set up uptime monitoring for main pages

## Post-Launch (Day 1)

### Data Validation
- [ ] GA4 shows expected traffic patterns
- [ ] Form submissions appear in Google Sheet within 10 seconds
- [ ] No 404 errors in GA4
- [ ] UTM parameters flowing through correctly
- [ ] A/B variants showing in GA4 custom dimensions

### Performance Monitoring
- [ ] Core Web Vitals within targets
- [ ] No JavaScript errors in console
- [ ] Page load times acceptable
- [ ] Mobile experience smooth

## Weekly Maintenance

### Data Quality
- [ ] Review form submissions for spam (check honeypot field)
- [ ] Verify UTM attribution accuracy
- [ ] Check for duplicate submissions
- [ ] Review GA4 data for anomalies

### Technical Health
- [ ] Test form submission still working
- [ ] Check for broken links
- [ ] Verify analytics events still firing
- [ ] Review error logs

## Monthly Review

### Analytics Deep Dive
- [ ] Analyze conversion funnel performance
- [ ] Review A/B test results
- [ ] Check lead quality metrics
- [ ] Optimize based on user behavior

### Content Updates
- [ ] Update FAQ based on common questions
- [ ] Refresh service offerings if needed
- [ ] Update contact information if changed
- [ ] Review and update privacy policy

## Emergency Rollback

### If Form Breaks
1. [ ] Check Apps Script webhook status
2. [ ] Verify shared secret matches
3. [ ] Test webhook URL manually
4. [ ] Check Google Sheet permissions
5. [ ] Rollback to previous form.js version if needed

### If Analytics Breaks
1. [ ] Check GTM container status
2. [ ] Verify GA4 configuration
3. [ ] Test consent banner functionality
4. [ ] Check for JavaScript errors
5. [ ] Rollback to previous tracking.js version if needed

### If Performance Degrades
1. [ ] Run Lighthouse audit
2. [ ] Check for new JavaScript errors
3. [ ] Review recent code changes
4. [ ] Optimize images and assets
5. [ ] Consider reverting recent changes

## Contact Information

- **Developer:** [Your contact info]
- **Analytics:** [Analytics contact]
- **Hosting:** [Hosting provider contact]
- **Apps Script:** [Google account with access]
