<!-- docs/cms-deployment-runbook.md -->
# CMS Deployment Runbook

This runbook covers production deployment for the `tfctours` marketing site and the shared Neon-backed CMS pipeline administered from `tfc-admin`.

## Environment Variables

| Variable | Description | Required | Default | Repo |
| --- | --- | --- | --- | --- |
| `NEON_DATABASE_URL` | Pooled Neon connection string. In `tfctours`, use a read-only role with SELECT on CMS tables. Empty string enables fallback mode. | Yes in production | None | Both |
| `NEON_DIRECT_URL` | Direct Neon URL for Drizzle migrations. | Yes for migrations | None | tfc-admin |
| `SESSION_COOKIE_NAME` | Admin session cookie name. | No | `tfc_admin_session` | tfc-admin |
| `REVALIDATE_SECRET` | Shared 64-char HMAC secret for admin-to-marketing cache revalidation. Must match in both repos. | Yes | None | Both |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL for rate limiting. | Recommended | Fail-open when absent | Both |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token. | Recommended | Fail-open when absent | Both |
| `NEXT_PUBLIC_ADMIN_URL` | Public admin URL, used for cookies and links. | Yes | None | tfc-admin |
| `NEXT_PUBLIC_SITE_URL` | Public marketing site URL. | Yes | `https://www.tfctours.com` in examples | Both |
| `NEXT_PUBLIC_BUILD_TIME` | Optional build timestamp used in UI/sitemap metadata. | No | Empty | tfctours |
| `ADMIN_ORIGIN` | Allowed CORS origin for `/api/cms/i18n-preview`. Set to exact admin domain in production. | Yes | `*` fallback for local dev | tfctours |
| `RESEND_API_KEY` | Resend API key for contact and quote emails. | Yes for email | None | tfctours |
| `RESEND_FROM_EMAIL` | Verified sender address. | Yes for email | `The Flight Centre <no-reply@tfctours.com.pk>` | tfctours |
| `CONTACT_TO_EMAIL` | Recipient for contact form submissions. | Yes | Brand email fallback | tfctours |
| `QUOTATION_OWNER_EMAIL` | Recipient for tour/umrah quote requests. | Yes | Brand email fallback | tfctours |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile server secret. | Yes in production | Dev fail-open | tfctours |
| `CLOUDFLARE_TURNSTILE_SECRET_KEY` | CI placeholder alias for Turnstile secret. | CI only | None | tfctours |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Turnstile site key. | Yes when CAPTCHA is enabled | None | tfctours |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional Plausible analytics domain. | No | Disabled when absent | tfctours |
| `R2_ACCOUNT_ID` | Cloudflare R2 account ID. | Yes for media uploads | None | tfc-admin |
| `R2_ACCESS_KEY_ID` | R2 access key ID. | Yes for media uploads | None | tfc-admin |
| `R2_SECRET_ACCESS_KEY` | R2 secret access key. | Yes for media uploads | None | tfc-admin |
| `R2_BUCKET_NAME` | R2 bucket name. | Yes for media uploads | None | tfc-admin |
| `R2_PUBLIC_URL_BASE` | Public CDN/base URL for uploaded media. | Yes for media uploads | None | tfc-admin |
| `BLOB_READ_WRITE_TOKEN` | Legacy Vercel Blob token retained for older media routes. | No if using R2 only | None | tfc-admin |
| `SEED_ADMIN_EMAIL` | First admin seed email. | First deploy only | None | tfc-admin |
| `SEED_ADMIN_PASSWORD` | First admin seed password. Rotate after first login. | First deploy only | None | tfc-admin |
| `SEED_ADMIN_NAME` | First admin display name. | First deploy only | `TFC Admin` | tfc-admin |
| `NEXTAUTH_SECRET` | CI/hosting compatibility secret for workflows that expect it. | CI/build secret | None | tfc-admin |
| `NEXTAUTH_URL` | CI/hosting compatibility URL for workflows that expect it. | CI/build secret | None | Both |
| `BASE_URL` | Playwright/API test target URL. | Tests only | `http://localhost:3000` or `3001` | Both |
| `TEST_DATABASE_URL` | Test database URL for admin API contract tests. | Tests only | None | tfc-admin |
| `TEST_ADMIN_EMAIL` | Owner/editor test admin email. | Tests only | None | tfc-admin |
| `TEST_ADMIN_PASSWORD` | Owner/editor test admin password. | Tests only | None | tfc-admin |
| `TEST_VIEWER_EMAIL` | Viewer role test admin email. | Role tests only | None | tfc-admin |
| `TEST_VIEWER_PASSWORD` | Viewer role test admin password. | Role tests only | None | tfc-admin |

