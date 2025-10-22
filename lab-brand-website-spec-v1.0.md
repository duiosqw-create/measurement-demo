# Lab Brand Website — Product & Implementation Spec (v1.0)
**Purpose:** This document defines exactly what to build so we can replicate the full learning plan end‑to‑end: capture demand, measure accurately, fix conversion leaks, scale responsibly, and report results. It is written for a developer to implement without further clarifications.

**Assumptions**
- Static site hosted on GitHub Pages or Netlify.
- Single “service business” (can be swapped later) with lead generation as the primary goal.
- Free stack: Google Tag Manager (GTM), Google Analytics 4 (GA4), Google Sheets + Apps Script (as CRM), Looker Studio for reporting.
- Non-functional expectations: fast (Core Web Vitals), accessible (WCAG 2.2 AA), privacy‑respecting (GDPR‑aware), maintainable (version control), instrumented (observability of key events).

---

## 1. Scope & Deliverables
**Deliverables**
1. Production-ready static site (HTML/CSS/JS) with the pages/components below.
2. Working lead flow: browser → form → Apps Script webhook → Google Sheet.
3. Complete analytics: GA4 via GTM with event/parameter schema implemented.
4. SEO + structured data.
5. Consent banner with event gating.
6. A/B experiment scaffold (client-side) with event logging.
7. Dashboards (Looker Studio) sourcing GA4 + Sheet.
8. Playbook files in repo: `/ops` (checklists), `/analytics` (event map & GTM export), `/reports` (dashboard link).

**Out of scope** (can be added later): paid ad platform pixels, phone call tracking via third‑party, backend CMS, authentication, multi-language.

---

## 2. Information Architecture (IA)
Pages (all URLs relative to root):

- `/` — **Home / Primary Landing** (single, focused CTA to form).
- `/thanks.html` — **Thank-you** page after successful submission.
- `/privacy.html` — **Privacy/Consent policy**.
- `/services.html` — Optional **Service details** page (if needed for SEO/long‑form).
- `/faq.html` — Optional **FAQ page** (also rendered as on-page component on `/`).
- `/404.html` — Custom not‑found.
- `/robots.txt` and `/sitemap.xml` (static or generated at build time).

---

## 3. Components (Functional Requirements)
### 3.1 Header
- Logo (SVG), navigation to Privacy and FAQ (if present).
- Phone CTA: `tel:+44…` link and WhatsApp CTA `https://wa.me/<number>`.
- On mobile, phone/WhatsApp CTAs are prominent and reachable with one tap.

### 3.2 Hero (Above the Fold)
- Headline, subhead (plain claims; no dark patterns).
- Primary CTA button scrolls to form.
- Performance: preload hero image; avoid blocking fonts.

### 3.3 Trust Panel
- 3–5 bullet promises (e.g., same‑day response, qualified operator, insured work).
- Optional badges (SVG inline).

### 3.4 Pre‑router (Intent/Spec + Location)
- Simple controls above form: radio or select for **Service type** (`spec`) and **City** (`city`).
- Selections are captured as GA4 parameters and submitted to CRM.
- Defaults are explicit (no hidden preselection).

### 3.5 Lead Form
- Fields: `name` (required), `email` (required), `phone` (optional), `message` (optional), hidden honeypot `website` (must be empty).
- Validation: HTML5 + JS; field‑level errors shown with aria‑live regions.
- On submit:
  1) POST JSON to Apps Script webhook.
  2) Push `submit_form` event to `dataLayer` with parameters (see Analytics Schema).
  3) Redirect to `/thanks.html` upon `200 OK`.
- Error handling: show inline error and retry; if webhook fails, offer mailto fallback (`mailto:info@…?subject=Quote`).
- Consent checkbox with a link to Privacy page; submit only when checked.

### 3.6 Sticky Contact Bar (Mobile)
- Visible after scroll; includes **Call**, **WhatsApp**, **Get Quote** (scroll to form).
- Call/WhatsApp clicks push events to GA4.

### 3.7 FAQ Component
- Accordions with semantic markup.
- JSON‑LD (FAQPage) embedded on pages where FAQs appear.

### 3.8 Footer
- Business name, short address (if any), company number (if any), links to Privacy/FAQ, copyright year.

---

## 4. Design & Accessibility
- **Style**: Clean, minimal CSS (no frameworks required). Respect prefers‑reduced‑motion.
- **Typography**: System font stack; avoid blocking font loads.
- **Colour/contrast**: 4.5:1 minimum for text; focus states visible.
- **Forms**: `<label>` bound to `<input>`; use `aria-invalid` and `aria-describedby` for errors.
- **Keyboard**: All interactive elements reachable/tabbable; skip‑to‑content link.
- **Motion**: Avoid large parallax; disable animations if `prefers-reduced-motion` is set.

