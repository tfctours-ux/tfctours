# TFC Tours · SEO + GEO QA Checklist

## Sitemap

- [ ] `/sitemap.xml` accessible
- [ ] Entry count = (STATIC_ROUTES.length + SERVICE_ROUTES.length + GUIDE_ROUTES.length) × 2
- [ ] /guides, /guides/saudi-visa-guide, /guides/visit-visa-guide present
- [ ] /services/work-visa, /services/saudi-wakala present
- [ ] Each URL has alternates.languages with en-PK, ur-PK, x-default
- [ ] lastModified is recent (NEXT_PUBLIC_BUILD_TIME bumped per build)

## Robots

- [ ] `/robots.txt` accessible
- [ ] User-agent: * → allow /, disallow /api/
- [ ] AI bots explicitly allowed: GPTBot, ClaudeBot, Claude-Web,
      PerplexityBot, Google-Extended, Amazonbot, anthropic-ai,
      cohere-ai, CCBot, Bytespider, FacebookBot
- [ ] Sitemap directive points to /sitemap.xml
- [ ] llms.txt and llms-full.txt mentioned (optional, in comment)

## Canonical + hreflang per page

For each page (use the page list from theme-qa-checklist.md):
- [ ] <link rel="canonical"> present
- [ ] <link rel="alternate" hreflang="en-PK"> present
- [ ] <link rel="alternate" hreflang="ur-PK"> present
- [ ] <link rel="alternate" hreflang="x-default"> present

## Per-page metadata

- [ ] Unique <title> per page (Google: max ~60 chars rendered)
- [ ] Unique meta description (max ~155 chars rendered)
- [ ] OG title + description set
- [ ] OG image absolute URL, 1200x630 dimensions verified
- [ ] Twitter card type "summary_large_image"

## Structured data (verify in Google Rich Results Test)

- [ ] / — LocalBusiness, FAQPage, Speakable
- [ ] /about — Organization, Speakable
- [ ] /contact — LocalBusiness, Speakable
- [ ] /services/<each> — Service, FAQPage, Breadcrumb
- [ ] /guides/saudi-visa-guide — Article, HowTo
- [ ] /guides/visit-visa-guide — Article, HowTo
- [ ] All FAQ JSON-LD answers also appear in visible page text
- [ ] HowTo step text matches visible step headings/text

## GEO

- [ ] `/llms.txt` accessible, < 4KB, valid markdown
- [ ] `/llms-full.txt` accessible, 8–15KB, fact-dense
- [ ] /about page contains #about-h1, #about-mission, #about-key-facts IDs
- [ ] Key-facts <dl> renders the canonical facts (legal name, address, UAN, IATA, services, languages, areas served)
- [ ] Every business fact in llms.txt and llms-full.txt also visible
      on the website (Google's match-the-page rule)

## Manual test queries (post-deploy, after re-crawl)

- [ ] Google: site:tfctours.com — returns all major pages
- [ ] Google: "The Flight Centre" Gujranwala — appears in results
- [ ] Perplexity / ChatGPT Search: "UAN number for Flight Centre Gujranwala"
      → answer includes 111-786-788 with citation to tfctours.com
- [ ] Perplexity: "Umrah package providers in Gujranwala"
      → tfctours.com cited as a source

## Search Console

- [ ] Sitemap submitted at https://search.google.com/search-console
- [ ] No coverage errors > 24 hours after submission
- [ ] Rich results: FAQ, HowTo, LocalBusiness all detected
- [ ] hreflang reports: no errors

## Sign-off

- [ ] All boxes above checked
- [ ] Rich Results Test passes for every structured-data type
- [ ] Lighthouse SEO score = 100 on every audited page