## First Deploy — tfc-admin

1. Create the Neon database and set `NEON_DATABASE_URL` and `NEON_DIRECT_URL`.
2. Set all admin env vars in Vercel or the hosting provider.
3. Run database migrations from the `tfc-admin` directory: `npx drizzle-kit migrate`.
4. Seed the first admin if needed: `npm run seed:admin`.
5. Seed CMS tables from bundled constants: `npm run seed:cms`.
6. Open the admin app, log in, and verify `/api/admin/me` returns 200 with a valid session.
7. Create or verify Cloudflare R2 credentials and test Media Library upload from `/content/media`.
8. Confirm mutations trigger marketing revalidation by editing one low-risk CMS value and checking the marketing site after refresh.

## First Deploy — tfctours

1. Set all marketing env vars in Vercel or the hosting provider.
2. Ensure `NEON_DATABASE_URL` uses a read-only Neon role.
3. Verify `GET /api/cms-health` returns `{ cms: "connected" }`.
4. Verify the home page TrustBar shows DB stats from seeded CMS data, not fallback-only copy.
5. Verify `/en/services`, `/en/guides`, `/en/tours`, `/en/umrah`, and one `/en/p/[slug]` CMS page load.
6. Run smoke tests against production or preview: `BASE_URL=https://your-preview-url npm run test:e2e`.

## Routine Deployment

- `tfc-admin`: deploy after CI passes. Run `npx drizzle-kit migrate` only when a new migration exists.
- `tfctours`: deploy after CI passes. It can build with `NEON_DATABASE_URL=""` because bundled fallbacks are always available.
- CMS cache invalidation is handled by `revalidateMarketingSite()` calls from admin mutations.
- For copy-only CMS changes, no code deploy is required.

## Database Migration Procedure

1. Confirm no active high-risk CMS editing is underway.
2. Back up the DB. Neon point-in-time restore should be enabled before migration.
3. From `tfc-admin`, run `npx drizzle-kit migrate`.
4. Verify schema visually with `npx drizzle-kit studio`.
5. Run `npm run seed:cms` only if newly added tables need initial data.
6. Check `tfctours` `/api/cms-health`.

## Rollback Procedure

- Vercel: promote the previous deployment from the dashboard for the affected repo.
- DB: use Neon console to restore from a point-in-time snapshot if schema/data rollback is required.
- CMS data: no automatic rollback exists. Revert content manually in admin or restore the DB.
- Media uploads: soft-deleted DB rows do not delete R2 objects; clean up R2 separately if required.

## Monitoring

- Configure uptime monitoring for `GET /api/cms-health` every 60 seconds.
- Alert if `cms !== "connected"` for 3 consecutive checks.
- Review the admin audit log weekly for unexpected bulk imports, deletes, or media activity.
- Track contact/quote email delivery in Resend.
- Track rate-limit backend health by watching Upstash usage/errors.

## CI/CD

- The marketing CI runs lint, typecheck, unit tests, build, and Playwright smoke tests.
- CI intentionally sets `NEON_DATABASE_URL=""` for fallback-mode builds.
- E2E smoke tests start the production server and hit the built app through Playwright Chromium.
