# Tripmarking AdSense Content Structure

This document is the working gate for the 80% approval pass. Tripmarking should read as a travel safety information site with a fast map, not as a danger-map-only tool.

## Publishable Content Types

- Core guide: `/guide/`
- Field notes: `/field-notes/` and future `/field-notes/*`
- City hubs: `/cities/`, `/cities/paris/`, `/cities/rome/`, and future city pages.
- Topic guides: `/guides/*`
- Spot pages: `/spots/*`
- Search-entry articles: root-level city, pickpocket, phone-snatching, scam, transit, and bag-safety articles.

## Required Page Blocks

Every new publishable content page should include:

- A scene-based situation, not a claim that a city is dangerous.
- A decision standard that focuses on a traveler's behavior and context.
- A short action order.
- One paragraph explaining what not to over-assume.
- At least three internal links to related guides, field notes, city hubs, or spot pages.
- A clear canonical URL and meta description.
- Inclusion in both `site/sitemap.xml` and `site/feed.xml` when the page is a real reading page.

## Expression Rules

- Do not write that a city, country, group, or street is inherently dangerous.
- Do not sensationalize crime.
- Do not provide instructions that help theft, fraud, evasion, or harassment.
- Prefer phrases such as "check this signal", "keep this item in sight", and "leave the area if the interaction becomes unclear".

## Ad Placement Rules

Ads are allowed on:

- `/guide/`
- `/field-notes/`
- `/cities/*`
- Low-sensitivity `/guides/*`
- `/spots/*`
- Root-level prevention and city-context articles.

Ads must stay off:

- `/`
- `/about/`
- `/editorial/`
- `/editorial-policy/`
- `/privacy/`
- `/terms/`
- `/contact/`
- `/review-readiness/`
- `/guides/passport-loss/`
- `/lost-passport-card-response/`
- Map, report, save, translation, loading, and empty-result states.

## Inventory Command

Run this before and after content expansion:

```bash
npm run content:inventory
```

The command fails on hard issues such as broken internal links, sitemap URLs without local HTML, missing canonical/meta basics, duplicate feed or sitemap URLs, or ad scripts on blocked pages. It reports softer warnings for pages that need more internal links, paragraphs, feed coverage, or ad coverage.
