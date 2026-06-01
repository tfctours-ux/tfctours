<!-- CHANGELOG.md -->
# Changelog

## [CMS] — Prompts 8–26

### Added
- CMS database layer: Neon/PostgreSQL with Drizzle ORM, with the schema owned by `tfc-admin` and mirrored for marketing-site reads.
- Admin panel CMS surfaces: brand, nav links, translations, services, guides, gallery, home stats, FAQ, tours, umrah packages, calculator options, transport options, SEO overrides, custom pages, and media library.
- Server-side CMS fetchers with `unstable_cache`, tagged invalidation, and TTLs from 60 to 600 seconds per surface.
- Fallback layer: all CMS-powered marketing surfaces fall back to bundled constants, JSON messages, or inline content when Neon is unavailable.
- i18n override system: DB-backed translation overrides merge over bundled `next-intl` messages at request time.
- Media library: Cloudflare R2 upload flow using presigned PUT URLs, metadata storage, admin browser, and soft-delete support.
- CMS health endpoint: `/api/cms-health`, returning `connected`, `disabled`, or `error` without exposing secrets.
- Audit log: admin mutations are logged with action, table, row, diff, IP address, user agent, and actor metadata.
- CI/CD: GitHub Actions workflows for both repos covering lint, typecheck, unit tests, build, and marketing smoke tests.
- Playwright smoke tests for fallback-mode marketing pages and Vitest tests for CMS utilities.

### Changed
- TrustBar, FAQ, and Gallery were converted into server wrappers with client children so DB data resolves before hydration.
- Tour and Umrah calculator pages now load option lists server-side and pass them to client wizards as initial data.
- `TourCalculatorWizard` and `UmrahCalculatorWizard` accept DB-sourced option lists while preserving bundled config fallbacks.
- `computeUmrahTotals` accepts optional transport options so quote calculations can use CMS transport rates.
- `next-intl` request configuration deep-merges DB i18n overrides over bundled locale messages.
- Page metadata generation applies SEO overrides from the DB for existing pages and CMS-managed pages.
- Tours and Umrah listing pages read destination/package options from the CMS with bundled fallbacks.
- JSON-LD FAQ output reads DB FAQ items when available and falls back to bundled FAQ data.
- Admin navigation now exposes every CMS content surface from the sidebar.

### Infrastructure
- DB migrations: `0001`–`0005`, covering the admin schema through the media library.
- Seed script: `npm run seed:cms` populates CMS tables from bundled constants and message files.
- Reorder utility: shared `applyReorder()` in `tfc-admin/app/lib/reorder.ts` for future reorder endpoints.
- R2 environment configuration documented for media uploads.
- Deployment runbooks added for both repos with env vars, first-deploy steps, migration procedure, monitoring, and rollback.
- CMS-backed page cache headers added for marketing pages, matching fetcher cache TTLs.
- Bundle analysis can be enabled with `ANALYZE=true npm run analyze`.
