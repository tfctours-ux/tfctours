# TFC Tours · Release Runbook

## Pre-deploy

1. All prompts (1–15) complete and merged.
2. `npm run lint && npm run typecheck && npm run build` clean.
3. theme-qa-checklist.md fully checked.
4. seo-geo-qa-checklist.md fully checked.
5. `npx @lhci/cli autorun` passes locally (against `npm run start`).
6. .env values set in Vercel:
   - RESEND_API_KEY
   - RESEND_FROM_EMAIL
   - CONTACT_TO_EMAIL
   - QUOTATION_OWNER_EMAIL
   - UPSTASH_REDIS_REST_URL
   - UPSTASH_REDIS_REST_TOKEN
   - TURNSTILE_SECRET_KEY
   - NEXT_PUBLIC_TURNSTILE_SITE_KEY
   - NEXT_PUBLIC_SITE_URL=https://www.tfctours.com
   - NEXT_PUBLIC_BUILD_TIME (auto-set by Vercel build via build hook)

## Deploy

- Merge to `main` triggers Vercel production build.
- Wait for build to complete (~3–5 min).

## Post-deploy verification

1. curl https://www.tfctours.com/ -I → confirm Content-Security-Policy header.
2. curl https://www.tfctours.com/sitemap.xml → verify entry count and hreflang.
3. curl https://www.tfctours.com/robots.txt → verify AI bot rules.
4. curl https://www.tfctours.com/llms.txt → confirm content.
5. curl https://www.tfctours.com/llms-full.txt → confirm content.
6. Run Google Rich Results Test against:
   - https://www.tfctours.com/
   - https://www.tfctours.com/services/umrah-packages
   - https://www.tfctours.com/guides/saudi-visa-guide
7. Submit /sitemap.xml in Google Search Console (Index → Sitemaps).
8. Test forms in production:
   - Contact form (verify email arrives)
   - Tour calculator (verify email arrives, totals correct)
   - Umrah calculator (verify email arrives, totals correct)
9. Confirm Upstash dashboard records rate-limit hits.
10. Confirm Cloudflare Turnstile dashboard records verifications.

## Rollback

- Vercel: redeploy the previous production deployment from the
  Deployments tab.
- DB / external state: none (this release does not introduce
  database migrations; Upstash rate-limit keys can be flushed
  harmlessly).

## Monitoring (first 24h)

- Check Vercel logs every 4 hours for 5xx errors on /api/*.
- Check Resend dashboard for delivery rates.
- Check Search Console for new coverage errors.