---

## 5. Performance Requirements (Budgets)
- Mobile p75 **LCP < 2.5 s**, **CLS < 0.1**, **INP < 200 ms** on `/`.
- Limit main thread JS < 100 KB (minified).
- Images: next‑gen formats where supported; width/height set; lazy‑load below the fold.
- Preload hero image and critical CSS.
- Cache static assets with long max‑age; HTML no‑store if using forms.

---

## 6. Privacy & Consent
- Consent banner (non‑obstructive) on first visit with two options: “Accept analytics” and “Decline”. No pre‑ticked boxes.
- Consent state stored in `localStorage` key `consent_analytics` = `granted` | `denied`.
- GTM initialisation uses Consent Mode (if available) or custom gating:
  - If `denied`, only essential events fire; GA4 is not initialised.
  - If `granted`, GA4 initialises and all tags may fire.
- Privacy page describes data collected (minimal), purposes, retention, and contact.

---

## 7. Analytics & Tracking (GTM + GA4)
Implement via GTM with a GA4 Configuration tag and the event schema below. All events use `dataLayer.push` and include UTMs/spec/city when available.

### 7.1 Event & Parameter Schema
**Event names (snake_case), required params in bold.**

| Event | When | Params (required in **bold**) |
|---|---|---|
| `view_page` | On each page view | **`page_path`**, `page_title`, `referrer`, `utm_*`, `gclid`, `spec`, `city` |
| `view_form` | When the form enters viewport (once per session) | **`form_id`**=`lead`, `spec`, `city` |
| `start_form` | First interaction with any form field | **`form_id`**, `field` |
| `field_error` | On validation error | **`form_id`**, **`field`**, `error_type` |
| `submit_form` | On successful POST to webhook and before redirect | **`form_id`**, `spec`, `city`, `utm_*`, `gclid`, `page_url` |
| `click_call` | On `tel:` click | **`link_url`**, `spec`, `city`, `utm_*` |
| `click_whatsapp` | On WhatsApp click | **`link_url`**, `spec`, `city`, `utm_*` |
| `ab_assign` | On variant assignment | **`variant`** = `A`/`B` |
| `scroll_50` | First time user crosses 50% scroll depth | `page_path` |

**UTM parameters captured:** `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`. Also capture `gclid` if present.

**Custom definitions to register in GA4 (Scope: Event)**  
- `spec` (string) — Selected service type.  
- `city` (string) — Selected city/location.  
- `variant` (string) — A/B bucket.  
- `page_url` (string) — Full URL for submits.  
- `field` (string) — Field name for errors/starts.  
- `error_type` (string) — Validation error type.

### 7.2 Data Layer Contract
All events pushed as objects, e.g.:
```js
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
  gclid: (new URLSearchParams(location.search)).get('gclid') || '',
  page_url: location.href
});
```

### 7.3 GTM Build Checklist
- Variables:
  - URL variables for all UTMs + `gclid`.
  - JS variables for `spec`, `city` (read from form/router).
  - 1st Party cookie or localStorage access for `variant` and consent flag.
- Triggers:
  - Custom Event triggers for each event above.
  - Scroll Depth trigger (50% once).
  - Click triggers for `tel:` and WhatsApp links.
- Tags:
  - GA4 Config (firing only when consent is `granted`).
  - GA4 Event tags per event.
- Consent Mode / gating:
  - Initialise only after reading consent state.

---

## 8. CRM Integration (Google Sheets via Apps Script)
Create a Google Sheet named **Leads** with headers (row 1):

`timestamp | name | email | phone | message | spec | city | utm_source | utm_medium | utm_campaign | utm_term | utm_content | gclid | page_url | referrer | notes`

### 8.1 Apps Script Webhook (Code.gs)
```javascript
/**
 * Minimal webhook to append JSON payloads to the "Leads" sheet.
 * Security: includes optional shared secret; drop rows if honeypot is filled.
 */
const SHEET_NAME = 'Leads';
const SHARED_SECRET = 'change-me-strong-secret';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    if (body.secret !== SHARED_SECRET) return respond({ ok:false, error:'unauthorised' }, 401);
    if (body.website) return respond({ ok:true, skipped:'honeypot' }, 200); // spam honeypot

    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
    sheet.appendRow([
      new Date(),
      body.name || '', body.email || '', body.phone || '', body.message || '',
      body.spec || '', body.city || '',
      body.utm_source || '', body.utm_medium || '', body.utm_campaign || '',
      body.utm_term || '', body.utm_content || '',
      body.gclid || '',
      body.page_url || '',
      body.referrer || '',
      body.notes || ''
    ]);
    return respond({ ok:true });
  } catch (err) {
    return respond({ ok:false, error: String(err) }, 500);
  }
}
function respond(obj, code=200){
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
    .setResponseCode(code);
}
```

