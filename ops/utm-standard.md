# UTM & Naming Standard

## UTM Parameter Guidelines

### utm_source
Channel or community where traffic originates:
- `reddit` - Reddit posts/comments
- `discord` - Discord community
- `nextdoor` - Nextdoor posts
- `email` - Email campaigns
- `facebook` - Facebook posts/ads
- `google` - Google search
- `direct` - Direct traffic (no referrer)

### utm_medium
Traffic type or method:
- `organic` - Organic/unpaid traffic
- `referral` - Referral from other sites
- `cpc` - Cost-per-click ads
- `email` - Email marketing
- `social` - Social media (non-paid)
- `paid_social` - Paid social media

### utm_campaign
Campaign name or initiative:
- `launch_v1` - Initial launch campaign
- `faq_test_a` - A/B test for FAQ content
- `winter_promotion` - Seasonal campaign
- `referral_program` - Referral initiative
- `community_outreach` - Community engagement

### utm_content
Creative or placement identifier:
- `post_1` - First post in series
- `hero_a` - Hero section variant A
- `sidebar_ad` - Sidebar advertisement
- `email_header` - Email header link
- `bio_link` - Social media bio link

### utm_term
Keyword (primarily for search):
- `electrical_services` - Service keyword
- `emergency_plumber` - Emergency service
- `hvac_repair` - HVAC keyword
- `same_day_service` - Speed benefit

## Naming Conventions

### Campaign Naming
Format: `[initiative]_[variant]_[date]`
Examples:
- `launch_hero_a_202401`
- `referral_program_v2_202402`
- `winter_promo_organic_202401`

### Content Naming
Format: `[type]_[identifier]_[variant]`
Examples:
- `post_electrical_tips_v1`
- `ad_hero_image_a`
- `email_newsletter_jan`

## Link Building Guidelines

### Internal Links
- **Never** add UTMs to internal navigation
- **Never** add UTMs to footer links
- **Never** add UTMs to same-origin redirects

### External Distribution
- **Always** use UTMs for social media posts
- **Always** use UTMs for email campaigns
- **Always** use UTMs for community posts
- **Always** use UTMs for paid advertising

### UTM Builder
Create a simple HTML page for composing links:

```html
<!DOCTYPE html>
<html>
<head><title>UTM Builder</title></head>
<body>
  <form id="utm-builder">
    <input type="text" placeholder="Base URL" id="base-url">
    <input type="text" placeholder="Source" id="source">
    <input type="text" placeholder="Medium" id="medium">
    <input type="text" placeholder="Campaign" id="campaign">
    <input type="text" placeholder="Content" id="content">
    <input type="text" placeholder="Term" id="term">
    <button type="submit">Generate Link</button>
  </form>
  <div id="result"></div>
  <script>
    document.getElementById('utm-builder').addEventListener('submit', function(e) {
      e.preventDefault();
      const base = document.getElementById('base-url').value;
      const params = new URLSearchParams({
        utm_source: document.getElementById('source').value,
        utm_medium: document.getElementById('medium').value,
        utm_campaign: document.getElementById('campaign').value,
        utm_content: document.getElementById('content').value,
        utm_term: document.getElementById('term').value
      });
      document.getElementById('result').innerHTML = `<a href="${base}?${params}">Generated Link</a>`;
    });
  </script>
</body>
</html>
```

## Quality Control

### Pre-Post Checklist
- [ ] All required UTMs present (source, medium, campaign)
- [ ] No typos in campaign names
- [ ] Consistent naming convention used
- [ ] Link tested and working
- [ ] No UTMs on internal links

### Post-Post Validation
- [ ] Check GA4 for UTM data within 24 hours
- [ ] Verify traffic attribution matches expectations
- [ ] Monitor for unusual traffic patterns
- [ ] Document any naming convention deviations

## Common Mistakes to Avoid

1. **Inconsistent naming:** `facebook` vs `Facebook` vs `fb`
2. **Missing campaigns:** Only using source/medium
3. **Internal UTMs:** Adding UTMs to same-site links
4. **Typos:** `electrical` vs `electrical`
5. **Over-specific content:** `post_about_electrical_tips_for_homeowners_in_manchester`

## Best Practices

1. **Keep it simple:** Shorter is better
2. **Be consistent:** Use same format across campaigns
3. **Document changes:** Note when naming conventions change
4. **Test regularly:** Verify UTMs work in GA4
5. **Review monthly:** Clean up old campaign names

## Tools & Resources

- **GA4 UTM Builder:** Use Google's official tool
- **UTM.io:** Third-party UTM builder
- **Campaign URL Builder:** Chrome extension
- **GA4 Real-time:** Monitor UTM traffic as it arrives
