# Measurement Charter

## Commercial Aim
Generate dispatcher-ready jobs (high-quality SQLs) through our professional services website.

## Golden Path
Landing → Pre-router (spec/city) → Form start → Submit → Dispatcher review

## North-Star KPI
High-quality SQLs per week

## Guardrails
1. **Performance:** p75 LCP < 2.5s
2. **Operations:** Miss-call rate < 10% in staffed hours  
3. **Privacy:** Frequency cap for remarketing ≤ 3.5/7d (when paid is live)

## Event Choices
We only instrument events that change decisions:
- **Starts:** First form interaction (indicates intent)
- **Errors:** Form validation failures (UX issues)
- **Submits:** Successful form completion (conversion)
- **Calls/WhatsApp:** Direct contact attempts (high intent)
- **A/B Assignment:** Test variant assignment (optimization)

## Success Metrics

### Primary
- **Form completion rate:** Submits / Form views
- **Lead quality score:** Manual rating of submitted leads
- **Response time:** Time from submit to first contact

### Secondary  
- **Page load performance:** Core Web Vitals scores
- **User engagement:** Scroll depth, time on site
- **Traffic quality:** UTM attribution accuracy

## Data Sources
1. **GA4:** User behavior, conversion funnel, traffic sources
2. **Google Sheets:** Lead details, quality scores, response tracking
3. **Looker Studio:** Combined reporting and visualization

## Reporting Cadence
- **Daily:** Lead volume and form performance
- **Weekly:** Conversion funnel and lead quality trends
- **Monthly:** A/B test results and optimization recommendations

## Decision Framework

### Ship Variant If
- SQL/1k sessions ≥ +15% over 7 days
- Statistical significance > 95%
- No negative impact on lead quality

### Reallocate Posting If
- Strong hours show ≥1.5× median conversion rate
- Traffic quality remains consistent
- Resource capacity allows for adjustment

### Emergency Actions
- **Form breaks:** Immediate rollback to previous version
- **Performance degrades:** Remove non-essential features
- **Spam increases:** Implement additional validation

## Privacy & Compliance
- Consent-first analytics approach
- No PII in analytics events
- GDPR-compliant data handling
- Regular privacy policy reviews

## Stakeholder Communication
- **Weekly:** Lead volume and quality summary
- **Monthly:** Performance trends and optimization opportunities  
- **Quarterly:** Strategic review and goal adjustment

## Success Criteria
The measurement setup is successful when:
1. We can reliably track the full customer journey
2. Lead quality is measurable and actionable
3. A/B tests provide clear optimization direction
4. Performance issues are caught and resolved quickly
5. Stakeholders have confidence in the data quality