Deploy as **Web app** (Anyone with link can access). Paste the URL into the frontend script and set the same `SHARED_SECRET` value.

### 8.2 Form Submission (Frontend)
```html
<!-- Lead form HTML -->
<form id="lead" novalidate>
  <div aria-live="polite" class="form-errors" id="formErrors"></div>
  <input name="name" autocomplete="name" placeholder="Your name" required />
  <input name="email" autocomplete="email" type="email" placeholder="Email" required />
  <input name="phone" autocomplete="tel" type="tel" placeholder="Phone (optional)" />
  <textarea name="message" placeholder="What do you need?"></textarea>
  <input type="text" name="website" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />
  <label><input type="checkbox" id="consent" required /> I agree to the Privacy Policy.</label>
  <button type="submit">Get quote</button>
</form>

<script>
// --- UTM capture once ---
const urlp = new URLSearchParams(location.search);
const utm = Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid']
  .map(k => [k, urlp.get(k) || '']));

// --- Variant assignment (A/B) ---
(function(){
  const k='ab_variant';
  const v = localStorage.getItem(k) || (Math.random()<0.5?'A':'B');
  localStorage.setItem(k, v);
  document.documentElement.setAttribute('data-variant', v);
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({ event:'ab_assign', variant: v });
})();

// --- Helpers ---
function pushDL(evt){ (window.dataLayer=window.dataLayer||[]).push(evt); }

// --- Form instrumentation ---
const form = document.getElementById('lead');
let started = false;
form.addEventListener('focusin', (e)=>{
  if(!started){ started = true; pushDL({event:'start_form', form_id:'lead', field:e.target.name}); }
});
form.addEventListener('invalid', (e)=>{
  e.preventDefault();
  pushDL({event:'field_error', form_id:'lead', field:e.target.name, error_type:'invalid'});
}, true);

const specEl = document.querySelector('[name="spec"]'); // if present
const cityEl = document.querySelector('[name="city"]'); // if present
function currentSpec(){ return specEl ? specEl.value : ''; }
function currentCity(){ return cityEl ? cityEl.value : ''; }

// --- Submit handler ---
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const errors = document.getElementById('formErrors');
  errors.textContent = '';

  if(!document.getElementById('consent').checked){
    errors.textContent = 'Please accept the Privacy Policy to continue.';
    return;
  }
  const fd = new FormData(form);
  const payload = {
    secret: 'change-me-strong-secret',
    name: fd.get('name'),
    email: fd.get('email'),
    phone: fd.get('phone') || '',
    message: fd.get('message') || '',
    website: fd.get('website') || '', // honeypot
    spec: currentSpec(),
    city: currentCity(),
    ...utm,
    gclid: utm.gclid || '',
    page_url: location.href,
    referrer: document.referrer
  };

  try{
    const res = await fetch('APPS_SCRIPT_WEBAPP_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if(!res.ok || !json.ok){ throw new Error(json.error || ('HTTP '+res.status)); }
    pushDL({ event:'submit_form', form_id:'lead', spec: payload.spec, city: payload.city, ...utm, gclid: payload.gclid, page_url: payload.page_url });
    location.href = '/thanks.html';
  }catch(err){
    errors.textContent = 'We could not submit your request right now. Please try again or email us at info@example.com.';
  }
});

// --- Scroll 50% ---
let sent50=false;
window.addEventListener('scroll', ()=>{
  if(sent50) return;
  const scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
  if(scrolled >= 0.5){ sent50=true; pushDL({event:'scroll_50', page_path: location.pathname}); }
});
</script>
```

**Professional notes**
- Do not collect sensitive categories of data.
- Throttle submission retries to avoid duplicate rows.
- Sanitise and validate email/phone on the client only for UX; server is append‑only (Sheet).

---

## 9. Consent Banner (HTML/JS)
```html
<div id="consent" class="consent hidden" role="dialog" aria-live="polite">
  <p>We use analytics to improve our service. You can accept or decline.</p>
  <button id="consent-accept">Accept analytics</button>
  <button id="consent-decline">Decline</button>
</div>
<script>
(function(){
  const key='consent_analytics';
  const state = localStorage.getItem(key);
  const el = document.getElementById('consent');
  if(!state){ el.classList.remove('hidden'); }
  document.getElementById('consent-accept').onclick = ()=>{ localStorage.setItem(key,'granted'); el.remove(); window.dispatchEvent(new Event('consent_granted')); };
  document.getElementById('consent-decline').onclick = ()=>{ localStorage.setItem(key,'denied'); el.remove(); };
})();
</script>
```

GTM must wait for consent: either use Consent Mode or wrap GTM bootstrap until `consent_granted` is fired.

---

## 10. SEO & Structured Data
- `<title>` ≤ 60 chars; `<meta name="description">` ≤ 160 chars.
- Canonical tags on all pages.
- Open Graph/Twitter meta for share cards.
- JSON‑LD:
  - `Organization` or `LocalBusiness` with name, URL, contact, area served.
  - `FAQPage` on FAQ sections.
- `robots.txt` allowing all except `/thanks.html`.
- `sitemap.xml` listing all public pages.

**FAQ JSON‑LD example:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Do you offer same-day service?",
    "acceptedAnswer": { "@type": "Answer", "text": "Yes, when booked before 2pm." }
  }]
}
</script>
```

---

## 11. A/B Experiment Framework
- Client-side variant assignment once per browser (`localStorage` key `ab_variant`).
- CSS attribute `[data-variant="A"|"B"]` to toggle hero content/CTA copy.
- GA4 logs `ab_assign` and all down‑funnel events include implicit variant via custom dimension.

**Acceptance**: Ability to run A/B on hero copy or image with no additional code changes beyond HTML content blocks.

---

## 12. Reporting (Looker Studio)
Create a dashboard with two data sources:
1) GA4 — events with custom dimensions.  
2) Google Sheet — Leads.

**Required charts:**
- Funnel: Sessions → Form views → Starts → Submits → **Sheet Leads (SQL proxy)**.
- Lead quality table: Sheet rows with columns (`timestamp`, `spec`, `city`, manual `HQ` tickbox).
- Heatmap: **SQL rate by hour × day** (compute `hour_of_day` and `day_of_week` in Sheet; can be added by Apps Script on append).
- Returning users: conversion rate for users with ≥2 sessions.

**Decision tiles (text with thresholds):**
- “Ship Variant if SQL/1k sessions ≥ +15% over 7 days”
- “Reallocate posting to strong hours if ≥1.5× median”

---

## 13. Non-Functional: Security, Reliability, Maintainability
- Secrets: Apps Script `SHARED_SECRET` must match frontend; keep out of repo (store in deploy instructions).
- Honeypot field for spam; optionally add reCAPTCHA if volume rises.
- 429/backoff: limit retries to 2 with exponential delay on form submission.
- Logging: on submission error, write to `console.error`; optionally post a lightweight log event to GA4 with error codes (ensure PII is not sent).
- Backups: export Google Sheet weekly (CSV) and store in repo `/backups` (manual step).

---

## 14. Acceptance Criteria (Sign‑off)
- [ ] Pages exist and are reachable; 404 custom page present.
- [ ] Form submits to Sheet reliably (tested 10 times; 0 failures).
- [ ] GA4 shows `view_form`, `start_form`, `field_error`, `submit_form`, `click_call`, `click_whatsapp`, `scroll_50`, `ab_assign` with parameters.
- [ ] Custom dimensions (`spec`, `city`, `variant`, `field`, `error_type`, `page_url`) populated.
- [ ] Consent banner gates analytics correctly.
- [ ] Lighthouse mobile: LCP < 2.5 s; CLS < 0.1 on `/`.
- [ ] WCAG checks: labels, focus order, colour contrast pass.
- [ ] FAQ JSON‑LD validates in Rich Results Test.
- [ ] Looker Studio dashboard renders the funnel and heatmap using live data.
- [ ] Repo contains `/ops/checklists.md`, `/analytics/event-map.json` (or .md), `/reports/README.md` with dashboard link.

---

## 15. QA & Launch Checklists
### 15.1 Preflight
- GA4 DebugView shows events with correct params from a test session.
- UTM propagation verified (append `?utm_source=test&utm_medium=organic&utm_campaign=launch` to URL; confirm in GA4 + Sheet).
- Try invalid email and empty required fields → error messages read by screen reader.
- Submit with consent declined → no GA4 events (except essential banner interactions if any).
- Verify `/thanks.html` is `noindex` and excluded in `robots.txt`.

### 15.2 Post‑launch (Day 1)
- Run 5 real test submissions from varied devices/networks.
- Compare GA4 `submit_form` vs Sheet rows (expect match within a small margin); document any delta causes.
- Check Looker Studio renders; annotate launch in dashboard.

---

## 16. UTM & Naming Standard (Template)
- `utm_source`: channel or community (`reddit`, `discord`, `nextdoor`, `email`).
- `utm_medium`: `organic`, `referral`, `cpc`, `email`.
- `utm_campaign`: campaign name (`launch_v1`, `faq_test_a`).
- `utm_content`: creative or placement identifier (`post_1`, `heroA`).
- `utm_term`: keyword (for search).

All internal links must be untagged (no UTMs) to avoid self‑attribution. External distribution must use a UTM builder (create a small HTML page locally to compose links).

---

## 17. Repository Structure
```
/
├─ docs/                # Site root
│  ├─ index.html
│  ├─ thanks.html
│  ├─ privacy.html
│  ├─ faq.html
│  ├─ assets/ (images, css, js)
│  ├─ robots.txt
│  └─ sitemap.xml
├─ analytics/
│  ├─ event-map.md
│  └─ gtm-container-notes.md
├─ ops/
│  ├─ checklists.md     # preflight, launch, rollback
│  ├─ measurement-charter.md
│  └─ utm-standard.md
├─ reports/
│  └─ dashboard.txt     # Looker Studio link
└─ README.md            # Setup and runbook
```

---

## 18. Example Snippets (Copy‑paste)
### 18.1 GTM bootstrap (inserted before closing `<head>` after consent granted)
```html
<script>
// pseudo: load GTM only if consent 'granted'
(function(){
  function loadGTM(){
    var s=document.createElement('script'); s.async=1;
    s.src='https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX';
    document.head.appendChild(s);
    // Optional: immediately push initial page view params
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event:'view_page',
      page_path: location.pathname,
      page_title: document.title,
      referrer: document.referrer,
      utm_source: (new URLSearchParams(location.search)).get('utm_source') || ''
    });
  }
  if(localStorage.getItem('consent_analytics')==='granted'){ loadGTM(); }
  else { window.addEventListener('consent_granted', loadGTM); }
})();
</script>
```

### 18.2 `robots.txt`
```
User-agent: *
Disallow: /thanks.html
Sitemap: https://example.com/sitemap.xml
```

### 18.3 Simple `sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/</loc></url>
  <url><loc>https://example.com/privacy.html</loc></url>
  <url><loc>https://example.com/faq.html</loc></url>
</urlset>
```

---

## 19. Developer Handover Notes
- Replace placeholders: phone/WhatsApp, company name, Apps Script URL + secret.
- Register GA4 custom dimensions before testing (Admin → Custom definitions → Create).
- Provide the GTM container ID to the marketer; export the container (JSON) and store in `/analytics/`.
- Use GitHub Issues to track tasks; add labels `perf`, `a11y`, `seo`, `tracking`.
- All code must pass: Lighthouse perf/a11y best practices ≥ 90 on desktop; ≥ 80 on mobile in CI or manual checks.

---

## 20. Validation & Sign‑off
The build is complete when:
1) A non‑technical tester can submit the form and see their entry in Google Sheet within 10 seconds.  
2) GA4 DebugView shows a coherent sequence: `view_page` → `view_form` → `start_form` → `submit_form` with the same `spec/city/utm_*`.  
3) Looker Studio funnel reads live.  
4) Performance and accessibility budgets met.  
5) The repo contains checklists and measurement charter.

---

### Appendix A — Measurement Charter (Template)
**Commercial aim:** Generate dispatcher‑ready jobs (high‑quality SQLs).  
**Golden path:** Landing → Pre‑router (spec/city) → Form start → Submit → Dispatcher review.  
**North‑star KPI:** High‑quality SQLs per week.  
**Guardrails:** (1) p75 LCP < 2.5 s, (2) miss‑call rate < 10% in staffed hours, (3) frequency cap for remarketing ≤ 3.5/7d (when paid is live).  
**Event choices:** We only instrument events that change decisions: starts, errors, submits, call/WhatsApp clicks, and A/B assignment.

---

### Appendix B — Troubleshooting (Common Deltas)
- GA4 `submit_form` > Sheet rows: user blocked webhook (offline), consent toggled mid‑flow, webhook rejected due to missing secret.
- Sheet rows > GA4 `submit_form`: consent declined (no GA4), user refreshed after success (duplicate row), script retry double‑posted.
- No UTMs in Sheet: distribution link missing UTMs or redirect stripped params; resolve by adding campaign UTM builder and testing via Console.